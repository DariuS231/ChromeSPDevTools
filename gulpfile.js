var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');

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

gulp.task("generate-chrome-package", function () {
    return gulp.src('dist/**')
        .pipe(zip('ChromeSPPropertiesAdmin.zip'))
        .pipe(gulp.dest('chromePackage'));
});

gulp.task("default", ["copy-images", "copy-manifest"], function () {
    return tsProject.src()
        .pipe(ts(tsProject))
        .pipe(uglify())
        .pipe(gulp.dest("dist/scripts"));
});