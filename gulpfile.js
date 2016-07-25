var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var watchify = require("watchify");
var browserify = require("browserify");
var uglify = require('gulp-uglify');

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

gulp.task("default", ["copy-images", "copy-manifest"], function () {
    return tsProject.src()
        .pipe(ts(tsProject))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        //.pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("dist/scripts"));
});