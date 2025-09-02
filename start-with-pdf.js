const { spawn } = require("child_process");
const path = require("path");

console.log("Starting Resume with PDF Download functionality...\n");

// Start Gulp development server
console.log("🔧 Starting Gulp development server...");
const gulpProcess = spawn("npx", ["gulp"], {
  stdio: "inherit",
  shell: true,
  cwd: __dirname,
});

// Wait a moment for Gulp to start, then start PDF server
setTimeout(() => {
  console.log("📄 Starting PDF generation server on port 8080...");
  const pdfProcess = spawn("node", ["pdf-server.js"], {
    stdio: "inherit",
    shell: true,
    cwd: __dirname,
  });

  // Handle process cleanup
  process.on("SIGINT", () => {
    console.log("\n🛑 Shutting down servers...");
    gulpProcess.kill("SIGINT");
    pdfProcess.kill("SIGINT");
    process.exit(0);
  });

  process.on("SIGTERM", () => {
    gulpProcess.kill("SIGTERM");
    pdfProcess.kill("SIGTERM");
    process.exit(0);
  });
}, 3000);

// Handle Gulp process events
gulpProcess.on("error", (error) => {
  console.error("Error starting Gulp:", error);
});

gulpProcess.on("close", (code) => {
  if (code !== 0) {
    console.log(`Gulp process exited with code ${code}`);
  }
});
