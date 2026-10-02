const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const express = require("express");
const puppeteer = require("puppeteer");

async function main() {
  const dist = path.resolve(__dirname, "..", "dist");
  const externalOrigin = process.env.PORTFOLIO_TEST_ORIGIN;
  let server;
  if (!externalOrigin) {
    const app = express();
    app.use(express.static(dist));
    server = await new Promise((resolve) => {
      const listening = app.listen(0, "127.0.0.1", () => resolve(listening));
    });
  }

  try {
    const browser = await puppeteer.launch({ headless: true });
    try {
      const page = await browser.newPage();
      const origin = externalOrigin || `http://127.0.0.1:${server.address().port}`;
      const routes = [
        "/",
        "/classroom-assignment-management.html",
        "/green-loom.html",
        "/indeed-job-refresh.html",
        "/home-depot-design-leadership.html",
        "/design-dash.html",
        "/many-hats.html",
        "/a-to-z-first-claim.html",
        "/curbside-pickup.html",
        "/price-adjustments.html",
        "/resume.html",
        "/writing.html",
      ];
      const widths = [320, 390, 768, 1440];

      for (const route of routes) {
        for (const width of widths) {
          await page.setViewport({ width, height: 900 });
          await page.goto(origin + route, { waitUntil: "domcontentloaded", timeout: 60000 });
          const layout = await page.evaluate(() => ({
            viewport: window.innerWidth,
            document: document.documentElement.scrollWidth,
            body: document.body.scrollWidth,
          }));
          assert.ok(layout.document <= layout.viewport + 1, `${route} overflows at ${width}px: ${JSON.stringify(layout)}`);
          assert.ok(layout.body <= layout.viewport + 1, `${route} body overflows at ${width}px: ${JSON.stringify(layout)}`);
        }
        if (route === '/') {
          for (const width of [320, 390, 768, 1061, 1440]) {
            await page.setViewport({width, height: 900});
            await page.waitForFunction(() => document.querySelector('.folio-hero__statement').style.fontSize);
            await new Promise(resolve => setTimeout(resolve, 100));
            const fits = await page.evaluate(() => {
              const line = document.querySelector('.folio-hero__statement');
              const words = [...line.querySelectorAll('.folio-hero__word')];
              const original = words.findIndex(word => word.classList.contains('is-current'));
              const failed = [];
              words.forEach((word, index) => {
                words.forEach((other, i) => other.classList.toggle('is-current', i === index));
                if (line.scrollWidth > line.clientWidth + 1) failed.push(word.textContent);
              });
              words.forEach((word, i) => word.classList.toggle('is-current', i === original));
              return failed;
            });
            assert.deepEqual(fits, [], `Hero adjectives fit one line at ${width}px`);
          }
          assert.equal(await page.$eval('#tools-title', n => n.textContent.trim()), 'Tools developed through my work');
        }
        console.log(`Responsive widths passed: ${route}`);
        // Lazy images can have valid-looking paths and still fail to load.
        await page.$$eval("img", (images) => images.forEach((image) => { image.loading = "eager"; }));
        await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete), { timeout: 15000 });
        const brokenImages = await page.$$eval("img", (images) => images.filter((image) => !image.naturalWidth).map((image) => image.getAttribute("src")));
        assert.deepEqual(brokenImages, [], `${route} has broken images`);
        assert.equal(await page.$$eval("h1", (nodes) => nodes.length), 1, `${route} should have one page heading`);
      }

      await page.setViewport({ width: 390, height: 900 });
      for (const route of routes) {
        await page.goto(origin + route, { waitUntil: "domcontentloaded", timeout: 60000 });
        await page.evaluate(() => {
          // Capture first so inherited sizes are not enlarged more than once.
          const sizes = Array.from(document.querySelectorAll("body *"), (node) => [node, parseFloat(getComputedStyle(node).fontSize)]);
          sizes.forEach(([node, size]) => { node.style.fontSize = `${size * 2}px`; });
        });
        const documentWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        assert.ok(documentWidth <= 391, `${route} overflows with 200% text: ${documentWidth}px`);
      }
      console.log("Enlarged-text layouts passed");

      for (const route of routes) {
        await page.goto(origin + route, { waitUntil: "domcontentloaded", timeout: 60000 });
        const links = await page.$$eval("a[href]", (anchors) => anchors.map((anchor) => anchor.getAttribute("href")));
        for (const href of links) {
          if (!href || href.startsWith("mailto:") || href.startsWith("tel:") || /^https?:\/\//.test(href)) continue;
          const target = new URL(href, origin + route);
          if (target.origin !== origin) continue;
          const targetPath = decodeURIComponent(target.pathname);
          const diskPath = path.join(dist, targetPath === "/" ? "index.html" : targetPath);
          const resolved = fs.existsSync(diskPath) && fs.statSync(diskPath).isDirectory() ? path.join(diskPath, "index.html") : diskPath;
          assert.ok(fs.existsSync(resolved), `${route} has a missing destination: ${href}`);
          if (target.hash && target.pathname === route) {
            const id = decodeURIComponent(target.hash.slice(1));
            const exists = await page.evaluate((value) => Boolean(document.getElementById(value)), id);
            assert.ok(exists, `${route} has a missing anchor: ${href}`);
          }
        }
      }
      assert.ok(fs.existsSync(path.join(dist, "assets", "Aaron-Benjamin-Resume.pdf")), "Résumé PDF missing");
      for (const privateFile of ["resume-builder.html", "assets/js/resume-builder.js", "assets/data/career.json", "assets/data/resume-profiles.json"]) {
        assert.ok(!fs.existsSync(path.join(dist, privateFile)), `Private résumé builder output must not be published: dist/${privateFile}`);
      }
      console.log("Published links and PDF passed");

      await page.goto(origin + "/resume.html", { waitUntil: "domcontentloaded", timeout: 60000 });
      const resumeRoles = await page.$$eval(".work-experience-milestone", (entries) => entries.map((entry) => ({
        title: entry.querySelector("h3")?.textContent.trim() || "",
        dates: entry.querySelector(".work-experience-date-range")?.textContent.trim() || "",
      })));
      assert.equal(resumeRoles.filter((role) => role.title.includes("Amazon")).length, 1, "Résumé should list one Amazon role");
      assert.ok(resumeRoles.findIndex((role) => role.title.includes("The Home Depot")) < resumeRoles.findIndex((role) => role.title.includes("Snap! Mobile")));
      assert.ok(resumeRoles.findIndex((role) => role.title.includes("Snap! Mobile")) < resumeRoles.findIndex((role) => role.title.includes("Amazon")));
      assert.ok(resumeRoles.some((role) => role.title.includes("The Home Depot") && role.dates.includes("October 2018 - February 2022")));
      console.log("Résumé chronology passed");

      await page.goto(origin + "/green-loom.html", { waitUntil: "domcontentloaded", timeout: 60000 });
      assert.equal(await page.$$eval("h1", (nodes) => nodes.length), 1, "Green Loom should have one page heading");
      assert.equal(await page.$$eval(".green-case__hero-media figcaption", (nodes) => nodes.length), 0, "Green Loom hero should not have a caption");
      assert.equal(await page.$eval(".folio-hdr__name--project", (node) => node.textContent.trim()), "Green Loom");
      for (const image of ["green-loom--figma-hero-2x.png", "green-loom--mobile-catalog-2x.png"]) {
        assert.ok(fs.existsSync(path.join(dist, "assets", "img", "folio", "project--green-loom", image)), `Green Loom Figma image missing: ${image}`);
      }
      assert.ok((await page.$eval(".green-case__hero-media img", (node) => node.getAttribute("src"))).includes("green-loom--work-card-2x.png"), "Green Loom should use the existing catalog crop");
      console.log("Green Loom case-study structure passed");

      await page.goto(origin + "/design-dash.html", { waitUntil: "domcontentloaded", timeout: 60000 });
      assert.equal(await page.$$eval("h1", (nodes) => nodes.length), 1, "Design Dash should have one page heading");
      assert.equal(await page.$eval(".folio-hdr__name--project", (node) => node.textContent.trim()), "Design Dash");
      assert.equal(await page.$eval(".folio-hdr__name--project", (node) => node.getAttribute("href")), "/#design-dash");
      assert.ok(await page.$(".folio-case__hero-media figure figcaption"), "Design Dash hero should be a labeled, text-native diagram");
      console.log("Design Dash case-study structure passed");

      await page.goto(origin + "/many-hats.html", { waitUntil: "domcontentloaded", timeout: 60000 });
      assert.equal(await page.$$eval("h1", (nodes) => nodes.length), 1, "Many Hats should have one page heading");
      assert.equal(await page.$eval(".folio-hdr__name--project", (node) => node.textContent.trim()), "Many Hats");
      assert.equal(await page.$eval(".folio-hdr__name--project", (node) => node.getAttribute("href")), "/#many-hats");
      assert.ok(await page.$(".folio-case__hero-media figure figcaption"), "Many Hats hero should be a labeled, text-native diagram");
      const homepage = await browser.newPage();
      await homepage.goto(origin + "/", { waitUntil: "domcontentloaded", timeout: 60000 });
      assert.deepEqual(await homepage.$$eval(".folio-nav a", (nodes) => nodes.map((node) => node.textContent.trim())), ["Resume"], "Header should have only the Resume CTA");
      assert.equal(await homepage.$eval(".folio-nav__cta", (node) => node.getAttribute("href")), "/resume.html");
      assert.equal(await homepage.$(".folio-hero__cta"), null, "Hero CTA removed per review");
      for (const width of [320, 390, 768, 927, 1440]) {
        await homepage.setViewport({ width, height: 929 });
        const alignment = await homepage.evaluate(() => {
          const rect = (selector) => document.querySelector(selector).getBoundingClientRect();
          const copy = document.querySelector(".folio-project--feature .folio-project__copy");
          return {
            heroGap: rect(".folio-hero").bottom - rect(".folio-hero__media img").bottom,
            footerGap: rect(".folio-footer--portrait").bottom - rect(".folio-footer__portrait").bottom,
            copyLayout: getComputedStyle(copy).display,
            titleBottom: copy.querySelector("h3").getBoundingClientRect().bottom,
            dekTop: copy.querySelector(".folio-project__dek").getBoundingClientRect().top,
          };
        });
        assert.ok(Math.abs(alignment.heroGap) <= 1, `Hero artwork should be flush at ${width}px: ${alignment.heroGap}px`);
        assert.ok(Math.abs(alignment.footerGap) <= 1, `Footer artwork should be flush at ${width}px: ${alignment.footerGap}px`);
        assert.equal(alignment.copyLayout, "flex", "Featured project copy should use one reading column");
        assert.ok(alignment.dekTop >= alignment.titleBottom, "Project description should follow the title vertically");
      }
      console.log("Homepage CTA, reading order, and illustration alignment passed");
      assert.equal(await homepage.$eval("#design-dash", (node) => node.tagName), "ARTICLE");
      assert.equal(await homepage.$eval("#many-hats", (node) => node.tagName), "ARTICLE");
      assert.equal(await homepage.$eval("#a-to-z-first-claim", (node) => node.tagName), "ARTICLE");
      assert.equal(await homepage.$eval("#curbside-pickup", (node) => node.tagName), "ARTICLE");
      assert.equal(await homepage.$eval("#price-adjustments", (node) => node.tagName), "ARTICLE");
      await homepage.close();
      console.log("Many Hats case-study structure passed");

      for (const retail of [
        {
          route: "/a-to-z-first-claim.html",
          title: "A-to-z First Claim",
          back: "/#a-to-z-first-claim",
          hero: "a-to-z-first-claim--hero-2x.jpg",
          assets: ["a-to-z-first-claim--hero-2x.jpg", "a-to-z-first-claim--work-card-2x.png", "a-to-z-first-claim--email-2x.png"],
          folder: "project--a-to-z-first-claim",
        },
        {
          route: "/curbside-pickup.html",
          title: "Curbside Pickup",
          back: "/#curbside-pickup",
          hero: "curbside-pickup--email-complete-2x.png",
          assets: ["curbside-pickup--email-complete-2x.png", "curbside-pickup--work-card-2x.png", "curbside-pickup--checkin-complete-2x.png"],
          folder: "project--curbside-pickup",
        },
        {
          route: "/price-adjustments.html",
          title: "Price Adjustments",
          back: "/#price-adjustments",
          hero: "price-adjustments--cart-2x.png",
          assets: ["price-adjustments--cart-2x.png", "price-adjustments--update-complete-2x.png"],
          folder: "project--price-adjustments",
        },
      ]) {
        await page.goto(origin + retail.route, { waitUntil: "domcontentloaded", timeout: 60000 });
        assert.equal(await page.$$eval("h1", (nodes) => nodes.length), 1, `${retail.route} should have one page heading`);
        assert.equal(await page.$eval(".folio-hdr__name--project", (node) => node.textContent.trim()), retail.title);
        assert.equal(await page.$eval(".folio-hdr__name--project", (node) => node.getAttribute("href")), retail.back);
        assert.ok((await page.$eval(".folio-case__hero-media img", (node) => node.getAttribute("src"))).includes(retail.hero), `${retail.route} hero path`);
        assert.equal(await page.$$eval(".folio-case__outcome", (nodes) => nodes.length), 1, `${retail.route} should have an outcome block`);
        if (retail.route === "/curbside-pickup.html") {
          const body = await page.$eval("main", (node) => node.textContent);
          assert.ok(!body.includes("**%"), "Curbside must not show redacted percentage placeholders");
        }
        if (retail.route === "/price-adjustments.html") {
          const body = await page.$eval("main", (node) => node.textContent);
          assert.ok(body.includes("directional"), "Price adjustments must keep directional-only impact language");
        }
        for (const image of retail.assets) {
          assert.ok(fs.existsSync(path.join(dist, "assets", "img", "folio", retail.folder, image)), `${retail.folder}/${image} missing`);
        }
        console.log(`Retail case structure passed: ${retail.route}`);
      }

      await page.goto(origin + "/classroom-assignment-management.html", { waitUntil: "domcontentloaded", timeout: 60000 });
      assert.equal(await page.$eval(".folio-hdr__name--project", (node) => node.textContent.trim()), "Classroom Assignment Management");
      assert.equal(await page.$eval(".folio-hdr__name--project", (node) => node.getAttribute("href")), "/#work");
      const caseRoutes = routes.filter(route => !['/', '/resume.html', '/writing.html'].includes(route));
      for (const route of caseRoutes) {
        await page.goto(origin + route, {waitUntil: 'domcontentloaded'});
        const labels = await page.$$eval('.folio-case__section .folio-eyebrow, .folio-case__outcome .folio-eyebrow', nodes => nodes.map(node => node.textContent.trim().split(' — ')[0]));
        assert.deepEqual(labels.filter((label, i) => label !== labels[i - 1]), ['I', 'D', 'E', 'A', 'S'], `${route}: IDEAS order`);
        if (route === '/classroom-assignment-management.html') {
          assert.ok(await page.$('.folio-case__context-visual img'), 'Classroom context visual is present');
          assert.ok(await page.$('.assignment-comparison'), 'Classroom comparison is present');
          assert.equal(await page.$('.folio-image-brief'), null, 'Completed classroom story has no production placeholders');
        } else if (route === '/indeed-job-refresh.html') {
          for (const selector of ['.folio-case__hero-media img', '.indeed-freeware img', '.indeed-journey img']) {
            assert.ok(await page.$(selector), `Indeed visual missing: ${selector}`);
          }
          assert.equal(await page.$('.folio-image-brief'), null, 'Indeed supplied visuals replace production placeholders');
        } else {
          assert.ok(await page.$('.folio-image-brief'), `${route}: missing art direction`);
        }
      }
      await page.goto(origin + '/', {waitUntil: 'domcontentloaded'});
      assert.deepEqual(await page.$$eval('#work .folio-project', nodes => nodes.map(n => n.id)), ['classroom', 'indeed-job-refresh', 'curbside-pickup']);
      const heroWords = await page.$$eval('.folio-hero__word', nodes => nodes.map(n => n.textContent.trim()));
      assert.equal(heroWords.length, 39);
      assert.equal(heroWords[0], 'glorious');
      assert.equal(heroWords.at(-1), 'extra');
      await page.emulateMediaFeatures([{name: 'prefers-reduced-motion', value: 'no-preference'}]);
      const first = await page.$eval('.folio-hero__word.is-current', n => n.textContent);
      await page.waitForFunction(value => document.querySelector('.folio-hero__word.is-current').textContent !== value, {}, first);
      await page.click('.folio-motion-toggle');
      const held = await page.$eval('.folio-hero__word.is-current', n => n.textContent);
      await new Promise(resolve => setTimeout(resolve, 2400));
      assert.equal(await page.$eval('.folio-hero__word.is-current', n => n.textContent), held, 'Pause holds the current adjective');
      assert.equal(await page.$eval('.folio-motion-toggle', n => n.getAttribute('aria-pressed')), 'true');
      await page.emulateMediaFeatures([{name: 'prefers-reduced-motion', value: 'reduce'}]);
      await page.waitForFunction(() => document.querySelector('.folio-hero__word.is-current').textContent === 'glorious' && document.querySelector('.folio-motion-toggle').hidden);
      assert.equal(await page.$eval('.folio-hero__word.is-current', n => n.textContent), 'glorious');
      assert.equal(await page.$eval('.folio-motion-toggle', n => n.hidden), true);
      await page.emulateMediaFeatures([{name: 'prefers-reduced-motion', value: 'no-preference'}]);
      await page.keyboard.press('Tab');
      await page.goto(origin + '/classroom-assignment-management.html', {waitUntil: 'domcontentloaded'});
      console.log('IDEAS sequence, story selection, rotation, pause, and reduced motion passed');
      assert.equal(await page.$eval('#comparison-before', n => n.hidden), false);
      assert.equal(await page.$eval('#comparison-after', n => n.hidden), true);
      await page.focus('#comparison-before-tab');
      await page.keyboard.press('ArrowRight');
      assert.equal(await page.$eval('#comparison-after-tab', n => n.getAttribute('aria-selected')), 'true');
      assert.equal(await page.$eval('#comparison-before', n => n.hidden), true);
      await page.keyboard.press('Home');
      assert.equal(await page.$eval('#comparison-before', n => n.hidden), false);
      await page.click('#comparison-after-tab');
      const assignments = ".folio-demo__assignment";
      assert.equal(await page.$$eval(`${assignments}[open]`, (nodes) => nodes.length), 1);
      assert.equal(await page.$eval(".folio-demo__table th[aria-sort='ascending']", (node) => node.textContent.trim()), "Status");
      await page.click(`${assignments}:nth-of-type(2) > summary`);
      await new Promise((resolve) => setTimeout(resolve, 450));
      assert.equal(await page.$$eval(`${assignments}[open]`, (nodes) => nodes.length), 1, "Only one assignment should remain open");
      await page.click(`${assignments}[open] > summary`);
      await new Promise((resolve) => setTimeout(resolve, 450));
      assert.equal(await page.$$eval(`${assignments}[open]`, (nodes) => nodes.length), 0, "Assignment should close");
      await page.click(".folio-demo__group:nth-of-type(3) > summary");
      await new Promise((resolve) => setTimeout(resolve, 450));
      assert.equal(await page.$eval(".folio-demo__group:nth-of-type(3)", (node) => node.open), true, "Due soon should expand");
      await page.click(".folio-demo__group:nth-of-type(3) > summary");
      await new Promise((resolve) => setTimeout(resolve, 450));
      assert.equal(await page.$eval(".folio-demo__group:nth-of-type(3)", (node) => node.open), false, "Due soon should close");
      await page.click(".folio-demo__assignment-summary");
      await new Promise((resolve) => setTimeout(resolve, 350));
      await page.click(".folio-demo__assignment[open] [data-sort-key='student']");
      assert.equal(await page.$eval(".folio-demo__assignment[open] th[aria-sort='ascending']", (node) => node.textContent.trim()), "Student");
      const openedSummary = await page.$(".folio-demo__assignment[open] > summary");
      await openedSummary.focus();
      await page.keyboard.press("Enter");
      await new Promise((resolve) => setTimeout(resolve, 350));
      assert.equal(await page.$$eval(`${assignments}[open]`, (nodes) => nodes.length), 0, "Enter should close the focused assignment");

      const noScriptPage = await browser.newPage();
      await noScriptPage.setJavaScriptEnabled(false);
      await noScriptPage.goto(origin + "/classroom-assignment-management.html", { waitUntil: "domcontentloaded" });
      await noScriptPage.click(".folio-demo__assignment-summary");
      assert.equal(await noScriptPage.$$eval(`${assignments}[open]`, (nodes) => nodes.length), 2, "Native details should still work without JavaScript");
      await noScriptPage.close();
      console.log("Case-study disclosure interactions passed");
    } finally {
      await browser.close();
    }
  } finally {
    if (server) await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
