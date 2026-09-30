const fs = require("node:fs");
const path = require("node:path");
const express = require("express");
const puppeteer = require("puppeteer");

async function main() {
  const root = path.resolve(__dirname, "..");
  const distPath = path.join(root, "dist");
  const outputPath = path.join(root, "dist", "assets", "Aaron-Benjamin-Resume.pdf");
  const atsDir = path.join(root, "resume", "exports", "public-portfolio");
  const atsSource = path.join(atsDir, "resume.ats.html");
  const atsOutputPath = path.join(atsDir, "resume-ats.pdf");
  const externalOrigin = process.env.PORTFOLIO_PDF_ORIGIN;
  let server;
  if (!externalOrigin) {
    const app = express();
    app.use(express.static(distPath));
    server = await new Promise((resolve) => {
      const listening = app.listen(0, "127.0.0.1", () => resolve(listening));
    });
  }

  try {
    // GitHub-hosted Linux runners cannot start Chromium's sandbox. The PDF
    // renderer opens only this build's local résumé pages in an ephemeral job.
    const browser = await puppeteer.launch({
      headless: true,
      args: process.env.GITHUB_ACTIONS === "true" ? ["--no-sandbox"] : [],
    });
    try {
      const page = await browser.newPage();
      const origin = externalOrigin || `http://127.0.0.1:${server.address().port}`;
      await page.goto(`${origin}/resume.html`, { waitUntil: "domcontentloaded" });
      const styled = await page.$eval("#wrapper", (element) => getComputedStyle(element).display === "grid");
      if (!styled) throw new Error("Résumé stylesheet did not load; refusing to export an unstyled PDF.");
      await page.pdf({
        path: outputPath,
        printBackground: true,
        preferCSSPageSize: true,
      });
      console.log(`Generated ${outputPath}`);

      const atsPage = await browser.newPage();
      await atsPage.setContent(fs.readFileSync(atsSource, "utf8"), { waitUntil: "load" });
      // The ATS body margin is for screen; let the page margin own spacing so later pages match the first.
      await atsPage.addStyleTag({ content: "body{margin:0 auto}" });
      await atsPage.pdf({
        path: atsOutputPath,
        format: "Letter",
        printBackground: false,
        margin: { top: "0.5in", right: "0.5in", bottom: "0.5in", left: "0.5in" },
      });
      console.log(`Generated ${atsOutputPath}`);
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
