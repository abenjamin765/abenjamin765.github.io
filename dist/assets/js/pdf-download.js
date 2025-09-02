// PDF Download functionality
document.addEventListener("DOMContentLoaded", function () {
  const downloadButton = document.getElementById("download");

  if (downloadButton) {
    downloadButton.addEventListener("click", async function (e) {
      e.preventDefault();

      // Show loading state
      const originalText = downloadButton.textContent;
      downloadButton.textContent = "Generating PDF...";
      downloadButton.disabled = true;

      try {
        // Make request to PDF generation endpoint
        const response = await fetch("http://localhost:8080/generate-pdf");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Get the PDF blob
        const blob = await response.blob();

        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;

        // Generate filename with current date
        const now = new Date();
        const dateStr = now.toISOString().split("T")[0]; // YYYY-MM-DD format
        a.download = `resume-${dateStr}.pdf`;

        // Trigger download
        document.body.appendChild(a);
        a.click();

        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        console.log("PDF download completed successfully");
      } catch (error) {
        console.error("Error downloading PDF:", error);
        alert(
          "Sorry, there was an error generating the PDF. Please try again."
        );
      } finally {
        // Reset button state
        downloadButton.textContent = originalText;
        downloadButton.disabled = false;
      }
    });
  }
});
