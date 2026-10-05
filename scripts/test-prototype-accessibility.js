const assert=require('node:assert/strict');
const path=require('node:path');
const fs=require('node:fs');
const puppeteer=require('puppeteer');
const express=require('express');
const report=[];
async function main(){
 const app=express();app.use(express.static(path.resolve(__dirname,'../dist')));
 const server=await new Promise(resolve=>{const s=app.listen(0,'127.0.0.1',()=>resolve(s));});
 const origin=`http://127.0.0.1:${server.address().port}`;
 const browser=await puppeteer.launch({headless:true,browser:process.env.PORTFOLIO_TEST_BROWSER||'chrome'});
 const page=await browser.newPage();
 const settle=()=>new Promise(resolve=>setTimeout(resolve,600));
 const clickText=async(selector,text)=>{for(const e of await page.$$(selector)){if((await e.evaluate(n=>n.textContent)).trim()===text&&await e.evaluate(n=>n.getBoundingClientRect().width>0)){await e.click();return;}}throw Error(`Missing visible ${text}`);};
 const audit=async(name)=>{
  await settle();await page.addScriptTag({path:require.resolve('axe-core')});
  const result=await page.evaluate(async()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}}));
  report.push({name,violations:result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
 };
 try{
  await page.setViewport({width:1100,height:900});
  await page.goto(origin+'/prototypes/green-loom/index.html',{waitUntil:'load'});
  await page.waitForSelector('[data-slot="catalog-card"]');await audit('Green catalog');
  await page.focus('a[href="#prd-demo-topical-relief"]');await page.keyboard.press('Enter');
  await page.waitForSelector('[role="tab"][id$="trigger-variants"]');await audit('Green product');
  await page.locator('[role="tab"][id$="trigger-variants"]').click();await audit('Green variants');
  await clickText('button','Adjust stock');await page.waitForSelector('[role="dialog"]');await audit('Green adjustment dialog');
  await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.querySelector('[role="dialog"]'));await settle();
  assert.equal(await page.evaluate(()=>document.activeElement.textContent.trim()),'Adjust stock','Cancel restores stock launch control');
  await page.keyboard.press('Enter');await page.waitForSelector('[role="dialog"] input');
  await page.locator('[role="dialog"] input').fill('4');await clickText('button','Review adjustment');await audit('Green adjustment review');await clickText('button','Apply adjustment');
  await page.waitForFunction(()=>!document.querySelector('[role="dialog"]'));await settle();
  assert.equal(await page.evaluate(()=>document.activeElement.textContent.trim()),'Adjust stock','Save restores remounted stock launch control');
  assert.match(await page.$eval('.demo-message',n=>n.textContent),/Stock updated/);
  assert.equal(await page.$eval('.demo-message',n=>n.getAttribute('role')),'status');
  await page.goto(origin+'/price-adjustments.html#price-markdown-demo',{waitUntil:'load'});
  await page.focus('[aria-label="More actions: Philips Hue A19 smart light bulb"]');await page.keyboard.press('Enter');await clickText('button','Apply markdown');await audit('Price markdown editor');
  await page.keyboard.press('Escape');await settle();assert.equal(await page.evaluate(()=>document.activeElement.getAttribute('aria-label')),'More actions: Philips Hue A19 smart light bulb');
  assert.deepEqual(report.filter(r=>r.violations.length),[],'Settled prototype states meet automated WCAG checks');
  console.log('Prototype accessibility passed: catalog, product, variants, adjustment and review, markdown editor; cancel/save focus restoration and stock status announcement.');
 }finally{
  if(process.env.PORTFOLIO_REVIEW_DIR){fs.mkdirSync(process.env.PORTFOLIO_REVIEW_DIR,{recursive:true});fs.writeFileSync(path.join(process.env.PORTFOLIO_REVIEW_DIR,'prototype-accessibility.json'),JSON.stringify(report,null,2));}
  await browser.close();await new Promise(resolve=>server.close(resolve));
 }
}
main().catch(e=>{console.error(e);process.exitCode=1});
