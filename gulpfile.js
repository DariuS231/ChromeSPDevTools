
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
var concat = require('gulp-concat');

/****//****//****//****/
//      The --noUglify parameter can be specified in some tasks to prevent minification of the generated files
/****//****//****//****/

/****//****//****//****/
//      Utils
/****//****//****//****/
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

    return ret.pipe(sourcemaps.write('./')).pipe(gulp.dest(destFolder));
}

var compileSassFn = (entries, destFile, destFolder, noUglify) => {
    var sasConf = config.sassConfig;
    if (noUglify) {
        sasConf['outputStyle'] = "expanded";
    }
    return gulp.src(entries)
        .pipe(sass(sasConf))
        .pipe(rename(destFile))
        .pipe(gulp.dest(destFolder));
}
/****//****//****//****/
//      Google Extension
/****//****//****//****/

gulp.task("copy-images", function () {
    return gulp.src(config.paths.chromeExt.images.src)
        .pipe(gulp.dest(config.paths.chromeExt.images.dist));
});
gulp.task("copy-data", function () {
    return gulp.src(config.paths.chromeExt.data.src)
        .pipe(gulp.dest(config.paths.chromeExt.data.dist));
});

gulp.task("copy-rootFolderFiles", function () {
    return gulp.src(config.paths.chromeExt.rootFolderFiles)
        .pipe(gulp.dest(config.paths.chromeExt.rootDistFoldder));
});

gulp.task("build-chromeExt-popUp", function (noUglify) {
    var obj = config.paths.chromeExt.scripts.popup;
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

gulp.task('build-chromeExt-styles', function (noUglify) {
    var obj = config.paths.chromeExt.styles;
    return compileSassFn(obj.watchFiles, config.paths.chromeExt.styles.bundle, config.paths.chromeExt.styles.dist)
});

gulp.task("generate-chrome-dev", ["copy-images", 'copy-data', "copy-rootFolderFiles", 'build-chromeExt-background', 'build-chromeExt-popUp', 'build-chromeExt-styles'], function (noUglify) {

});
gulp.task("generate-chrome-package", ["generate-chrome-dev"], function () {
    return gulp.src(config.paths.chromeExt.package.packageFiles)
        .pipe(zip(config.paths.chromeExt.package.name))
        .pipe(gulp.dest(config.paths.chromeExt.package.distFolder));
});

/****//****//****//****/
//      SharePoint Actions
/****//****//****//****/

gulp.task('build-actions-styles', function (noUglify) {
    var obj = config.paths.actions.styles;
    return compileSassFn(obj.watchFiles, obj.bundle, obj.dist, noUglify);
});

gulp.task("build-sppropertyBagFile", ['build-actions-styles'], function (noUglify) {
    var obj = config.paths.actions.spPropertyBag;
    var entries = obj.entries;
    var destFile = obj.outputFileName;
    var destFolder = obj.outputFolder;
    return browserifyFn(entries, destFile, destFolder, noUglify);
});

gulp.task("build-spSiteContentFile", ['build-actions-styles'], function (noUglify) {
    var obj = config.paths.actions.spSiteContent;
    var entries = obj.entries;
    var destFile = obj.outputFileName;
    var destFolder = obj.outputFolder;
    return browserifyFn(entries, destFile, destFolder, noUglify);
});
gulp.task("build-spWebCustomActionsFile", ['build-actions-styles'], function (noUglify) {
    var obj = config.paths.actions.spWebCustomActions;
    var entries = obj.entries;
    var destFile = obj.outputFileName;
    var destFolder = obj.outputFolder;
    return browserifyFn(entries, destFile, destFolder, noUglify);
});
gulp.task("build-spSiteCustomActionsFile", ['build-actions-styles'], function (noUglify) {
    var obj = config.paths.actions.spSiteCustomActions;
    var entries = obj.entries;
    var destFile = obj.outputFileName;
    var destFolder = obj.outputFolder;
    return browserifyFn(entries, destFile, destFolder, noUglify);
});
gulp.task("build-spFeatureFile", ['build-actions-styles'], function (noUglify) {
    var obj = config.paths.actions.spFeatures;
    var entries = obj.entries;
    var destFile = obj.outputFileName;
    var destFolder = obj.outputFolder;
    return browserifyFn(entries, destFile, destFolder, noUglify);
});

gulp.task('build-actions', ["build-sppropertyBagFile", "build-spSiteContentFile", "build-spWebCustomActionsFile", "build-spSiteCustomActionsFile", "build-spFeatureFile"],function(){});
/****//****//****//****/
//      Watch
/****//****//****//****/
gulp.task('watch', ["build-sppropertyBagFile", "build-spSiteContentFile", "build-spWebCustomActionsFile", "build-spSiteCustomActionsFile", "build-spFeatureFile"], function (noUglify) {
    gulp.watch(config.paths.actions.spPropertyBag.watchFiles, ['build-sppropertyBagFile']);
    gulp.watch(config.paths.actions.spSiteContent.watchFiles, ['build-spSiteContentFile']);
    gulp.watch(config.paths.actions.spCustomActions.watchFiles, ['build-spWebCustomActionsFile']);
    gulp.watch(config.paths.actions.spCustomActions.watchFiles, ['build-spSiteCustomActionsFile']);
    gulp.watch(config.paths.actions.spCustomActions.watchFiles, ['build-spFeatureFile']);
    gulp.watch(config.paths.chromeExt.scripts.background.watchFiles, ['build-chromeExt-background']);
    gulp.watch(config.paths.chromeExt.scripts.popup.watchFiles, ['build-chromeExt-popUp']);
    gulp.watch(config.paths.chromeExt.styles.watchFiles, ['build-chromeExt-styles']);
    gulp.watch(config.paths.actions.styles.watchFiles, ['build-actions-styles']);
});

gulp.task("default", ["watch"], function (noUglify) { }); 