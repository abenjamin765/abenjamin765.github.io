const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const express=require('express');
const puppeteer=require('puppeteer');
const {portfolioSite,portfolioProjects}=require('../lib/portfolio-data')();
const dist=path.resolve(__dirname,'../dist');
const routes=['/',...Object.values(portfolioProjects).map(p=>p.href),'/resume.html','/writing.html','/blog/ai-is-exposing-ux-design/','/404.html'];
const output=process.env.PORTFOLIO_REVIEW_DIR;
const summary=[];
const axeResults=[];
async function main(){
 const app=express();app.use(express.static(dist));app.use((req,res)=>res.status(404).sendFile(path.join(dist,'404.html')));
 const server=await new Promise(resolve=>{const s=app.listen(0,'127.0.0.1',()=>resolve(s));});
 const origin=`http://127.0.0.1:${server.address().port}`;
 let browser;
 try{
  browser=await puppeteer.launch({headless:true,browser:process.env.PORTFOLIO_TEST_BROWSER || 'chrome'});const page=await browser.newPage();
  if(process.env.PORTFOLIO_TEST_BROWSER!=='firefox') await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
  for(const route of routes){
   const errors=[];const listen=e=>errors.push(e.message);page.on('pageerror',listen);
   for(const width of [320,390,768,1024,1440]){
    await page.setViewport({width,height:1000});await page.goto(origin+route,{waitUntil:'load'});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${route} overflow at ${width}`);
    assert.equal(await page.$$eval('h1',ns=>ns.length),1,`${route} one h1`);
    assert.equal(await page.$eval('html',n=>n.lang),'en');
    assert.equal(await page.evaluate(()=>document.compatMode),'CSS1Compat',`${route} standards rendering`);
    await page.keyboard.press('Tab');
    const skip=await page.evaluate(()=>{const n=document.activeElement,r=n.getBoundingClientRect(),s=getComputedStyle(n);return {text:n.textContent,visible:r.width>30&&r.height>20&&s.clip==='auto',href:n.getAttribute('href')}});
    assert.equal(skip.href,'#main',`${route} skip is first focus`);assert.ok(skip.visible,`${route} focused skip visible`);
    await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>location.hash),'#main');
    if([390,1440].includes(width)){
     await page.addScriptTag({path:require.resolve('axe-core')});
     const result=await page.evaluate(async()=>await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}}));
     axeResults.push({route,width,violations:result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
    }
    if(output&&[390,1440].includes(width)){
     fs.mkdirSync(output,{recursive:true});await page.evaluate(()=>scrollTo(0,0));
     await page.$$eval('img',ns=>ns.forEach(n=>n.loading='eager'));await page.waitForFunction(()=>[...document.images].every(i=>i.complete));
     await page.screenshot({path:path.join(output,(route==='/'?'home':route.replace(/[^a-z0-9]/gi,'-'))+'-'+width+'.png'),fullPage:true});
    }
   }
   const info=await page.evaluate(()=>({canonical:document.querySelector('[rel="canonical"]').href,og:document.querySelector('[property="og:url"]').content,share:document.querySelector('[property="og:image"]').content,twitter:document.querySelector('[name="twitter:image"]').content,schemas:[...document.querySelectorAll('[type="application/ld+json"]')].map(n=>JSON.parse(n.textContent)),title:document.title,description:document.querySelector('[name="description"]').content,ids:[...document.querySelectorAll('[id]')].map(n=>n.id),badLabels:[...document.querySelectorAll('[aria-labelledby]')].flatMap(n=>n.getAttribute('aria-labelledby').split(/\s+/).filter(id=>!document.getElementById(id)))}));
   assert.equal(info.canonical,portfolioSite.baseUrl+route);assert.equal(info.og,info.canonical);assert.equal(info.twitter,info.share);assert.ok(info.description.length>30);assert.ok(info.schemas.length);assert.deepEqual(info.badLabels,[]);assert.equal(new Set(info.ids).size,info.ids.length,`${route} unique IDs`);
   const sharePath=info.share.replace(portfolioSite.baseUrl,'');assert.ok(fs.existsSync(path.join(dist,sharePath)),`${route} share image exists`);
   const project=Object.values(portfolioProjects).find(p=>p.href===route);
   if(project){
    const opening=await page.$eval('.folio-case__hero',n=>[...n.children].map(x=>x.className));assert.match(opening[1],/facts/);assert.match(opening[2],/media/);assert.equal(opening.length,3);
    assert.equal(await page.$$eval('.folio-case__facts dt',ns=>ns.map(n=>n.textContent).join('|')),'Role|Scope|Key decision|Outcome');
    assert.equal(await page.$('.folio-case .evidence-label, .folio-case .evidence-link'), null);
    const words=await page.$eval('.folio-case',node=>{const clone=node.cloneNode(true);clone.querySelectorAll('details,.folio-case__hero,.folio-case__figure,.folio-story-flow,.folio-story-compare,.markdown-demo,.green-prototype,.assignment-comparison,.evidence-excerpt,.artifact-states').forEach(n=>n.remove());return clone.textContent.trim().split(/\s+/).length;});
    summary.push({route,primaryWords:words});
   }
   // Text-only enlargement, independently of the 320px reflow viewport checks.
   await page.setViewport({width:1280,height:1000});await page.goto(origin+route,{waitUntil:'load'});
   await page.evaluate(()=>{const nodes=[...document.querySelectorAll('body *')];const sizes=nodes.map(n=>parseFloat(getComputedStyle(n).fontSize));nodes.forEach((n,i)=>n.style.fontSize=`${sizes[i]*2}px`);});
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${route} 200% text enlargement fits`);
   page.off('pageerror',listen);assert.deepEqual(errors,[],`${route} no runtime errors`);
  }
  const xml=fs.readFileSync(path.join(dist,'sitemap.xml'),'utf8');
  const locs=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);assert.equal(locs.length,13);assert.equal(new Set(locs).size,13);
  for(const route of routes.filter(r=>r!='/404.html'))assert.ok(locs.includes(portfolioSite.baseUrl+route));assert.ok(!xml.includes('prototypes'));
  assert.match(fs.readFileSync(path.join(dist,'robots.txt'),'utf8'),new RegExp('Sitemap: '+portfolioSite.baseUrl+'/sitemap.xml'));
  assert.match(fs.readFileSync(path.join(dist,'prototypes/green-loom/index.html'),'utf8'),/name="robots" content="noindex,follow"/);
  const missing=await page.goto(origin+'/a-page-that-does-not-exist',{waitUntil:'load'});assert.equal(missing.status(),404);assert.match(await page.$eval('h1',n=>n.textContent),/page/i);
  await page.goto(origin+'/indeed-job-refresh.html',{waitUntil:'load'});
  await page.focus('details.case-disclosure summary');await page.keyboard.press('Enter');assert.ok(await page.$eval('details.case-disclosure',n=>n.open));await page.keyboard.press('Enter');assert.ok(!await page.$eval('details.case-disclosure',n=>n.open));
  await page.goto(origin+'/design-dash.html',{waitUntil:'load'});assert.equal(await page.$$eval('.artifact-state',ns=>ns.length),2);assert.deepEqual(await page.$$eval('.artifact-state__status',ns=>ns.map(n=>n.textContent)),['Available','On loan · due Friday']);
  await page.goto(origin+'/green-loom.html',{waitUntil:'load'});assert.match(await page.$eval('#green-prototype-title',n=>n.textContent),/sample catalog/);assert.equal(await page.$eval('#green-catalog-demo iframe',n=>n.loading),'lazy');
  await page.goto(origin+'/',{waitUntil:'load'});
  if(process.env.PORTFOLIO_TEST_BROWSER!=='firefox'){const cdp=await page.createCDPSession();const ax=await cdp.send('Accessibility.getFullAXTree');assert.ok(ax.nodes.some(n=>n.role?.value==='heading'&&n.name?.value.includes('complex problems')),'Accessible homepage headline');}
  const color=await page.$eval('.folio-hero__rotator',n=>getComputedStyle(n).color);const rgb=color.match(/\d+/g).map(Number);const channel=v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4};const luminance=.2126*channel(rgb[0])+.7152*channel(rgb[1])+.0722*channel(rgb[2]);const contrast=1.05/(luminance+.05);assert.ok(contrast>=4.5,'Headline accent contrast');
  if(output)fs.writeFileSync(path.join(output,'accessibility-results.json'),JSON.stringify(axeResults,null,2));
  assert.deepEqual(axeResults.filter(r=>r.violations.length),[],'WCAG automated checks');
  console.log(JSON.stringify({pages:routes.length,widths:[320,390,768,1024,1440],primaryNarrative:summary,headlineContrast:contrast.toFixed(2),sitemapPages:locs.length,keyboard:'skip links and native disclosures verified',accessibilityTree:process.env.PORTFOLIO_TEST_BROWSER==='firefox'?'not queried via CDP':'homepage heading verified'},null,2));
 }finally{await browser?.close();await new Promise(resolve=>server.close(resolve));}
}
main().catch(e=>{console.error(e);process.exitCode=1});
