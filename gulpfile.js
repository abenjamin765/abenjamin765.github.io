const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const data = require("gulp-data");
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const browserSync = require("browser-sync").create();

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
    .src("src/index.pug")
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

// Compile Sass
function compileSass() {
  return gulp
    .src("src/assets/style/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/assets/style"))
    .pipe(browserSync.stream());
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

// Serve and watch
function serve() {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
    open: false,
  });
  gulp.watch("src/**/*.pug", compilePug);
  gulp.watch("src/assets/style/**/*.scss", compileSass);
  gulp.watch("src/assets/data/**/*.yml", compilePug);
  gulp.watch("src/assets/img/**/*", copyImages);
  gulp.watch("src/assets/js/**/*.js", copyJS);
}

exports.pug = compilePug;
exports.sass = compileSass;
exports.images = copyImages;
exports.js = copyJS;
exports.serve = gulp.series(compilePug, compileSass, copyImages, copyJS, serve);
exports.default = exports.serve;
