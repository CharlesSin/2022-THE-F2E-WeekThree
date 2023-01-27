const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");

function buildStyles() {
  return src("sass/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(dest("css"));
}

function watchTask() {
  watch(["sass/**/*.scss", "*.html"], buildStyles);
}

function buildJavascript() {
  return src("javascript/*.js").pipe(uglify()).pipe(dest("js"));
}

exports.default = series(buildStyles, buildJavascript, watchTask);
