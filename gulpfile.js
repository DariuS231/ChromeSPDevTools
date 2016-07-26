var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var tsProjectSpPropBag = ts.createProject("tsconfig.json");
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');
var rename = require('gulp-rename');

var paths = {
    images: ['src/images/*.png'],
    manifest: ['src/manifest.json']
};


gulp.task("copy-images", function () {
    return gulp.src(paths.images)
        .pipe(gulp.dest("dist/images"));
});

gulp.task("copy-manifest", function () {
    return gulp.src(paths.manifest)
        .pipe(gulp.dest("dist"));
});

gulp.task("generate-chrome-package", ["copy-images", "copy-manifest","build-sppropertyBagFile","compile-chrome-files"], function () {
    return gulp.src('dist/**')
        .pipe(zip('ChromeSPPropertiesAdmin.zip'))
        .pipe(gulp.dest('chromePackage'));
});

gulp.task("build-sppropertyBagFile", function () {
    return gulp.src('src/scripts/SpPropertyBag/SpPropertyBag.ts')
        .pipe(ts(tsProjectSpPropBag))
        .pipe(uglify())
        .pipe(gulp.dest("spPropertyBag"));
});

gulp.task("compile-chrome-files", function () {
    return tsProject.src()
        .pipe(ts(tsProject))
        .pipe(uglify())
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest("dist/scripts"));
});

gulp.task("default", ["copy-images", "copy-manifest","build-sppropertyBagFile","compile-chrome-files"], function(){ });