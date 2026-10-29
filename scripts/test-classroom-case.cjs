/* Focused regression checks for the restored standalone Classroom prototype. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const puppeteer=require('puppeteer');
const url=process.env.CLASSROOM_CASE_URL||'http://127.0.0.1:8765/newsite/classroom-assignment-management.html';
const output=process.env.CLASSROOM_CASE_OUTPUT||'/private/tmp/classroom-case-review';
(async()=>{
 fs.mkdirSync(output,{recursive:true});
 const browser=await puppeteer.launch({headless:'shell'});
 const results={widths:[],errors:[]};
 try{
  const page=await browser.newPage();
  page.on('pageerror',e=>results.errors.push(e.message));
  const load=()=>page.goto(url,{waitUntil:'load'});
  const settle=()=>new Promise(r=>setTimeout(r,500));
  const audit=async(label)=>{
   await page.addScriptTag({path:require.resolve('axe-core')});
   const violations=await page.evaluate(async()=> (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})));
   assert.deepEqual(violations,[],label);return {label,violations};
  };
  for(const width of [320,390,768,949,1440]){
   await page.setViewport({width,height:1000});await load();
   assert.equal(await page.$eval('#comparison-after-tab',e=>e.getAttribute('aria-selected')),'true');
   assert.equal(await page.$eval('#comparison-before',e=>e.hidden),true);
   assert.equal(await page.$$eval('.folio-demo__assignment[open]',es=>es.length),1);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   await page.$eval('.assignment-comparison',e=>e.scrollIntoView({block:'start'}));
   await page.screenshot({path:path.join(output,`solution-${width}.png`)});
   if(width===390||width===1440){await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:path.join(output,`opening-${width}.png`),fullPage:false});}
   results.widths.push({width,solutionDefault:true,noPageOverflow:true});
  }
  const group='.folio-demo__group:nth-of-type(3)';
  await page.$eval(group+' > summary',e=>e.focus());await page.keyboard.press('Enter');
  assert(await page.$eval(group,e=>e.open));
  await page.keyboard.press('Enter');assert(!(await page.$eval(group,e=>e.open)));
  const summaries=await page.$$('.folio-demo__group:nth-of-type(2) .folio-demo__assignment > summary');
  await summaries[1].click();await settle();
  assert.equal(await page.$$eval('.folio-demo__assignment[open]',es=>es.length),1);
  await page.click('.folio-demo__assignment[open] button[data-sort-key="student"]');
  const names=await page.$$eval('.folio-demo__assignment[open] tbody th',es=>es.map(e=>e.textContent.trim()));
  assert.deepEqual(names,[...names].sort((a,b)=>a.localeCompare(b)));
  await page.click('.folio-demo__assignment[open] button[data-sort-key="student"]');
  assert.deepEqual(await page.$$eval('.folio-demo__assignment[open] tbody th',es=>es.map(e=>e.textContent.trim())),[...names].reverse());
  await page.click('.folio-demo__assignment[open] button[data-sort-key="result"]');
  assert.equal(await page.$eval('.folio-demo__assignment[open] th[aria-sort="ascending"] [data-sort-key]',e=>e.dataset.sortKey),'result');
  await page.$eval('#comparison-after-tab',e=>e.focus());await page.keyboard.press('ArrowLeft');
  assert.equal(await page.$eval('#comparison-before',e=>e.hidden),false);
  assert.equal(await page.$eval('#comparison-after',e=>e.inert),true);
  results.beforeAccessibility=await audit('Before comparison');
  await page.keyboard.press('End');assert.equal(await page.$eval('#comparison-after',e=>e.hidden),false);
  results.afterAccessibility=await audit('After comparison');
  await page.setViewport({width:320,height:1000});
  await page.evaluate(()=>{
   const els=[...document.querySelectorAll('#assignment-comparison p,#assignment-comparison span,#assignment-comparison th,#assignment-comparison td,#assignment-comparison button')];
   const sizes=els.map(e=>getComputedStyle(e).fontSize);
   els.forEach((e,i)=>e.style.fontSize=parseFloat(sizes[i])*2+'px');
  });
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));results.enlargedText=true;
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);await load();
  await page.$eval('.folio-demo__assignment[open] > summary',e=>e.click());
  assert.equal(await page.$$eval('.folio-demo__assignment[open]',es=>es.length),0);
  assert.equal(await page.evaluate(()=>document.getAnimations().length),0);results.reducedMotion=true;
  await page.setJavaScriptEnabled(false);await load();
  assert.equal(await page.$$eval('#comparison-before[hidden],#comparison-after[hidden]',es=>es.length),0);
  assert.equal(await page.$eval('.assignment-comparison__tabs',e=>e.hidden),true);
  await page.click('.folio-demo__assignment-summary');
  assert.equal(await page.$$eval('.folio-demo__assignment[open]',es=>es.length),2);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));results.noJavaScript=true;
  assert.deepEqual(results.errors,[]);console.log('PASS Classroom: five widths; default solution; group/assignment disclosures; name/result sorting; tabs and focus; before/after accessibility; enlarged text; reduced motion; no JavaScript');
 }finally{fs.writeFileSync(path.join(output,'classroom-prototype-results.json'),JSON.stringify(results,null,2));await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
