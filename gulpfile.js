
var gulp = require('gulp-param')(require('gulp'), process.argv);
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');
var rename = require('gulp-rename');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var config = require("./gulpconfig.json");

var browserifyFn = (entries, destFile, destFolder, noUglify) => {
    var bsfConfig = config.browserifyConfig;
    bsfConfig["entries"] = entries;
    var ret = browserify(bsfConfig)
        .plugin(tsify).transform("babelify").bundle()
        .on('error', function (err) {
            console.log(err.message);
            this.emit('end');
        }).pipe(source(destFile)).pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }));

    if (!noUglify) {
        ret = ret.pipe(uglify());
    }

    return ret.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(destFolder));
}

gulp.task("copy-images", function () {
    return gulp.src(config.paths.chromeExt.images.src)
        .pipe(gulp.dest(config.paths.chromeExt.images.dist));
});

gulp.task("copy-rootFolderFiles", function () {
    return gulp.src(config.paths.chromeExt.rootFolderFiles)
        .pipe(gulp.dest(config.paths.chromeExt.rootDistFoldder));
});

gulp.task("copy-jquery", function () {
    return gulp.src(config.paths.chromeExt.vendors.jquery.src)
        .pipe(gulp.dest(config.paths.chromeExt.vendors.jquery.dist));
});

gulp.task("generate-chrome-dev", ["copy-images", "copy-rootFolderFiles", 'build-chromeExt-background', 'build-chromeExt-popUp', 'build-chromeExt-styles', 'copy-jquery'], function () {
});
gulp.task("generate-chrome-package", ["generate-chrome-dev"], function () {
    return gulp.src(config.paths.chromeExt.package.packageFiles)
        .pipe(zip(config.paths.chromeExt.package.name))
        .pipe(gulp.dest(config.paths.chromeExt.package.distFolder));
});

gulp.task("build-sppropertyBagFile", function (noUglify) {

    var obj = config.paths.actions.spPropertyBag;

    var entries = obj.entries;
    var destFile = obj.outputFileName;
    var destFolder = obj.outputFolder;
    return browserifyFn(entries, destFile, destFolder, noUglify);
});
gulp.task("build-chromeExt-background", function (noUglify) {
    var obj = config.paths.chromeExt.scripts.background;
    var entries = obj.entries;
    var destFile = obj.outputFileName;
    var destFolder = obj.outputFolder;
    return browserifyFn(entries, destFile, destFolder, noUglify);
});
gulp.task("build-chromeExt-popUp", function (noUglify) {
    var obj = config.paths.chromeExt.scripts.popup;
    var entries = obj.entries;
    var destFile = obj.outputFileName;
    var destFolder = obj.outputFolder;
    return browserifyFn(entries, destFile, destFolder, noUglify);
});

gulp.task('build-chromeExt-styles', function () {
    return gulp.src(config.paths.chromeExt.styles.watchFiles)
        .pipe(sass(config.sassConfig))
        .pipe(rename(config.paths.chromeExt.styles.bundle))
        .pipe(gulp.dest(config.paths.chromeExt.styles.dist));
});

gulp.task('watch', function () {
    gulp.watch(config.paths.actions.spPropertyBag.watchFiles, ['build-sppropertyBagFile']);
    gulp.watch(config.paths.chromeExt.scripts.background.watchFiles, ['build-chromeExt-background']);
    gulp.watch(config.paths.chromeExt.scripts.popup.watchFiles, ['build-chromeExt-popUp']);
    gulp.watch(config.paths.chromeExt.styles.watchFiles, ['build-chromeExt-styles']);
});

gulp.task("default", ["watch"], function () { }); 