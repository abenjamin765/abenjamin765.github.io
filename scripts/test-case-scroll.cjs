const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require('puppeteer');
const url = process.env.CASE_SCROLL_URL || 'http://127.0.0.1:8765/newsite/indeed-job-refresh.html';
const output = process.env.CASE_SCROLL_OUTPUT || '/private/tmp/case-scroll-review';

(async () => {
  fs.mkdirSync(output,{recursive:true});
  const browser = await puppeteer.launch({headless:'shell'});
  const results = {checks:[],errors:[]};
  try {
    const page = await browser.newPage();
    page.on('pageerror',error => results.errors.push(error.message));
    const reload = async () => {
      await page.evaluate(() => scrollTo(0,0));
      await page.goto(url,{waitUntil:'load'});
      await page.waitForFunction(() => !!document.querySelector('[data-case-reveal="pending"]'));
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    };
    for (const width of [320,390,862,949,1440]) {
      await page.setViewport({width,height:928});
      await reload();
      assert(await page.$eval('.case-hero',el => getComputedStyle(el).opacity==='1'));
      assert(!(await page.evaluate(() => document.documentElement.scrollWidth>innerWidth)));
      await page.$eval('#problem h2',el => el.scrollIntoView({block:'center'}));
      await page.waitForFunction(() => document.querySelector('#problem h2').dataset.caseReveal==='visible');
      const motion=await page.$eval('#problem h2',el => el.getAnimations().map(a => ({property:a.transitionProperty,duration:a.effect.getTiming().duration,easing:a.effect.getTiming().easing,frames:a.effect.getKeyframes().map(f => ({opacity:f.opacity,transform:f.transform}))})));
      assert(motion.some(a => a.property==='transform') && motion.some(a => a.property==='opacity'),JSON.stringify({width,motion,style:await page.$eval('#problem h2',el=>({state:el.dataset.caseReveal,opacity:getComputedStyle(el).opacity,transition:getComputedStyle(el).transition,transform:getComputedStyle(el).transform}))}));
      assert(motion.every(a => Math.abs(a.duration-1400)<1),JSON.stringify(motion));
      if (width===862) {
        await page.$eval('#problem h2',el => el.getAnimations().forEach(a => {a.pause();a.currentTime=500;}));
        await page.screenshot({path:path.join(output,'entrance-862.png')});
        await page.$eval('#problem h2',el => el.getAnimations().forEach(a => a.play()));
      }
      await page.waitForFunction(() => document.querySelector('#problem h2').dataset.caseReveal==='settled');
      await page.evaluate(() => scrollTo(0,0));
      await page.$eval('#problem h2',el => el.scrollIntoView({block:'center'}));
      assert.equal(await page.$eval('#problem h2',el => el.dataset.caseReveal),'settled');
      await page.$eval('.case-next a',el => el.focus());
      assert(await page.$eval('.case-next',el => el.dataset.caseReveal==='settled' && getComputedStyle(el).opacity==='1'));
      await page.keyboard.press('Tab');
      assert.equal(await page.$$eval('[data-case-reveal="pending"],[data-case-reveal="visible"]',els => els.length),0);
      results.checks.push({width,onceOnly:true,keyboardAndFocus:true,motion});
      console.log(`PASS ${width}: CSS entrance, once-only, focus, keyboard`);
    }

    await page.setViewport({width:862,height:928});
    await reload();
    await page.evaluate(() => scrollTo(0,document.documentElement.scrollHeight));
    await page.waitForFunction(() => ![...document.querySelectorAll('[data-case-reveal="pending"]')].some(el => el.getBoundingClientRect().bottom<=0));
    results.fastJump=true;
    await reload();
    await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
    await page.waitForFunction(() => !document.querySelector('[data-case-reveal="pending"],[data-case-reveal="visible"]'));
    await page.reload({waitUntil:'load'});
    assert.equal(await page.$$eval('[data-case-reveal]',els => els.length),0);
    results.reducedMotionAndLiveChange=true;
    await page.emulateMediaFeatures([]);
    await reload();
    await page.emulateMediaType('print');
    assert(await page.$$eval('[data-case-reveal]',els => els.every(el => getComputedStyle(el).opacity==='1')));
    await page.evaluate(() => dispatchEvent(new Event('beforeprint')));
    await page.waitForFunction(() => !document.querySelector('[data-case-reveal="pending"],[data-case-reveal="visible"]'));
    results.print=true;
    await page.emulateMediaType('screen');
    await reload();
    await page.setViewport({width:390,height:928});
    await page.waitForFunction(() => !document.querySelector('[data-case-reveal="pending"],[data-case-reveal="visible"]'));
    results.resize=true;

    const noObserver = await page.evaluateOnNewDocument(() => {delete window.IntersectionObserver;});
    await page.reload({waitUntil:'load'});
    assert.equal(await page.$$eval('[data-case-reveal]',els => els.length),0);
    await page.removeScriptToEvaluateOnNewDocument(noObserver.identifier);
    const failedObserver = await page.evaluateOnNewDocument(() => {window.IntersectionObserver=class {constructor(){throw Error('test observer failure');}};});
    await page.reload({waitUntil:'load'});
    assert.equal(await page.$$eval('[data-case-reveal="pending"],[data-case-reveal="visible"]',els => els.length),0);
    await page.removeScriptToEvaluateOnNewDocument(failedObserver.identifier);
    results.unsupportedAndSetupFailure=true;
    await page.setJavaScriptEnabled(false);
    await page.reload({waitUntil:'load'});
    assert.equal(await page.$$eval('[data-case-reveal]',els => els.length),0);
    assert(await page.$eval('#problem',el => getComputedStyle(el).opacity==='1'));
    results.noJavaScript=true;
    await page.setJavaScriptEnabled(true);
    await page.reload({waitUntil:'load'});
    await page.keyboard.press('Tab');
    await page.addScriptTag({path:path.join(__dirname,'../node_modules/axe-core/axe.js')});
    results.axe=await page.evaluate(async () => (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}})).violations.map(v=>v.id));
    assert.equal(results.axe.length,0);
    assert.equal(results.errors.length,0);
    await page.screenshot({path:path.join(output,'settled-390.png'),fullPage:true});
    console.log(JSON.stringify(results,null,2));
  } finally {
    fs.writeFileSync(path.join(output,'results.json'),JSON.stringify(results,null,2));
    await browser.close();
  }
})().catch(error => {console.error(error);process.exitCode=1;});
