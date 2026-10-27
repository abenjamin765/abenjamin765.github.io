const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const express = require('express');
const puppeteer = require('puppeteer');
const {pages} = require('../lib/root-release');
const {portfolioSite, portfolioProjects} = require('../lib/portfolio-data')();
const dist = path.resolve(__dirname, '../dist');
const output = process.env.RELEASE_REVIEW_OUTPUT || path.join(require('node:os').tmpdir(), 'portfolio-root-release-review');
const routes = [...pages.map(p => p === 'index.html' ? '/' : '/' + p), '/resume.html', '/writing.html', '/blog/ai-is-exposing-ux-design/', '/404.html'];
const results = {routes:[], mobile:[], failures:[]};

(async () => {
  fs.mkdirSync(output, {recursive:true});
  const app = express();
  app.use(express.static(dist));
  app.use((req,res) => res.status(404).sendFile(path.join(dist,'404.html')));
  const server = await new Promise(resolve => {const s = app.listen(0,'127.0.0.1',() => resolve(s));});
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await puppeteer.launch({headless:true, args:process.env.GITHUB_ACTIONS === 'true' ? ['--no-sandbox'] : []});
  try {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    const errors = [];
    page.on('pageerror',e => errors.push(e.message));
    page.on('response',r => {if (r.status() >= 400 && !r.url().endsWith('/404.html')) errors.push(`${r.status()} ${r.url()}`);});
    await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
    for (const route of routes) {
      for (const width of [320,390,768,949,1440]) {
        await page.setViewport({width,height:900});
        const response = await page.goto(origin+route,{waitUntil:'load'});
        assert.equal(response.status(),200,route);
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth+1),`${route} overflow at ${width}`);
        assert.equal(await page.$$eval('h1',ns => ns.length),1,route);
        if (width === 390 && pages.some(p => route === '/' || route === '/'+p)) {
          await page.keyboard.press('Tab');
          assert.match(await page.evaluate(() => document.activeElement.getAttribute('href')), /^#(main|case-content)$/);
          const contact = await page.$eval('.portfolio-links a[href^="mailto:"]',n => ({y:n.getBoundingClientRect().bottom,display:getComputedStyle(n).display}));
          assert(contact.y <= 180 && contact.display !== 'none',`${route} contact in opening`);
          await page.focus('.portfolio-links a[href^="mailto:"]');
          assert.notEqual(await page.$eval('.portfolio-links a[href^="mailto:"]',n => getComputedStyle(n).outlineStyle),'none',`${route} focus visible`);
        }
        if (width === 390 || width === 1440) {
          await page.addScriptTag({path:require.resolve('axe-core')});
          const violations = await page.evaluate(async () => (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}})).violations.map(v => ({id:v.id,nodes:v.nodes.map(n => n.target)})));
          assert.deepEqual(violations,[],`${route} accessibility at ${width}`);
          if (['/','/work.html','/classroom-assignment-management.html','/indeed-job-refresh.html','/curbside-pickup.html'].includes(route)) {
            await page.screenshot({path:path.join(output,(route==='/'?'home':route.slice(1,-5))+'-'+width+'.png'),fullPage:true});
            await page.screenshot({path:path.join(output,(route==='/'?'home':route.slice(1,-5))+'-opening-'+width+'.png')});
          }
        }
      }
      await page.$$eval('img,iframe',ns => ns.forEach(n => n.loading='eager'));
      await page.waitForFunction(() => [...document.images].every(n => n.complete));
      assert.deepEqual(await page.$$eval('img',ns => ns.filter(n => !n.naturalWidth).map(n => n.src)),[],`${route} images`);
      const info = await page.evaluate(() => ({
        canonical:document.querySelector('[rel="canonical"]')?.href,
        og:document.querySelector('[property="og:url"]')?.content,
        share:document.querySelector('[property="og:image"]')?.content,
        twitter:document.querySelector('[name="twitter:image"]')?.content,
        ids:[...document.querySelectorAll('[id]')].map(n => n.id),
        labels:[...document.querySelectorAll('[aria-labelledby]')].flatMap(n => n.getAttribute('aria-labelledby').split(/\s+/).filter(id => !document.getElementById(id))),
        links:[...document.querySelectorAll('a[href],img[src],link[href],script[src],iframe[src],img[srcset]')].flatMap(n => n.hasAttribute('srcset') ? [n.src,...n.srcset.split(',').map(c => new URL(c.trim().split(/\s+/)[0],location.href).href)] : [n.href || n.src]).filter(Boolean),
        schema:[...document.querySelectorAll('[type="application/ld+json"]')].map(n => JSON.parse(n.textContent))
      }));
      assert.equal(info.canonical,portfolioSite.baseUrl+route,route);
      assert.equal(info.og,info.canonical); assert.equal(info.share,info.twitter);
      assert(fs.existsSync(path.join(dist,info.share.replace(portfolioSite.baseUrl,''))));
      assert(info.schema.length); assert.equal(new Set(info.ids).size,info.ids.length); assert.deepEqual(info.labels,[]);
      for (const link of info.links) {
        const url = new URL(link);
        if (![origin,portfolioSite.baseUrl].includes(url.origin)) continue;
        const file = path.join(dist,decodeURIComponent(url.pathname),url.pathname.endsWith('/')?'index.html':'');
        assert(fs.existsSync(file),`${route} destination ${url.pathname}`);
        if (url.hash && path.extname(file) === '.html') {
          assert(fs.readFileSync(file,'utf8').includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),`${route} anchor ${url.pathname}${url.hash}`);
        }
      }
      if (pages.includes(route.slice(1)) && !['/work.html'].includes(route)) {
        const summary = await page.$('details summary');
        if (summary) {
          const wasOpen = await summary.evaluate(n => n.parentElement.open);
          await summary.focus(); await page.keyboard.press('Enter');
          assert.equal(await summary.evaluate(n => n.parentElement.open), !wasOpen);
        }
        await page.setJavaScriptEnabled(false); await page.reload({waitUntil:'load'});
        assert(await page.$eval('main',n => n.innerText.length > 300),`${route} no-JS story`);
        await page.setJavaScriptEnabled(true);
      }
      if (route === '/' || pages.includes(route.slice(1))) {
        await page.setViewport({width:320,height:900});
        await page.reload({waitUntil:'load'});
        await page.evaluate(() => {
          const nodes = [...document.querySelectorAll('h1,h2,h3,h4,p,li,dt,dd,a,summary,label,button,input')];
          const sizes = nodes.map(n => parseFloat(getComputedStyle(n).fontSize));
          nodes.forEach((n,i) => n.style.fontSize = `${sizes[i]*2}px`);
        });
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth+1),`${route} 200% text at 320px`);
      }
      assert.deepEqual(errors,[],`${route} browser errors`);
      results.routes.push({route,status:'passed'});
      console.log(`PASS ${route}: routes, images, metadata, accessibility and responsive layout`);
    }
    const locs = [...fs.readFileSync(path.join(dist,'sitemap.xml'),'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
    assert.equal(new Set(locs).size,locs.length);
    for (const route of routes.filter(r => r !== '/404.html')) assert(locs.includes(portfolioSite.baseUrl+route));
    assert(!locs.some(url => url.includes('/newsite/') || url.includes('/research')));
    assert.match(fs.readFileSync(path.join(dist,'robots.txt'),'utf8'),/Sitemap: https:\/\/www.aaronbenjamin.design\/sitemap.xml/);
    for (const file of ['assets/Aaron-Benjamin-Resume.pdf','newsite/assets/Aaron-Benjamin-Resume.pdf']) assert.equal(fs.readFileSync(path.join(dist,file)).subarray(0,5).toString(),'%PDF-');
    function checkPrivate(dir) {
      for (const entry of fs.readdirSync(dir,{withFileTypes:true})) {
        const file = path.join(dir,entry.name);
        assert(!/\.md$|\.DS_Store$|upstream-snapshot|\/research(?:\/|$)/.test(file),`Private source in release: ${file}`);
        if (entry.isDirectory()) checkPrivate(file);
      }
    }
    checkPrivate(path.join(dist,'newsite'));
    for (const project of Object.values(portfolioProjects)) assert(fs.existsSync(path.join(dist,project.href)));
    for (const name of pages) {
      const html = fs.readFileSync(path.join(dist,'newsite',name),'utf8');
      assert(html.includes(`rel="canonical" href="${portfolioSite.baseUrl}${name==='index.html'?'/':'/'+name}"`));
    }
    // Cold mobile navigation under a constrained connection; record transfer bytes,
    // not a field-performance or Core Web Vitals claim.
    for (const route of ['/','/work.html']) {
      const mobile = await browser.newPage();
      await mobile.setViewport({width:390,height:844,deviceScaleFactor:2,isMobile:true,hasTouch:true});
      await mobile.setCacheEnabled(false);
      const client = await mobile.createCDPSession();
      await client.send('Network.enable');
      await client.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:200000,uploadThroughput:90000,connectionType:'cellular3g'});
      await mobile.goto(origin+route,{waitUntil:'networkidle0',timeout:90000});
      const measurement = await mobile.evaluate(() => ({route:location.pathname,bytes:performance.getEntriesByType('resource').reduce((s,r) => s+r.transferSize,0),brush:[...document.images].find(n => n.classList.contains('intro-brushstroke'))?.currentSrc,contactBottom:document.querySelector('.portfolio-links a[href^="mailto:"]').getBoundingClientRect().bottom}));
      assert(measurement.bytes < 2000000,`${route} mobile transfer budget: ${measurement.bytes}`);
      results.mobile.push(measurement);
      await mobile.close();
    }
    console.log(JSON.stringify(results.mobile,null,2));
  } catch (error) {results.failures.push(error.stack); throw error;}
  finally {fs.writeFileSync(path.join(output,'results.json'),JSON.stringify(results,null,2)); await browser.close(); await new Promise(resolve => server.close(resolve));}
})().catch(error => {console.error(error); process.exitCode=1;});
