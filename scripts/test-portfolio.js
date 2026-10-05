const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const express = require("express");
const puppeteer = require("puppeteer");

async function main() {
  const dist = path.resolve(__dirname, "..", "dist");
  // Publishing safeguards apply to the output, including responsive candidates.
  const filesUnder = directory => fs.readdirSync(directory, {withFileTypes:true}).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(file) : [file];
  });
  for (const file of filesUnder(path.join(dist, 'assets/img'))) {
    assert.ok(!/\.(json|txt|log)$|\.DS_Store$/i.test(file), `Source sidecar must not be published: ${file}`);
  }
  for (const file of filesUnder(dist).filter(file => file.endsWith('.html'))) {
    for (const match of fs.readFileSync(file, 'utf8').matchAll(/srcset="([^"]+)"/g)) {
      for (const candidate of match[1].split(',')) {
        const url = candidate.trim().split(/\s+/)[0];
        if (url.startsWith('/assets/')) assert.ok(fs.existsSync(path.join(dist, url)), `Missing responsive image: ${url}`);
      }
    }
  }

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
    const browser = await puppeteer.launch({headless:true,browser:process.env.PORTFOLIO_TEST_BROWSER || 'chrome'});
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
          await page.goto(origin + route, { waitUntil: "load", timeout: 60000 });
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
            assert.ok(await page.$eval('.folio-hero__statement', n => parseFloat(getComputedStyle(n).fontSize) >= 24), 'Hero keeps readable type');
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
            assert.deepEqual(fits, [], `Hero adjectives wrap without overflow at ${width}px`);
          }
          assert.equal(await page.$eval('#tools-title', n => n.textContent.trim()), 'Design practice');
        }
        console.log(`Responsive widths passed: ${route}`);
        // Lazy images can have valid-looking paths and still fail to load.
        await page.$$eval("img", (images) => images.forEach((image) => { image.loading = "eager"; }));
        await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete), { timeout: 15000 });
        const brokenImages = await page.$$eval("img", (images) => images.filter((image) => !image.naturalWidth).map((image) => image.getAttribute("src")));
        assert.deepEqual(brokenImages, [], `${route} has broken images`);
        assert.equal(await page.$$eval("h1", (nodes) => nodes.length), 1, `${route} should have one page heading`);
      }

      // Markdown demo: drafts must not change the order until applied.
      await page.goto(origin + '/price-adjustments.html', {waitUntil: 'load'});
      const openDemo = async () => {await page.click('[data-item=bulb] .markdown-demo__more'); await page.click('[data-item=bulb] .markdown-demo__open');};
      const demoValue = selector => page.$eval(selector, node => node.textContent.trim());
      const setDemo = (selector, value) => page.$eval(selector, (node, value) => {
        node.value = value;
        node.dispatchEvent(new Event('input', {bubbles: true}));
      }, value);
      const baseHeight = await page.$eval('.markdown-demo__app', n => n.getBoundingClientRect().height);
      await openDemo();
      assert.equal(await page.$eval('.markdown-demo__app', n => n.getBoundingClientRect().height), baseHeight, 'Opening the overlay must not expand the cart');
      assert.equal(await page.$$eval('.markdown-demo__select svg', n => n.length), 2, 'Both selects use Lucide chevrons');
      assert.equal(await demoValue('#markdown-summary-total'), '$889.00');
      await page.click('.markdown-demo__apply');
      assert.equal(await demoValue('#markdown-summary-discount'), '($15.00)');
      assert.equal(await demoValue('#markdown-summary-total'), '$874.00');
      await openDemo();
      await page.select('#markdown-type', 'percent');
      await setDemo('#markdown-value', '20');
      await setDemo('#markdown-quantity', '2');
      assert.equal(await demoValue('#markdown-summary-total'), '$874.00');
      await page.click('.markdown-demo__apply');
      assert.equal(await demoValue('#markdown-summary-total'), '$869.00');
      await openDemo();
      await setDemo('#markdown-value', '100');
      assert.equal(await page.$eval('.markdown-demo__apply', n => n.disabled), true);
      assert.match(await demoValue('#markdown-error'), /manager approval/);
      await page.keyboard.press('Escape');
      assert.equal(await page.$eval('#markdown-editor', n => n.hidden), true);
      assert.equal(await page.$eval('[data-item=bulb] .markdown-demo__more', n => n === document.activeElement), true);
      assert.equal(await demoValue('#markdown-summary-total'), '$869.00');
      await page.click('[data-item=bulb] .markdown-demo__more');
      await page.click('[data-item=bulb] .markdown-demo__remove');
      assert.equal(await demoValue('#markdown-summary-total'), '$889.00');
      await openDemo();
      await page.select('#markdown-type', 'price');
      await setDemo('#markdown-value', '45');
      await setDemo('#markdown-quantity', '7');
      assert.equal(await page.$eval('.markdown-demo__apply', n => n.disabled), true);
      await setDemo('#markdown-quantity', '3');
      await page.click('.markdown-demo__apply');
      assert.equal(await demoValue('#markdown-summary-total'), '$874.00');
      await openDemo();
      await setDemo('#markdown-value', '49');
      await page.click('.markdown-demo__cancel');
      assert.equal(await demoValue('#markdown-summary-total'), '$874.00');
      await page.click('.markdown-demo__reset');
      assert.equal(await demoValue('#markdown-summary-total'), '$889.00');
      await page.click('.markdown-demo__quantity [data-step="1"]');
      assert.equal(await demoValue('#markdown-summary-subtotal'), '$1,189.00');
      assert.equal(await demoValue('#markdown-summary-total'), '$1,189.00');
      await page.click('.markdown-demo__reset');
      assert.equal(await demoValue('#markdown-summary-subtotal'), '$889.00');
      await page.click('[data-item=bulb] .markdown-demo__more');
      await page.keyboard.press('Escape');
      assert.equal(await page.$eval('#markdown-item-menu', n => n.hidden), true);
      assert.equal(await page.$eval('[data-item=bulb] .markdown-demo__more', n => n === document.activeElement), true);
      for (const width of widths) {
        await page.setViewport({width, height: 900});
        await openDemo();
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Open markdown editor overflows at ${width}px`);
        await page.click('.markdown-demo__cancel');
      }
      await page.click('[data-item=thermostat] .markdown-demo__more');
      await page.click('[data-item=thermostat] .markdown-demo__open');
      await page.click('.markdown-demo__apply');
      assert.equal(await demoValue('#markdown-summary-total'), '$884.00');
      await openDemo();
      await page.click('.markdown-demo__apply');
      assert.equal(await demoValue('#markdown-summary-discount'), '($20.00)');
      assert.equal(await demoValue('#markdown-summary-total'), '$869.00');
      await page.click('[data-item=thermostat] .markdown-demo__more');
      await page.click('[data-item=thermostat] .markdown-demo__remove');
      assert.equal(await demoValue('#markdown-summary-total'), '$874.00');
      await page.click('.markdown-demo__reset');
      assert.equal(await demoValue('#markdown-summary-tax'), '$62.23');
      assert.equal(await demoValue('#markdown-order-total'), '$951.23');
      await openDemo();
      await page.click('.markdown-demo__apply');
      assert.equal(await demoValue('#markdown-summary-tax'), '$61.18');
      assert.equal(await demoValue('#markdown-order-total'), '$935.18');
      await page.click('.markdown-demo__quote');
      assert.match(await demoValue('.markdown-demo__status'), /Demo quote saved.*935.18/);
      await page.click('.markdown-demo__place');
      assert.match(await demoValue('.markdown-demo__status'), /Demo order placed.*935.18/);
      await page.click('.markdown-demo__cancel-order');
      assert.equal(await demoValue('#markdown-order-total'), '$951.23');
      assert.equal(await demoValue('#markdown-summary-discount'), '($0.00)');
      console.log('Markdown calculations, per-item menus, independent discounts, cancellation, approval limit, quantities, reset, and open layouts passed');

      await page.setViewport({ width: 390, height: 900 });
      for (const route of routes) {
        await page.goto(origin + route, { waitUntil: "load", timeout: 60000 });
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
        await page.goto(origin + route, { waitUntil: "load", timeout: 60000 });
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

      await page.goto(origin + "/resume.html", { waitUntil: "load", timeout: 60000 });
      const resumeRoles = await page.$$eval(".work-experience-milestone", (entries) => entries.map((entry) => ({
        title: entry.querySelector("h3")?.textContent.trim() || "",
        dates: entry.querySelector(".work-experience-date-range")?.textContent.trim() || "",
      })));
      assert.equal(resumeRoles.filter((role) => role.title.includes("Amazon")).length, 1, "Résumé should list one Amazon role");
      assert.ok(resumeRoles.findIndex((role) => role.title.includes("The Home Depot")) < resumeRoles.findIndex((role) => role.title.includes("Snap! Mobile")));
      assert.ok(resumeRoles.findIndex((role) => role.title.includes("Snap! Mobile")) < resumeRoles.findIndex((role) => role.title.includes("Amazon")));
      assert.ok(resumeRoles.some((role) => role.title.includes("The Home Depot") && role.dates.includes("October 2018 - February 2022")));
      console.log("Résumé chronology passed");

      await page.goto(origin + "/green-loom.html", { waitUntil: "load", timeout: 60000 });
      assert.equal(await page.$$eval("h1", (nodes) => nodes.length), 1, "Green Loom should have one page heading");
      assert.equal(await page.$(".green-case__hero-media figcaption"), null, "Green Loom hero has no disclaimer caption");
      assert.equal(await page.$eval(".folio-hdr__name--project", (node) => node.textContent.trim()), "Green Loom");
      for (const image of ["green-loom--figma-hero-2x.png", "green-loom--mobile-catalog-2x.png"]) {
        assert.ok(fs.existsSync(path.join(dist, "assets", "img", "folio", "project--green-loom", image)), `Green Loom Figma image missing: ${image}`);
      }
      assert.ok((await page.$eval(".green-case__hero-media img", (node) => node.getAttribute("src"))).includes("hero-green-loom.png"), "Green Loom should use the supplied hero");
      console.log("Green Loom case-study structure passed");

      await page.goto(origin + "/design-dash.html", { waitUntil: "load", timeout: 60000 });
      assert.equal(await page.$$eval("h1", (nodes) => nodes.length), 1, "Design Dash should have one page heading");
      assert.equal(await page.$eval(".folio-hdr__name--project", (node) => node.textContent.trim()), "The Design Dash");
      assert.equal(await page.$eval(".folio-hdr__name--project", (node) => node.getAttribute("href")), "/#design-dash");
      assert.ok(await page.$(".folio-case__hero-media img"), "Design Dash should have a project hero image");
      console.log("Design Dash case-study structure passed");

      await page.goto(origin + "/many-hats.html", { waitUntil: "load", timeout: 60000 });
      assert.equal(await page.$$eval("h1", (nodes) => nodes.length), 1, "Many Hats should have one page heading");
      assert.equal(await page.$eval(".folio-hdr__name--project", (node) => node.textContent.trim()), "Many Hats");
      assert.equal(await page.$eval(".folio-hdr__name--project", (node) => node.getAttribute("href")), "/#many-hats");
      assert.ok(await page.$(".folio-case__hero-media .folio-story-flow__title"), "Many Hats hero should be a named, text-native diagram");
      const homepage = await browser.newPage();
      await homepage.goto(origin + "/", { waitUntil: "load", timeout: 60000 });
      assert.deepEqual(await homepage.$$eval(".folio-nav a", (nodes) => nodes.map((node) => node.textContent.trim())), ["Resume"], "Homepage header contains only the Resume action");
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
          title: "Amazon A-to-z: First Claim",
          back: "/#a-to-z-first-claim",
          hero: "a-to-z-first-claim--hero-2x.jpg",
          assets: ["a-to-z-first-claim--hero-2x.jpg", "a-to-z-first-claim--work-card-2x.png", "a-to-z-first-claim--email-2x.png"],
          folder: "project--a-to-z-first-claim",
        },
        {
          route: "/curbside-pickup.html",
          title: "Curbside Pickup",
          back: "/#curbside-pickup",
          hero: "hero-curbside.png",
          assets: ["hero-curbside.png", "pickup-email-explained.png", "app-pickup-notifications.jpg"],
          folder: "project--curbside-pickup",
        },
        {
          route: "/price-adjustments.html",
          title: "Price Adjustments",
          back: "/#price-adjustments",
          hero: "hero-price-adjustments.png",
          assets: ["hero-price-adjustments.png", "price-adjustments--cart-2x.png", "price-adjustments--update-complete-2x.png"],
          folder: "project--price-adjustments",
        },
      ]) {
        await page.goto(origin + retail.route, { waitUntil: "load", timeout: 60000 });
        assert.equal(await page.$$eval("h1", (nodes) => nodes.length), 1, `${retail.route} should have one page heading`);
        assert.equal(await page.$eval(".folio-hdr__name--project", (node) => node.textContent.trim()), retail.title);
        assert.equal(await page.$eval(".folio-hdr__name--project", (node) => node.getAttribute("href")), retail.back);
        if (retail.route === "/a-to-z-first-claim.html") {
          assert.ok(await page.$(".email-excerpt"), "Amazon opens with a readable email reconstruction");
          assert.match(await page.$eval(".email-excerpt", n => n.textContent), /under \$50/);
        } else {
          assert.ok((await page.$eval(".folio-case__hero-media img", (node) => node.getAttribute("src"))).includes(retail.hero), `${retail.route} hero path`);
        }
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

      await page.goto(origin + "/classroom-assignment-management.html", { waitUntil: "load", timeout: 60000 });
      assert.equal(await page.$eval(".folio-hdr__name--project", (node) => node.textContent.trim()), "Classroom Assignment Management");
      assert.equal(await page.$eval(".folio-hdr__name--project", (node) => node.getAttribute("href")), "/#classroom");
      const caseRoutes = routes.filter(route => !['/', '/resume.html', '/writing.html'].includes(route));
      for (const route of caseRoutes) {
        await page.goto(origin + route, {waitUntil: 'load'});
        const labels = await page.$$eval('.folio-case__section .folio-eyebrow, .folio-case__outcome .folio-eyebrow', nodes => nodes.map(node => node.textContent.trim().split(' — ')[0]));
        const storyLabels = labels.filter(label => /^[IDEAS]$/.test(label));
        assert.deepEqual(storyLabels.filter((label, i) => label !== storyLabels[i - 1]), ['I', 'D', 'E', 'A', 'S'], `${route}: IDEAS order`);
        if (route === '/classroom-assignment-management.html') {
          assert.ok(await page.$('.folio-case__context-visual img'), 'Classroom context visual is present');
          assert.ok(await page.$('.assignment-comparison'), 'Classroom comparison is present');
          assert.equal(await page.$('.folio-image-brief'), null, 'Completed classroom story has no production placeholders');
        } else if (route === '/indeed-job-refresh.html') {
          for (const selector of ['.folio-case__hero-media img', '#indeed-freeware img', '.indeed-journey img']) {
            assert.ok(await page.$(selector), `Indeed visual missing: ${selector}`);
          }
          assert.equal(await page.$('.folio-image-brief'), null, 'Indeed supplied visuals replace production placeholders');
        } else if (route === '/curbside-pickup.html') {
          for (const selector of ['#curbside-two-sides img', '.curbside-decision', '#curbside-email-board img', '#curbside-app-notifications img']) {
            assert.ok(await page.$(selector), `Curbside visual missing: ${selector}`);
          }
          assert.equal(await page.$('.folio-image-brief'), null, 'Completed Curbside story has no production placeholders');
        } else if (route === '/price-adjustments.html') {
          for (const selector of ['#price-markdown-workaround img', '#price-markdown-iterations .folio-story-compare', '.case-close']) {
            assert.ok(await page.$(selector), `Price Adjustments artifact missing: ${selector}`);
          }
          assert.equal(await page.$('.folio-image-brief'), null, 'Completed Price Adjustments story has no production placeholders');
        } else if (route === '/green-loom.html') {
          for (const selector of ['.green-case__hero-media img', '#green-catalog-demo iframe', '#green-catalog-model img', '#green-work-paths img', '#green-schema-model img', '.case-close']) {
            assert.ok(await page.$(selector), `Green Loom artifact missing: ${selector}`);
          }
          assert.equal(await page.$('.folio-image-brief'), null, 'Green Loom uses existing visuals without duplicate production placeholders');
        } else if (route === '/design-dash.html') {
          assert.ok(await page.$('#dash-screen-record'), 'Design Dash requirement trace is present');
          assert.equal(await page.$('.folio-image-brief'), null, 'Design Dash illustrations replace production placeholders');
        }
        assert.equal(await page.$('.folio-image-brief'), null, `${route}: no public production briefs`);
        assert.ok(await page.$('.case-close'), `${route}: shared contact and next-story footer`);
        assert.deepEqual(await page.$$eval('.folio-case__hero > *', nodes => nodes.map(node => node.classList.contains('folio-case__intro') ? 'intro' : node.classList.contains('folio-case__hero-media') ? 'media' : node.classList.contains('folio-case__facts') ? 'facts' : 'unexpected')), ['intro', 'facts', 'media'], `${route}: opening contains intro, facts, and primary artifact`);
        assert.equal(await page.$(".folio-case .evidence-label, .folio-case .evidence-link, .folio-case figcaption:not(.markdown-demo__status)"), null, `${route}: no artifact disclaimers or full-size links`);
      }
      // Follow the actual rendered recommendations: all nine stories before returning.
      const visitedStories = new Set();
      let nextStory = '/classroom-assignment-management.html';
      while (!visitedStories.has(nextStory)) {
        assert.ok(caseRoutes.includes(nextStory), `Next link reaches a case study: ${nextStory}`);
        visitedStories.add(nextStory);
        await page.goto(origin + nextStory, {waitUntil: 'load'});
        nextStory = await page.$eval('.case-close__next', node => node.getAttribute('href'));
      }
      assert.equal(visitedStories.size, caseRoutes.length, 'Reading sequence includes every case study');
      assert.equal(nextStory, '/classroom-assignment-management.html', 'Reading sequence returns to the first story');
      for (const width of [320, 390, 768, 1440]) {
        await page.setViewport({width, height:900});
        await page.goto(origin + '/blog/ai-is-exposing-ux-design/', {waitUntil:'load'});
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Essay fits at ${width}px`);
      }
      await page.goto(origin + '/', {waitUntil:'load'});
      assert.ok(await page.$('a[href="/writing.html"]'), 'Writing is reachable from the portfolio');
      console.log('Shared case openings, complete reading sequence, and essay layouts passed');
      await page.goto(origin + '/', {waitUntil: 'load'});
      assert.deepEqual(await page.$$eval('#work .folio-project', nodes => nodes.map(n => n.id)), ['classroom', 'indeed-job-refresh', 'curbside-pickup']);
      const heroWords = await page.$$eval('.folio-hero__word', nodes => nodes.map(n => n.textContent.trim()));
      assert.equal(heroWords.length, 8);
      assert.equal(heroWords[0], 'glorious');
      assert.deepEqual(new Set(heroWords), new Set(['useful','clear','accessible','thoughtful','delightful','scalable','playful','glorious']));
      if (process.env.PORTFOLIO_TEST_BROWSER !== 'firefox') await page.emulateMediaFeatures([{name: 'prefers-reduced-motion', value: 'no-preference'}]);
      const first = await page.$eval('.folio-hero__word.is-current', n => n.textContent);
      await page.waitForFunction(value => document.querySelector('.folio-hero__word.is-current').textContent !== value, {}, first);
      await page.click('.folio-motion-toggle');
      const held = await page.$eval('.folio-hero__word.is-current', n => n.textContent);
      await new Promise(resolve => setTimeout(resolve, 2400));
      assert.equal(await page.$eval('.folio-hero__word.is-current', n => n.textContent), held, 'Pause holds the current adjective');
      assert.equal(await page.$eval('.folio-motion-toggle', n => n.getAttribute('aria-pressed')), 'true');
      if (process.env.PORTFOLIO_TEST_BROWSER !== 'firefox') {
      await page.emulateMediaFeatures([{name: 'prefers-reduced-motion', value: 'reduce'}]);
      await page.waitForFunction(() => document.querySelector('.folio-hero__word.is-current').textContent === 'glorious' && document.querySelector('.folio-motion-toggle').hidden);
      assert.equal(await page.$eval('.folio-hero__word.is-current', n => n.textContent), 'glorious');
      assert.equal(await page.$eval('.folio-motion-toggle', n => n.hidden), true);
      if (process.env.PORTFOLIO_TEST_BROWSER !== 'firefox') await page.emulateMediaFeatures([{name: 'prefers-reduced-motion', value: 'no-preference'}]);
      }
      await page.keyboard.press('Tab');
      await page.goto(origin + '/classroom-assignment-management.html', {waitUntil: 'load'});
      console.log(process.env.PORTFOLIO_TEST_BROWSER === 'firefox' ? 'IDEAS sequence, story selection, rotation, and pause passed; reduced-motion emulation is covered in Chrome' : 'IDEAS sequence, story selection, rotation, pause, and reduced motion passed');
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

      if (process.env.PORTFOLIO_TEST_BROWSER !== 'firefox') {
      const noScriptPage = await browser.newPage();
      await noScriptPage.setJavaScriptEnabled(false);
      await noScriptPage.goto(origin + "/classroom-assignment-management.html", { waitUntil: "load" });
      await noScriptPage.click(".folio-demo__assignment-summary");
      assert.equal(await noScriptPage.$$eval(`${assignments}[open]`, (nodes) => nodes.length), 2, "Native details should still work without JavaScript");
      await noScriptPage.close();
      }
      await page.goto(origin + '/indeed-job-refresh.html', {waitUntil: 'load'});
      const disclosure = 'details.case-disclosure';
      const researchToggle = `${disclosure} > summary`;
      assert.ok(await page.$(`${researchToggle} .case-disclosure__expand svg`), 'Lucide expand icon is present');
      if (process.env.PORTFOLIO_TEST_BROWSER !== 'firefox') {
        await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'no-preference'}]);
      }
      await page.click(researchToggle);
      await page.waitForFunction(() => !document.querySelector('details.case-disclosure').classList.contains('is-animating'));
      assert.equal(await page.$eval(disclosure, n => n.open), true);
      assert.equal(await page.$eval(`${disclosure} .case-disclosure__body`, n => n.inert), false);
      // Reverse twice before the first animation settles; the final request wins.
      await page.click(researchToggle);
      await page.click(researchToggle);
      await page.waitForFunction(() => !document.querySelector('details.case-disclosure').classList.contains('is-animating'));
      assert.equal(await page.$eval(disclosure, n => n.open), true, 'Rapid toggles preserve the last requested state');
      await page.focus(researchToggle);
      await page.keyboard.press('Enter');
      assert.equal(await page.$eval(disclosure, n => n.open), false, 'Keyboard closes immediately');
      assert.equal(await page.$eval(disclosure, n => n.classList.contains('is-animating')), false);
      await page.keyboard.press(' ');
      assert.equal(await page.$eval(disclosure, n => n.open), true, 'Space opens immediately');
      assert.equal(await page.$eval(disclosure, n => n.classList.contains('is-animating')), false);
      if (process.env.PORTFOLIO_TEST_BROWSER !== 'firefox') {
        await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
        await page.click(researchToggle);
        assert.equal(await page.$eval(disclosure, n => n.open), false, 'Reduced motion closes immediately');
        assert.equal(await page.$eval(disclosure, n => n.classList.contains('is-animating')), false);
        const nativePage = await browser.newPage();
        await nativePage.setJavaScriptEnabled(false);
        await nativePage.goto(origin + '/indeed-job-refresh.html', {waitUntil: 'load'});
        await nativePage.click(researchToggle);
        assert.equal(await nativePage.$eval(disclosure, n => n.open), true, 'Case disclosures work without JavaScript');
        await nativePage.close();
      }
      console.log(process.env.PORTFOLIO_TEST_BROWSER === 'firefox'
        ? 'Case-study disclosures passed: icons, rapid reversal, and keyboard; reduced motion and native fallback covered in Chrome'
        : 'Case-study disclosures passed: icons, rapid reversal, keyboard, reduced motion, and native fallback');
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
