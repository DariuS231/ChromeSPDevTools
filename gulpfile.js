
var gulp = require('gulp');
var gutil = require("gulp-util");
var zip = require('gulp-zip');
var config = require("./gulpconfig.json");
var webpack = require("webpack");

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
gulp.task("build-chromeExt", function (callback) {
    var prodConfig = require('./webpack/webpack.config.chromeExtension.prod.js');
    webpack(prodConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
            colors: true,
            chunks: false
        }));
        callback();
    });
});
gulp.task("generate-chrome-dev", ["copy-images", 'copy-data', "copy-rootFolderFiles", 'build-chromeExt'], function () {
});
gulp.task("generate-chrome-package", function () {
    return gulp.src(config.paths.chromeExt.package.packageFiles)
        .pipe(zip(config.paths.chromeExt.package.name))
        .pipe(gulp.dest(config.paths.chromeExt.package.distFolder));
});


/****//****//****//****/
//      SharePoint Actions
/****//****//****//****/
gulp.task("build-actions", function (callback) {
    var prodConfig = require('./webpack/webpack.config.actions.prod.js');
    webpack(prodConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
            colors: true,
            chunks: false
        }));
        callback();
    });
});

gulp.task("default", function () { }); 