const fs = require("node:fs");

// Shared by the article and writing index; omit source URLs and front matter.
function readingMinutes(data) {
  const body = fs.readFileSync(data.page.inputPath, "utf8")
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "")
    .replace(/^\[\^[^\]]+\]:.*$/gm, "")
    .replace(/https?:\/\/\S+/g, "");
  return Math.max(1, Math.ceil(body.trim().split(/\s+/).length / 225));
}

module.exports = {
  layout: "layout.njk",
  tags: "post",
  isPost: true,
  shareImage: "/assets/img/folio/hero-portrait.png",
  eleventyComputed: { readingMinutes },
};
