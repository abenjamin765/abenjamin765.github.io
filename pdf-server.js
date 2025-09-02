const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 8080;

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Serve static files from dist directory
app.use(express.static("dist"));

// PDF generation endpoint
app.get("/generate-pdf", async (req, res) => {
  let browser;

  try {
    console.log("Starting PDF generation...");

    // Launch browser with optimized settings for PDF generation
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
      ],
    });

    const page = await browser.newPage();

    // Set viewport to match typical desktop viewing
    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 1,
    });

    // Emulate screen media instead of print media
    await page.emulateMediaType("screen");

    // Navigate to the resume page - BrowserSync typically runs on port 3004
    const resumeUrl = `http://localhost:3004/index.html`;
    console.log(`Navigating to: ${resumeUrl}`);

    await page.goto(resumeUrl, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // Wait for content to load
    await page.waitForSelector("#wrapper", { timeout: 10000 });

    // Hide download button, background images, and drop shadow
    await page.addStyleTag({
      content: `
        /* Hide download button only */
        .no-print { display: none !important; }
        
        /* Remove background images */
        body {
          background-image: none !important;
          background: transparent !important;
        }
        
        /* Ensure all colors and backgrounds are preserved */
        * { 
          -webkit-print-color-adjust: exact !important; 
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        /* Remove drop shadow and ensure clean white background */
        #wrapper {
          box-shadow: none !important;
          background: white !important;
          margin: 0 !important;
          padding: 4rem !important;
        }
      `,
    });

    console.log("Generating PDF...");

    // Get the wrapper element for clipping
    const wrapperElement = await page.$("#wrapper");
    if (!wrapperElement) {
      throw new Error("Could not find #wrapper element");
    }

    // Get wrapper dimensions and position
    const wrapperBox = await wrapperElement.boundingBox();
    console.log(
      `Wrapper dimensions: ${wrapperBox.width}x${wrapperBox.height} at (${wrapperBox.x}, ${wrapperBox.y})`
    );

    // Convert wrapper dimensions to inches (1px = 1/96 inch)
    const wrapperWidthIn = Math.round(wrapperBox.width) / 96;
    const wrapperHeightIn = Math.round(wrapperBox.height) / 96;

    console.log(`PDF page size: ${wrapperWidthIn}x${wrapperHeightIn} inches`);

    // Generate PDF with exact wrapper dimensions - no scaling needed
    const pdf = await page.pdf({
      width: `${wrapperWidthIn}in`,
      height: `${wrapperHeightIn}in`,
      printBackground: true,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      preferCSSPageSize: false,
      displayHeaderFooter: false,
      tagged: true,
      scale: 1.0,
      // Clip to the wrapper element
      clip: {
        x: wrapperBox.x,
        y: wrapperBox.y,
        width: wrapperBox.width,
        height: wrapperBox.height,
      },
    });

    console.log("PDF generated successfully");

    // Set headers for file download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="resume.pdf"');
    res.setHeader("Content-Length", pdf.length);

    // Send the PDF
    res.send(pdf);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({
      error: "Failed to generate PDF",
      details: error.message,
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", service: "PDF Generator" });
});

// Start server
app.listen(PORT, () => {
  console.log(`PDF server running on http://localhost:${PORT}`);
  console.log(
    `PDF generation available at: http://localhost:${PORT}/generate-pdf`
  );
});

module.exports = app;
