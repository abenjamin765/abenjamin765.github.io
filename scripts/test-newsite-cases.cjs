/* Local-only regression checks for the standalone /newsite case collection. */
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const puppeteer = require('puppeteer');

const root = path.resolve(__dirname, '..');
const output = process.env.CASE_REVIEW_OUTPUT || '/private/tmp/newsite-case-review';
const assetsOnly = process.argv.includes('--assets-only');
const slugs = ['classroom-assignment-management', 'indeed-job-refresh', 'curbside-pickup', 'price-adjustments', 'green-loom', 'home-depot-design-leadership', 'a-to-z-first-claim', 'design-dash', 'many-hats', 'shapes'];
const mime = {'.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.svg':'image/svg+xml', '.png':'image/png', '.webp':'image/webp', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.woff2':'font/woff2', '.json':'application/json'};
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = path.resolve(root, '.' + pathname + (pathname.endsWith('/') ? 'index.html' : ''));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  fs.readFile(file, (error, bytes) => {
    if (error) { res.writeHead(404).end(); return; }
    res.writeHead(200, {'Content-Type': mime[path.extname(file)] || 'application/octet-stream'}).end(bytes);
  });
});

(async () => {
  fs.mkdirSync(output, {recursive:true});
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await puppeteer.launch({headless:'shell'});
  const results = {cases:[], routes:[], failures:[]};
  try {
    const page = await browser.newPage();
    let errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    await page.setRequestInterception(true);
    page.on('request', request => {
      if (request.url().startsWith(origin) || request.url().startsWith('data:')) request.continue();
      else { errors.push(`External dependency: ${request.url()}`); request.abort(); }
    });
    for (const [index, slug] of slugs.entries()) {
      errors = [];
      const result = {slug, widths:[]};
      await page.setViewport({width:1440,height:1000});
      await page.goto(`${origin}/newsite/${slug}.html`, {waitUntil:'load'});
      await page.evaluate(async () => {
        for (const img of document.images) img.loading = 'eager';
        for (const frame of document.querySelectorAll('iframe')) frame.loading = 'eager';
        await Promise.all([...document.images].map(img => img.decode().catch(() => {})));
      });
      result.structure = await page.evaluate(() => ({
        h1:document.querySelectorAll('h1').length,
        title:document.title,
        facts:!!document.querySelector('.case-facts'),
        chapters:document.querySelectorAll('.case-chapter').length,
        outcome:!!document.querySelector('.case-outcome'),
        reflection:!!document.querySelector('.case-reflection'),
        next:document.querySelector('.case-next a')?.getAttribute('href'),
        headings:[...document.querySelectorAll('h1,h2')].map(h => h.textContent.trim()),
        brokenImages:[...document.images].filter(img => !img.complete || !img.naturalWidth).map(img => img.getAttribute('src')),
        missingLabels:[...document.querySelectorAll('[aria-labelledby]')].flatMap(el => el.getAttribute('aria-labelledby').split(/\s+/).filter(id => !document.getElementById(id))),
        ids:[...document.querySelectorAll('[id]')].map(el => el.id),
        hrefs:[...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')),
        summaries:document.querySelectorAll('details summary').length,
        emptyDisclosures:[...document.querySelectorAll('details')].filter(d => d.children.length < 2).length
      }));
      assert.equal(result.structure.h1,1,`${slug}: one h1`);
      assert(result.structure.facts && result.structure.chapters && result.structure.outcome && result.structure.reflection,`${slug}: shared case structure`);
      assert.equal(result.structure.next,slugs[(index + 1) % slugs.length]+'.html',`${slug}: next-case order`);
      assert.equal(result.structure.brokenImages.length,0,`${slug}: image assets`);
      assert.equal(result.structure.missingLabels.length,0,`${slug}: label targets`);
      assert.equal(result.structure.emptyDisclosures,0,`${slug}: nonempty disclosures`);
      assert.equal(new Set(result.structure.ids).size,result.structure.ids.length,`${slug}: unique ids`);
      for (const href of result.structure.hrefs) {
        if (/^(https?:|mailto:|tel:)/.test(href)) {
          assert(!slugs.some(s => href === `https://www.aaronbenjamin.design/${s}.html`),`${slug}: legacy case route`);
          continue;
        }
        if (href.startsWith('#')) assert(result.structure.ids.includes(href.slice(1)),`${slug}: ${href}`);
        else {
          const target = new URL(href,`${origin}/newsite/${slug}.html`);
          assert(target.pathname.startsWith('/newsite/'),`${slug}: local navigation ${href}`);
          assert(fs.existsSync(path.join(root,decodeURIComponent(target.pathname))),`${slug}: destination ${href}`);
        }
      }
      if (assetsOnly) {
        result.errors=[...new Set(errors)];
        assert.equal(result.errors.length,0,`${slug}: asset errors ${JSON.stringify(result.errors)}`);
        results.cases.push(result);
        console.log(`PASS ${slug}: local assets and routes`);
        continue;
      }
      for (const width of [320,390,768,949,1440]) {
        await page.setViewport({width,height:1000});
        const measurement = await page.evaluate(() => ({width:innerWidth,overflow:document.documentElement.scrollWidth > innerWidth+1,height:document.documentElement.scrollHeight}));
        result.widths.push(measurement);
        assert(!measurement.overflow,`${slug}: overflow at ${width}`);
        await page.screenshot({path:path.join(output,`${slug}-${width}.png`),fullPage:true});
      }
      if (result.structure.summaries) {
        const summary = await page.$('details summary');
        const initiallyOpen = await summary.evaluate(el => el.parentElement.open);
        await summary.focus(); await page.keyboard.press('Enter');
        assert.equal(await summary.evaluate(el => el.parentElement.open),!initiallyOpen,`${slug}: keyboard disclosure toggles`);
        await page.keyboard.press('Enter');
        assert.equal(await summary.evaluate(el => el.parentElement.open),initiallyOpen,`${slug}: keyboard disclosure restores`);
      }
      await page.addScriptTag({path:path.join(root,'node_modules/axe-core/axe.js')});
      result.axe = await page.evaluate(async () => (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}})).violations.map(v => ({id:v.id,impact:v.impact,nodes:v.nodes.map(n => ({target:n.target,summary:n.failureSummary}))})));
      assert.equal(result.axe.length,0,`${slug}: accessibility ${JSON.stringify(result.axe)}`);
      await page.setViewport({width:320,height:1000});
      await page.evaluate(() => {
        const elements=[...document.querySelectorAll('h1,h2,h3,h4,p,li,dt,dd,a,summary,label,button,input')];
        const sizes=elements.map(el => parseFloat(getComputedStyle(el).fontSize));
        elements.forEach((el,i) => el.style.fontSize=`${sizes[i]*2}px`);
      });
      result.enlargedTextOverflow=await page.evaluate(() => document.documentElement.scrollWidth > innerWidth+1);
      assert(!result.enlargedTextOverflow,`${slug}: enlarged text overflow at 320`);
      await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
      await page.reload({waitUntil:'load'});
      result.reducedMotion=await page.evaluate(() => ({text:document.querySelector('main').innerText.length,animations:document.getAnimations().length}));
      assert(result.reducedMotion.text>300,`${slug}: reduced motion content`);
      await page.emulateMediaFeatures([]);
      await page.setJavaScriptEnabled(false);
      await page.reload({waitUntil:'load'});
      result.nojs=await page.evaluate(() => ({text:document.querySelector('main').innerText.length,overflow:document.documentElement.scrollWidth > innerWidth+1,hiddenMain:getComputedStyle(document.querySelector('main')).visibility==='hidden'}));
      assert(result.nojs.text>300 && !result.nojs.overflow && !result.nojs.hiddenMain,`${slug}: no-JS narrative`);
      await page.setJavaScriptEnabled(true);
      result.errors=[...new Set(errors)];
      assert.equal(result.errors.length,0,`${slug}: browser errors ${JSON.stringify(result.errors)}`);
      results.cases.push(result);
      fs.writeFileSync(path.join(output,'results.json'),JSON.stringify(results,null,2));
      console.log(`PASS ${slug}: 5 widths, links, images, labels, keyboard disclosure, accessibility, enlarged text, reduced motion, no JS`);
    }
    for (const surface of ['index','work']) {
      await page.goto(`${origin}/newsite/${surface}.html`,{waitUntil:'load'});
      const routes=await page.$$eval('a[href]',links => links.map(a => a.getAttribute('href')));
      for (const slug of slugs) {
        if (surface==='work') assert(routes.includes(slug+'.html'),`Work link missing: ${slug}`);
        assert(!routes.includes(`https://www.aaronbenjamin.design/${slug}.html`),`${surface}: legacy ${slug}`);
      }
      results.routes.push({surface,passed:true});
    }
    console.log('PASS Home/Work local case navigation');
  } catch (error) { results.failures.push(error.message); throw error; }
  finally {
    fs.writeFileSync(path.join(output,'results.json'),JSON.stringify(results,null,2));
    await browser.close();server.close();
  }
})().catch(error => {console.error(error);server.close();process.exitCode=1;});
