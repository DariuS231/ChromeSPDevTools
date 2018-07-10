
const gulp = require('gulp');
const gutil = require("gulp-util");
const zip = require('gulp-zip');
const config = require("./gulpconfig.json");
const webpack = require("webpack");
const argv = require('yargs').argv
var replace = require('gulp-replace');
const readlineSync = require('readline-sync');

/****//****//****//****/
//      Google Extension
/****//****//****//****/
gulp.task("copy-images", function () {
    return gulp.src(config.paths.chromeExt.images.src)
        .pipe(gulp.dest(config.paths.chromeExt.images.dist));
});
gulp.task("copy-data", function () {
    let cdnUrl = 'https://localhost:8080/dist/actions';

    if (process.env.NODE_ENV.trim().toLocaleLowerCase() === 'production') {
        cdnUrl = readlineSync.question("Please provide the Base URL of the CDN for production: ");
    } 
    return gulp.src(config.paths.chromeExt.data.src)
            .pipe(replace('__%__CDN_URL__%__', cdnUrl))
            .pipe(gulp.dest(config.paths.chromeExt.data.dist));
});
gulp.task("copy-rootFolderFiles", function () {
    return gulp.src(config.paths.chromeExt.rootFolderFiles)
        .pipe(gulp.dest(config.paths.chromeExt.rootDistFoldder));
});
gulp.task("build-chromeExt", function (callback) {
    var prodConfig = require('./webpack/webpack.config.chromeExtension.prod.js');
    webpack(prodConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
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
gulp.task("generate-chrome-package", ["generate-chrome-dev"], function () {
    return gulp.src(config.paths.chromeExt.package.packageFiles)
        .pipe(zip(config.paths.chromeExt.package.name))
        .pipe(gulp.dest(config.paths.chromeExt.package.distFolder));
});


/****//****//****//****/
//      SharePoint Actions
/****//****//****//****/
gulp.task("build-actions", function (callback) {
    var prodConfig = require('./webpack/webpack.config.actions.prod.js');
    webpack(prodConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
            colors: true,
            chunks: false
        }));
        callback();
    });
});

gulp.task("default", function () { }); 