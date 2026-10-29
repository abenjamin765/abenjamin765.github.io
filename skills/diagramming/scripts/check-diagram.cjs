#!/usr/bin/env node
/* Render-only QA for thin axis-aligned HTML/CSS diagram connectors. */
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');

async function main() {
  const args = {};
  for (let i=2;i<process.argv.length;i++) {
    const key=process.argv[i];
    if (key==='--help') {
      console.log('Usage: node check-diagram.cjs --page <local HTML or loopback URL> --config <JSON> [--out <directory>]');
      return;
    }
    if (!['--page','--config','--out'].includes(key) || !process.argv[i+1]) throw new Error(`Invalid argument: ${key}`);
    args[key.slice(2)]=process.argv[++i];
  }
  if (!args.page || !args.config) throw new Error('--page and --config are required');
  let url;
  if (/^https?:/i.test(args.page)) {
    url=new URL(args.page);
    if (!['localhost','127.0.0.1','[::1]'].includes(url.hostname)) throw new Error('Use local HTML or a loopback URL; remote navigation is outside this helper.');
  } else {
    const pagePath=path.resolve(args.page);
    if (!fs.statSync(pagePath).isFile()) throw new Error('Page must be an HTML file');
    url=pathToFileURL(pagePath);
  }
  const config=JSON.parse(fs.readFileSync(path.resolve(args.config),'utf8'));
  if (!config.root || !config.nodes) throw new Error('Configuration needs root and nodes');
  const widths=config.widths || [1440,949,768,390,320];
  if (!Array.isArray(widths) || !widths.length || widths.some(w=>!Number.isInteger(w)||w<100)) throw new Error('widths must contain positive viewport widths of at least 100px');
  const out=path.resolve(args.out || 'work/diagram-qa');
  fs.mkdirSync(out,{recursive:true});
  let puppeteer;
  try { puppeteer=require(require.resolve('puppeteer',{paths:[process.cwd(),path.dirname(path.resolve(args.page))]})); }
  catch { throw new Error('Puppeteer is not installed in this project. Use the host browser tools or an explicitly authorized dependency installation.'); }
  const browser=await puppeteer.launch({headless:true});
  const report={page:String(url),config:path.resolve(args.config),widths:[],passed:false};
  try {
    const page=await browser.newPage();
    for (const width of widths) {
      await page.setViewport({width,height:config.height || 1000,deviceScaleFactor:1});
      await page.goto(String(url),{waitUntil:'load',timeout:30000});
      await page.evaluate(async()=>{
        await document.fonts.ready;
        await Promise.all([...document.images].map(img=>{img.loading='eager';return img.decode().catch(()=>{});}));
      });
      const result=await page.evaluate(config=>{
        const failures=[], checks=[], skipped=[];
        const tol=config.tolerance ?? 1.25;
        const unique=selector=>{
          const found=document.querySelectorAll(selector);
          if(found.length!==1) throw new Error(`Expected one element for ${selector}; found ${found.length}`);
          return found[0];
        };
        const root=unique(config.root), rootBox=root.getBoundingClientRect();
        const visible=el=>el.getClientRects().length>0 && getComputedStyle(el).visibility!=='hidden';
        if(document.documentElement.scrollWidth>innerWidth+1) failures.push('Viewport overflows horizontally');
        if(root.scrollWidth>root.clientWidth+1) failures.push('Diagram overflows its own width');
        for(const el of [root,...root.querySelectorAll('*')]) {
          if(!visible(el)) continue;
          for(const child of el.childNodes) {
            if(child.nodeType!==Node.TEXT_NODE || !child.textContent.trim()) continue;
            const range=document.createRange();range.selectNodeContents(child);
            for(const box of range.getClientRects()) if(box.left<rootBox.left-1 || box.right>rootBox.right+1) {
              failures.push(`Text leaves diagram: ${child.textContent.trim().slice(0,70)}`);break;
            }
          }
        }
        for(const label of config.labels || []) {
          const matches=root.querySelectorAll(label.selector);
          if(!matches.length) failures.push(`Missing label selector: ${label.selector}`);
          for(const el of matches) {
          if(!visible(el)) continue;
          const range=document.createRange();range.selectNodeContents(el);
          const rects=[...range.getClientRects()].filter(r=>r.width>0);
          const lines=new Set(rects.map(r=>Math.round(r.top))).size;
          const box=el.getBoundingClientRect();
          if(label.singleLineMinWidth && innerWidth>=label.singleLineMinWidth && lines!==1) failures.push(`Label wraps: ${el.textContent.trim()}`);
          if(label.align==='center' && rects.length) {
            const left=Math.min(...rects.map(r=>r.left)), right=Math.max(...rects.map(r=>r.right));
            if(Math.abs((left+right)/2-(box.left+box.right)/2)>tol) failures.push(`Label is not centered: ${el.textContent.trim()}`);
          }
          checks.push({label:el.textContent.trim(),lines});
          }
        }
        const nodeBox=name=>{
          const spec=config.nodes[name];if(!spec)throw new Error(`Unknown node: ${name}`);
          const el=unique(typeof spec==='string'?spec:spec.selector);
          const box=el.getBoundingClientRect();
          if(!spec.pseudo) return {x:box.left,y:box.top,w:box.width,h:box.height,visible:visible(el)};
          const ps=getComputedStyle(el,spec.pseudo), es=getComputedStyle(el);
          if(ps.display==='none'||ps.content==='none') return {visible:false};
          const num=v=>{if(!/^-?[0-9.]+px$/.test(v)&&v!=='0')throw new Error(`Unsupported used dimension ${v} on ${name}`);return Number.parseFloat(v);};
          const borderX=num(es.borderLeftWidth),borderY=num(es.borderTopWidth);
          const cw=box.width-borderX-num(es.borderRightWidth),ch=box.height-borderY-num(es.borderBottomWidth);
          const offset=(v,full)=>v.endsWith('%')?Number.parseFloat(v)*full/100:num(v);
          const w=offset(ps.width,cw),h=offset(ps.height,ch);
          const x=ps.left==='auto'?cw-offset(ps.right,cw)-w:offset(ps.left,cw);
          const y=ps.top==='auto'?ch-offset(ps.bottom,ch)-h:offset(ps.top,ch);
          return {x:box.left+borderX+x,y:box.top+borderY+y,w,h,visible:visible(el)};
        };
        const anchor=spec=>{
          const b=nodeBox(spec.node);if(!b.visible)throw new Error(`Hidden endpoint ${spec.node}`);
          const points={top:[b.x+b.w/2,b.y],bottom:[b.x+b.w/2,b.y+b.h],left:[b.x,b.y+b.h/2],right:[b.x+b.w,b.y+b.h/2],center:[b.x+b.w/2,b.y+b.h/2]};
          if(!points[spec.anchor])throw new Error(`Invalid anchor: ${spec.anchor}`);
          return points[spec.anchor];
        };
        const near=(p,b)=>p[0]>=b.x-tol&&p[0]<=b.x+b.w+tol&&p[1]>=b.y-tol&&p[1]<=b.y+b.h+tol;
        const touching=(a,b)=>a.x<=b.x+b.w+tol&&a.x+a.w>=b.x-tol&&a.y<=b.y+b.h+tol&&a.y+a.h>=b.y-tol;
        for(const route of config.connections || []) {
          if(innerWidth<(route.minWidth || 0)||innerWidth>(route.maxWidth || Infinity)){skipped.push(route.name);continue;}
          const segments=route.segments.map(nodeBox);
          const fail=reason=>failures.push(`${route.name}: ${reason}`);
          if(!segments.length) {fail('no segments');continue;}
          if(segments.some(s=>!s.visible)){fail('hidden connector at an enabled width');continue;}
          if(segments.some(s=>Math.min(s.w,s.h)>3)){fail('segment is not a thin axis-aligned stroke');continue;}
          const from=anchor(route.from),to=anchor(route.to);
          if(!near(from,segments[0]))fail('source endpoint does not touch connector');
          if(!near(to,segments.at(-1)))fail('target endpoint does not touch connector');
          for(let i=1;i<segments.length;i++)if(!touching(segments[i-1],segments[i]))fail(`segment ${i} does not meet segment ${i+1}`);
          checks.push({connection:route.name,from,to});
        }
        return {width:innerWidth,failures:[...new Set(failures)],checks,skipped};
      },config);
      await (await page.$(config.root)).screenshot({path:path.join(out,`diagram-${width}.png`)});
      report.widths.push(result);
    }
    report.passed=report.widths.every(r=>r.failures.length===0);
  } finally {
    await browser.close();
    fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2)+'\n');
  }
  for(const result of report.widths) console.log(`${result.width}px: ${result.failures.length?result.failures.join('; '):'PASS'}`);
  console.log(`Report: ${path.join(out,'report.json')}`);
  if(!report.passed)process.exitCode=1;
}
main().catch(error=>{console.error(error.message);process.exitCode=2;});
