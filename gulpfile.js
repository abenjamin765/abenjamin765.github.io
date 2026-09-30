const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const data = require("gulp-data");
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const { execSync, spawn } = require("node:child_process");
const { Transform } = require("node:stream");
const { pipeline } = require("node:stream/promises");
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

const RESUME_PROFILE_EXPORT = path.join(__dirname, "resume/exports/public-portfolio/resume.json");
const CAREER_DATA_DIR = path.join(__dirname, "resume/exports/data");
const CAREER_DATA_FILES = ["career.json", "resume-profiles.json"];

/** Regenerates résumé exports and resume/exports/data; fails the build if a profile no longer resolves. */
function exportResume(done) {
  try {
    execSync("node scripts/export-resume.js", { cwd: __dirname, stdio: "inherit" });
    // career.json holds private contact details and unverified claims; it must never be a standalone site URL.
    for (const name of CAREER_DATA_FILES) {
      fs.rmSync(path.join(__dirname, "dist/assets/data", name), { force: true });
    }
    done();
  } catch (_err) {
    done(_err);
  }
}

// The résumé builder embeds the full career record (private contact details,
// unverified claims), so it is never compiled or copied into dist/.
const BUILDER_PAGE = "src/resume-builder.pug";
const BUILDER_SCRIPT = "src/assets/js/resume-builder.js";
const BUILDER_OUT = path.join(__dirname, "resume/exports/builder");

// Compile Pug templates
function compilePug() {
  return gulp
    .src(["src/*.pug", "!" + BUILDER_PAGE])
    .pipe(
      data(function () {
        const yamlData = getYamlData();
        yamlData.resume = JSON.parse(fs.readFileSync(RESUME_PROFILE_EXPORT, "utf8"));
        return yamlData;
      })
    )
    .pipe(pug())
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
}

const buildPug = gulp.series(exportResume, compilePug);

/** JSON for a `script type="application/json"` body; escaping `<` keeps `</script>` in data from closing the tag. */
function inlineJson(file) {
  return fs.readFileSync(file, "utf8").trim().replace(/</g, "\\u003c");
}

/** Local-only builder page; root-relative asset paths become relative so it opens from file://. */
function compileBuilderPage() {
  return gulp
    .src(BUILDER_PAGE)
    .pipe(
      data(() => ({
        builderData: {
          career: inlineJson(path.join(CAREER_DATA_DIR, "career.json")),
          profiles: inlineJson(path.join(CAREER_DATA_DIR, "resume-profiles.json")),
        },
      }))
    )
    .pipe(pug())
    .pipe(
      new Transform({
        objectMode: true,
        transform(file, _encoding, callback) {
          file.contents = Buffer.from(String(file.contents).replace(/(href|src)="\/assets\//g, '$1="assets/'));
          file.basename = "index.html";
          callback(null, file);
        },
      })
    )
    .pipe(gulp.dest(BUILDER_OUT));
}

function compileBuilderSass() {
  return gulp
    .src("src/assets/style/folio.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(path.join(BUILDER_OUT, "assets/style")));
}

function copyBuilderAssets() {
  return gulp
    .src([BUILDER_SCRIPT, "src/assets/img/folio/blob.svg", "src/assets/img/folio/favicon.svg"], {
      base: "src",
      encoding: false,
    })
    .pipe(gulp.dest(BUILDER_OUT));
}

function reportBuilderPath(done) {
  console.log(`Résumé builder (local only, not published): ${path.join(BUILDER_OUT, "index.html")}`);
  done();
}

const buildResumeBuilder = gulp.series(
  exportResume,
  gulp.parallel(compileBuilderPage, compileBuilderSass, copyBuilderAssets),
  reportBuilderPath
);

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
  await pipeline(
    gulp.src("src/assets/img/**/*", { encoding: false }),
    imagemin(),
    gulp.dest("dist/assets/img")
  );
}

// Copy JavaScript files
function copyJS() {
  return gulp
    .src(["src/assets/js/**/*.js", "!" + BUILDER_SCRIPT])
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
  gulp.watch(["resume/canonical/**/*.yml", "resume/profiles/**/*.yml"], buildPug);
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

exports.pug = buildPug;
exports.resumeExport = exportResume;
exports.resumeBuilder = buildResumeBuilder;
exports.sassSite = compileSiteSass;
exports.sassResume = compileResumeSass;
exports.sassFolio = compileFolioSass;
exports.sass = compileSass;
exports.watchSass = watchSass;
exports.images = copyImages;
exports.js = copyJS;
exports.eleventy = compileEleventy;
exports.serve = gulp.series(
  buildPug,
  compileSass,
  copyImages,
  copyJS,
  compileEleventy,
  serve
);
exports.default = exports.serve;
