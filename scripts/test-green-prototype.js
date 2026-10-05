const assert=require('node:assert/strict');
const puppeteer=require('puppeteer');
const express=require('express');
const path=require('node:path');
(async()=>{
 const app=express();app.use(express.static(path.resolve(__dirname,'../dist')));
 const server=await new Promise(resolve=>{const s=app.listen(0,'127.0.0.1',()=>resolve(s))});
 const browser=await puppeteer.launch({headless:true,browser:process.env.PORTFOLIO_TEST_BROWSER || 'chrome'});
 try {
  const page=await browser.newPage();await page.setViewport({width:1100,height:900});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/prototypes/green-loom/index.html`, {waitUntil:"load"});
  await page.waitForSelector('[data-slot="catalog-card"]');
  assert.equal(await page.$$eval('[data-slot="catalog-card"]',es=>es.length),8,'Eight published sample products');
  await page.waitForFunction(()=>[...document.querySelectorAll('[data-slot="catalog-card"] img')].every(img=>img.complete&&img.naturalWidth>0));
  assert.equal(await page.$$eval('[data-slot="catalog-card"] img',es=>new Set(es.map(e=>e.getAttribute('src'))).size),6,'Six distinct product category images');
  await page.type('#catalog-search','Topical');await page.waitForFunction(()=>document.querySelectorAll('[data-slot="catalog-card"]').length===1);
  const clickText=async(selector,text)=>{const elements=await page.$$(selector);for(const el of elements){if((await el.evaluate(n=>n.textContent)).trim()===text){await el.click();return}}throw Error('Missing '+text)};
  await page.locator('a[href="#prd-demo-topical-relief"]').click();await page.waitForSelector('[role="tab"][id$="trigger-variants"]');await page.locator('[role="tab"][id$="trigger-variants"]').click();
  await clickText('button','Adjust stock');
  const delta=await page.$('[role="dialog"] input');await delta.type('4');
  await clickText('button','Review adjustment');await clickText('button','Apply adjustment');
  await page.waitForFunction(()=>!document.querySelector('[role="dialog"]'));
  assert.match(await page.$eval('a[href="#prd-demo-topical-relief"]',e=>e.textContent),/10/);
  const values=await page.$$eval('.demo-detail input',es=>es.filter(e=>e.readOnly).map(e=>e.value));
  assert.equal(values.filter(v=>v==='10').length,2,'On-hand and available both update');
  await page.locator('[aria-label="Reset prototype"]').click();
  await page.type('#catalog-search','does not exist');await page.waitForFunction(()=>document.body.textContent.includes('No Products match'));
  await clickText('button','Clear filters');assert.equal(await page.$eval('#catalog-search',e=>e.value),'');
  await page.waitForSelector('a[href="#prd-demo-topical-relief"]');await clickText('[role="tab"]','Draft');await page.waitForFunction(()=>document.querySelector('[id$="trigger-draft"]').getAttribute('aria-selected')==='true');for(const button of await page.$$('button[aria-expanded]')){if((await button.evaluate(e=>e.textContent)).trim().startsWith('Edible')&&(await button.evaluate(e=>e.getAttribute('aria-expanded')))==='false')await button.click();}await page.waitForSelector('a[href="#prd-demo-gummies-10pack"]');
  await page.setViewport({width:390,height:740});await page.waitForFunction(()=>{const e=document.querySelector('a[href="#prd-demo-gummies-10pack"]');const r=e.getBoundingClientRect();return document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)?.closest('a')===e});await page.locator('a[href="#prd-demo-gummies-10pack"]').click();await page.waitForSelector('.has-detail');
  assert.equal(await page.$eval('.demo-list',e=>getComputedStyle(e).display),'none');
  assert.equal(await page.$eval('.demo-back',e=>getComputedStyle(e).display),'inline-flex');
  await clickText('button','Back to catalog');await page.waitForFunction(()=>!document.querySelector('.has-detail'));
  assert.notEqual(await page.$eval('.demo-list',e=>getComputedStyle(e).display),'none');
  for(const width of [240,320,390,768,1100]){await page.setViewport({width,height:740});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Fits '+width)}
  assert.deepEqual(errors,[]);console.log('Green Loom prototype passed: stock consistency, reset, empty search recovery, publication filters, mobile back navigation, responsive fit, no runtime errors.');
 }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
