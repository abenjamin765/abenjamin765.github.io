const fs = require("node:fs");
const path = require("node:path");
const sass = require("sass");
const markdownItFootnote = require("markdown-it-footnote");

const PROJECT_ROOT = path.dirname(__filename);

/** Writes site.scss → dist/site.css without spawning Gulp (avoids racing `gulp serve` + subprocess `gulp sassSite`). */
function compileSiteCssSync() {
  const entry = path.join(PROJECT_ROOT, "src/assets/style/site.scss");
  const styleDir = path.join(PROJECT_ROOT, "src/assets/style");
  const outDir = path.join(PROJECT_ROOT, "dist/assets/style");
  const outFile = path.join(outDir, "site.css");

  fs.mkdirSync(outDir, { recursive: true });

  const result = sass.compile(entry, {
    loadPaths: [styleDir],
    style: "expanded",
    sourceMap: false,
    silenceDeprecations: ["import"],
  });

  const tmp = outFile + ".tmp";
  fs.writeFileSync(tmp, result.css);
  fs.renameSync(tmp, outFile);
}

/** Eleventy sometimes sets `page.outputPath` relative to cwd without `dist/`; path.resolve alone lands outside dist and breaks stylesheet depth math. */
function resolveOutputHtmlUnderDist(distDir, outputPath) {
  const posix = outputPath.replace(/\\/g, "/").trim();
  if (path.isAbsolute(posix)) return posix;
  const normalized = posix.replace(/^\.\/+/, "");
  const tail = normalized.startsWith("dist/") ? normalized.slice(5) : normalized;
  return path.resolve(distDir, tail);
}

/** @returns {{ y: number; m: number; d: number } | null} m = 0–11 */
function calendarParts(value) {
  if (value == null || value === "") return null;

  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return null;
    return {
      y: value.getUTCFullYear(),
      m: value.getUTCMonth(),
      d: value.getUTCDate(),
    };
  }

  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value.trim())) {
    const [y, mo, d] = value.trim().split("-").map(Number);
    return { y, m: mo - 1, d };
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return {
    y: parsed.getFullYear(),
    m: parsed.getMonth(),
    d: parsed.getDate(),
  };
}

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("isoDate", function (value) {
    const parts = calendarParts(value);
    if (!parts) return "";
    const mo = String(parts.m + 1).padStart(2, "0");
    const day = String(parts.d).padStart(2, "0");
    return `${parts.y}-${mo}-${day}`;
  });

  eleventyConfig.addFilter("longDate", function (value) {
    const parts = calendarParts(value);
    if (!parts) return "";
    const local = new Date(parts.y, parts.m, parts.d);
    return local.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });
  // Site CSS only (resume.css is built by Gulp). Skip when `gulp sass` just ran — see npm `build` script.
  eleventyConfig.on("eleventy.before", () => {
    if (process.env.ELEVENTY_SKIP_SASS === "1") return;
    compileSiteCssSync();
  });

  // Do not watch SCSS here — `gulp serve` / `gulp watchSass` already rebuild CSS + BrowserSync inject.
  // Watching SCSS triggered duplicate builds alongside Gulp and double-wrote site.css.

  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItFootnote));

  /** Root-absolute paths like `/assets/...` fail on file:// and some preview servers; resolve relative to output HTML depth. */
  eleventyConfig.addFilter("relativeFromSiteRoot", function (pathname, page) {
    const clean =
      typeof pathname === "string" && pathname.startsWith("/")
        ? pathname.slice(1)
        : String(pathname || "");

    const distDir = path.resolve(PROJECT_ROOT, "dist");
    let depth = 0;

    if (page?.outputPath && typeof page.outputPath === "string") {
      const absOut = resolveOutputHtmlUnderDist(distDir, page.outputPath);
      const rel = path.relative(distDir, absOut);
      if (!rel.startsWith("..") && rel !== "") {
        const dir = path.dirname(rel);
        if (dir && dir !== ".") {
          depth = dir.split(path.sep).filter(Boolean).length;
        }
      }
    }

    if (depth === 0) {
      const urlPath = page?.url || "/";
      depth = urlPath.split("/").filter(Boolean).length;
    }

    const prefix = depth > 0 ? "../".repeat(depth) : "";
    return prefix + clean;
  });

  return {
    dir: {
      input: "content",
      includes: "_includes",
      output: "dist",
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
