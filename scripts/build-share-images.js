const fs=require('node:fs');
const path=require('node:path');
const express=require('express');
const puppeteer=require('puppeteer');
const {portfolioSite,portfolioProjects}=require('../lib/portfolio-data')();
const root=path.resolve(__dirname,'..');
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
async function main(){
  const app=express();app.get('/',(req,res)=>res.type('html').send('<!doctype html><title>Share image renderer</title>'));app.use(express.static(path.join(root,'src')));
  const server=await new Promise(resolve=>{const s=app.listen(0,'127.0.0.1',()=>resolve(s));});
  const origin=`http://127.0.0.1:${server.address().port}`;
  let browser;
  try{
    browser=await puppeteer.launch({headless:true,executablePath:process.env.PUPPETEER_EXECUTABLE_PATH || undefined});
    const page=await browser.newPage();await page.setViewport({width:1200,height:630,deviceScaleFactor:1});await page.goto(origin,{waitUntil:'domcontentloaded'});
    const entries=[{id:'portfolio',title:'Complex systems. Clear decisions.',group:'UX & product design',subtitle:'Staff / Principal IC · Aaron Benjamin',heroImage:'/assets/img/folio/hero-portrait.png'},...Object.values(portfolioProjects).map(p=>({...p,subtitle:p.facts.find(f=>f.label==='Key decision')?.value||p.description})),{id:'writing',title:'Thinking behind the work',group:'Writing',subtitle:'Product systems, design judgment, and responsible AI.',heroImage:'/assets/img/hero-ai.png'}];
    const dir=path.join(root,'src/assets/img/folio/share');fs.mkdirSync(dir,{recursive:true});
    for(const item of entries){
      const html=`<!doctype html><html lang="en"><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;background:#f8b731;font-family:Arial,sans-serif;color:#333}main{margin:35px;height:560px;background:#fff;display:grid;grid-template-columns:1fr 1fr;padding:48px;gap:36px}section{display:flex;flex-direction:column;justify-content:center}.eyebrow{color:#9a4e00;font-size:19px;font-weight:bold;text-transform:uppercase;letter-spacing:.02em}h1{font-size:48px;line-height:1.1;letter-spacing:-1.5px;margin:24px 0}p{font-size:24px;line-height:1.4;margin:0}footer{font-size:18px;font-weight:bold;margin-top:36px}figure{margin:0;display:flex;align-items:center;justify-content:center;background:#f6f6f2;padding:16px}img{width:100%;max-height:430px;object-fit:contain}</style><main><section><div class="eyebrow">${esc(item.group==='featured'?'Selected work':item.group)}</div><h1>${esc(item.title)}</h1><p>${esc(item.subtitle.length>180?item.subtitle.slice(0,177)+'…':item.subtitle)}</p><footer>Aaron Benjamin · UX & product design</footer></section><figure><img alt="" src="${origin+item.heroImage}"></figure></main></html>`;
      await page.setContent(html,{waitUntil:'domcontentloaded'});
      await page.waitForFunction(()=>[...document.images].every(i=>i.complete),{timeout:15000});
      if(!await page.$eval('img',i=>i.naturalWidth)) throw new Error('Share image failed: '+item.heroImage);
      await page.screenshot({path:path.join(dir,item.id+'.jpg'),type:'jpeg',quality:88});
    }
    console.log(`Built ${entries.length} share images from the shared catalog and retained assets.`);
  }finally{await browser?.close();await new Promise(resolve=>server.close(resolve));}
}
main().catch(error=>{console.error(error);process.exitCode=1});
