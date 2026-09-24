const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const data = require("gulp-data");
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const { execSync, spawn } = require("node:child_process");
const browserSync = require("browser-sync").create();

/** Child Eleventy watch process — cleaned up on exit (see `serve`). */
let eleventyWatch = null;

// Helper to load all YAML files into a single object
function getYamlData() {
  const dataDir = path.join(__dirname, "src/assets/data");
  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".yml"));
  let result = {};
  files.forEach((file) => {
    const filePath = path.join(dataDir, file);
    const fileData = yaml.load(fs.readFileSync(filePath, "utf8"));
    if (typeof fileData === "object" && fileData !== null) {
      Object.assign(result, fileData);
    }
  });
  return result;
}

// Compile Pug templates
function compilePug() {
  return gulp
    .src("src/*.pug")
    .pipe(
      data(function () {
        const yamlData = getYamlData();
        console.log("YAML data passed to Pug:", yamlData);
        return yamlData;
      })
    )
    .pipe(pug())
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
}

// Compile Sass — site / resume / folio as separate outputs.
// Scope BrowserSync injection per stylesheet so parallel builds don't inject the wrong CSS.
function compileSiteSass() {
  return gulp
    .src("src/assets/style/site.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/assets/style"))
    .pipe(browserSync.stream({ match: "**/site.css" }));
}

function compileResumeSass() {
  return gulp
    .src("src/assets/style/resume.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/assets/style"))
    .pipe(browserSync.stream({ match: "**/resume.css" }));
}

function compileFolioSass() {
  return gulp
    .src("src/assets/style/folio.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/assets/style"))
    .pipe(browserSync.stream({ match: "**/folio.css" }));
}

/** Full stylesheet build. Series avoids BS competing injections finishing out-of-order. */
const compileSass = gulp.series(compileSiteSass, compileResumeSass, compileFolioSass);

/** Markdown / Nunjuck layouts → dist (Gulp already built site.css; avoid double Sass in Eleventy). */
function runEleventyOnce() {
  execSync("npx @11ty/eleventy", {
    cwd: __dirname,
    stdio: "inherit",
    env: { ...process.env, ELEVENTY_SKIP_SASS: "1" },
  });
}

function compileEleventy(done) {
  try {
    runEleventyOnce();
    done();
  } catch (_err) {
    done(_err);
  }
}

// Copy and optimize images
async function copyImages() {
  const imagemin = (await import("gulp-imagemin")).default;
  return gulp
    .src("src/assets/img/**/*", { encoding: false })
    .pipe(imagemin())
    .pipe(gulp.dest("dist/assets/img"));
}

// Copy JavaScript files
function copyJS() {
  return gulp
    .src("src/assets/js/**/*.js")
    .pipe(gulp.dest("dist/assets/js"))
    .pipe(browserSync.stream());
}

const siteStyleWatch = [
  "src/assets/style/site.scss",
  "src/assets/style/_site-*.scss",
  "src/assets/style/_post-prose.scss",
  "src/assets/style/_reset.scss",
];

function stopEleventyWatch() {
  if (!eleventyWatch || eleventyWatch.killed) return;
  eleventyWatch.kill("SIGTERM");
  eleventyWatch = null;
}

/** Gulp’s glob watcher sometimes misses `content/` edits; Eleventy’s own watch is reliable. */
function startEleventyWatch() {
  stopEleventyWatch();
  eleventyWatch = spawn("npx", ["@11ty/eleventy", "--watch"], {
    cwd: __dirname,
    stdio: "inherit",
    env: { ...process.env, ELEVENTY_SKIP_SASS: "1" },
    shell: true,
  });
  eleventyWatch.on("error", function (err) {
    console.error("[eleventy --watch] failed to start:", err.message);
  });
  eleventyWatch.on("exit", function (code, signal) {
    if (signal === "SIGTERM") return;
    if (code !== 0 && code !== null) {
      console.error("[eleventy --watch] exited with code", code);
    }
  });
}

// Serve and watch
function serve() {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
    // Reload when Eleventy (or Pug) writes HTML — not only on CSS inject.
    files: ["dist/**/*.html"],
    open: false,
  });
  startEleventyWatch();

  const onShutdown = function () {
    stopEleventyWatch();
    process.exit(0);
  };
  process.once("SIGINT", onShutdown);
  process.once("SIGTERM", onShutdown);

  gulp.watch("src/*.pug", compilePug);
  gulp.watch(siteStyleWatch, compileSiteSass);
  gulp.watch(
    ["src/assets/style/resume.scss", "src/assets/style/_resume-*.scss"],
    compileResumeSass
  );
  gulp.watch(
    ["src/assets/style/folio.scss", "src/assets/style/_folio-*.scss", "src/assets/style/_reset.scss"],
    compileFolioSass
  );
  gulp.watch("src/assets/data/**/*.yml", compilePug);
  gulp.watch("src/assets/img/**/*", copyImages);
  gulp.watch("src/assets/js/**/*.js", copyJS);
}

/** Watch SCSS only (no Eleventy). `npm start` already rebuilds markdown + reloads BrowserSync. */
function watchSass() {
  gulp.watch(siteStyleWatch, compileSiteSass);
  gulp.watch(
    ["src/assets/style/resume.scss", "src/assets/style/_resume-*.scss"],
    compileResumeSass
  );
  gulp.watch(
    ["src/assets/style/folio.scss", "src/assets/style/_folio-*.scss", "src/assets/style/_reset.scss"],
    compileFolioSass
  );
}

exports.pug = compilePug;
exports.sassSite = compileSiteSass;
exports.sassResume = compileResumeSass;
exports.sassFolio = compileFolioSass;
exports.sass = compileSass;
exports.watchSass = watchSass;
exports.images = copyImages;
exports.js = copyJS;
exports.eleventy = compileEleventy;
exports.serve = gulp.series(
  compilePug,
  compileSass,
  copyImages,
  copyJS,
  compileEleventy,
  serve
);
exports.default = exports.serve;
