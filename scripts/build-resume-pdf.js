const path = require("node:path");
const express = require("express");
const puppeteer = require("puppeteer");

async function main() {
  const root = path.resolve(__dirname, "..");
  const distPath = path.join(root, "dist");
  const outputPath = path.join(root, "dist", "assets", "Aaron-Benjamin-Resume.pdf");
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
    const browser = await puppeteer.launch({ headless: true });
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
