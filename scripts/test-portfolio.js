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
        console.log(`Responsive widths passed: ${route}`);
      }

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
      assert.equal(await page.$$eval(".green-case__figure", (nodes) => nodes.length), 4, "Green Loom should show its certificate timeline, model, schema, and mobile catalog exploration");
      assert.equal(await page.$$eval(".green-case__hero-media figcaption", (nodes) => nodes.length), 0, "Green Loom hero should not have a caption");
      assert.equal(await page.$eval(".folio-hdr__name--project", (node) => node.textContent.trim()), "←Green Loom");
      for (const image of ["green-loom--figma-hero-2x.png", "green-loom--mobile-catalog-2x.png"]) {
        assert.ok(fs.existsSync(path.join(dist, "assets", "img", "folio", "project--green-loom", image)), `Green Loom Figma image missing: ${image}`);
      }
      assert.ok((await page.$eval(".green-case__hero-media img", (node) => node.getAttribute("src"))).includes("green-loom--catalog-hero-2x.png"), "Green Loom hero should point at the corrected catalog export, not the contradictory Figma hero");
      console.log("Green Loom case-study structure passed");

      await page.goto(origin + "/design-dash.html", { waitUntil: "domcontentloaded", timeout: 60000 });
      assert.equal(await page.$$eval("h1", (nodes) => nodes.length), 1, "Design Dash should have one page heading");
      assert.equal(await page.$eval(".folio-hdr__name--project", (node) => node.textContent.trim()), "←Design Dash");
      assert.equal(await page.$eval(".folio-hdr__name--project", (node) => node.getAttribute("href")), "/#design-dash");
      assert.ok((await page.$eval(".folio-case__hero-media img", (node) => node.getAttribute("src"))).includes("design-dash--hero-2x.png"), "Design Dash hero should point at its placeholder path");
      console.log("Design Dash case-study structure passed");

      await page.goto(origin + "/many-hats.html", { waitUntil: "domcontentloaded", timeout: 60000 });
      assert.equal(await page.$$eval("h1", (nodes) => nodes.length), 1, "Many Hats should have one page heading");
      assert.equal(await page.$eval(".folio-hdr__name--project", (node) => node.textContent.trim()), "←Many Hats");
      assert.equal(await page.$eval(".folio-hdr__name--project", (node) => node.getAttribute("href")), "/#many-hats");
      assert.ok((await page.$eval(".folio-case__hero-media img", (node) => node.getAttribute("src"))).includes("many-hats--hero-2x.png"), "Many Hats hero should point at its placeholder path");
      const homepage = await browser.newPage();
      await homepage.goto(origin + "/", { waitUntil: "domcontentloaded", timeout: 60000 });
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
          title: "←A-to-z First Claim",
          back: "/#a-to-z-first-claim",
          hero: "a-to-z-first-claim--hero-2x.jpg",
          assets: ["a-to-z-first-claim--hero-2x.jpg", "a-to-z-first-claim--work-card-2x.png", "a-to-z-first-claim--email-2x.png"],
          folder: "project--a-to-z-first-claim",
        },
        {
          route: "/curbside-pickup.html",
          title: "←Curbside Pickup",
          back: "/#curbside-pickup",
          hero: "curbside-pickup--hero-2x.png",
          assets: ["curbside-pickup--hero-2x.png", "curbside-pickup--work-card-2x.png", "curbside-pickup--email-2x.png", "curbside-pickup--checkin-2x.png"],
          folder: "project--curbside-pickup",
        },
        {
          route: "/price-adjustments.html",
          title: "←Price Adjustments",
          back: "/#price-adjustments",
          hero: "price-adjustments--hero-2x.png",
          assets: ["price-adjustments--hero-2x.png", "price-adjustments--work-card-2x.png", "price-adjustments--apply-ui-2x.png", "price-adjustments--update-ui-2x.png"],
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
      assert.equal(await page.$eval(".folio-hdr__name--project", (node) => node.textContent.trim()), "←Classroom Assignment Management");
      assert.equal(await page.$eval(".folio-hdr__name--project", (node) => node.getAttribute("href")), "/#work");
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
