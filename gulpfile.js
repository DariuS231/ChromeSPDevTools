
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

var paths = {
    chromeExt: {
        rootDistFoldder: 'dist/chromeExtension/dev',
        rootFolderFiles: ['src/manifest.json', 'src/index.html'],
        package: {
            packageFiles: 'dist/chromeExtension/dev/**',
            name: 'ChromeSPPropertiesAdmin.zip',
            distFolder: 'dist/chromeExtension/prod'
        },
        images: {
            src: 'src/images/*.png',
            dist: 'dist/chromeExtension/dev/images'
        },
        scripts: {
            background: {
                watchFiles: 'src/scripts/chromeExtension/background.ts',
                entries: ['src/scripts/chromeExtension/background.ts'],
                outputFolder: 'dist/chromeExtension/dev/scripts',
                outputFileName: 'background.js'
            },
            spModalLauncher: {
                watchFiles: 'src/scripts/chromeExtension/spModalLauncher.ts',
                entries: ['src/scripts/chromeExtension/spModalLauncher.ts'],
                outputFolder: 'dist/chromeExtension/dev/scripts',
                outputFileName: 'spModalLauncher.js'
            },
            popup: {
                watchFiles: 'src/scripts/chromeExtension/popup.ts',
                entries: ['src/scripts/chromeExtension/popup.ts'],
                outputFolder: 'dist/chromeExtension/dev/scripts',
                outputFileName: 'popup.js'
            }
        }
    },
    actions: {
        spPropertyBag: {
            watchFiles: [
                'src/scripts/actions/SpPropertyBag/**/*.tsx',
                'src/scripts/actions/common/enums.ts',
                'src/scripts/actions/common/interfaces.ts',
                'src/scripts/actions/common/keyValueItem.tsx',
                'src/scripts/actions/common/messageBar.tsx',
                'src/scripts/actions/common/newKeyValueItem.tsx',
                'src/scripts/actions/common/spCustomModalWrapper.tsx',
                'src/scripts/actions/common/styles.ts',
                'src/scripts/actions/common/workingOnIt.tsx'
            ],
            entries: ['src/scripts/actions/SpPropertyBag/main.tsx'],
            outputFolder: 'dist/actions/SpPropertyBag',
            outputFileName: 'SpPropertyBag.js'
        }
    }
};


var browserifyFn = (entries, destFile, destFolder, noUglify) => {
    var ret = browserify({
        basedir: '.',
        debug: true,
        entries: entries,
        cache: {},
        packageCache: {}
    })
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
    return gulp.src(paths.chromeExt.images.src)
        .pipe(gulp.dest(paths.chromeExt.images.dist));
});

gulp.task("copy-rootFolderFiles", function () {
    return gulp.src(paths.chromeExt.rootFolderFiles)
        .pipe(gulp.dest(paths.chromeExt.rootDistFoldder));
});

gulp.task("generate-chrome-dev", ["copy-images", "copy-rootFolderFiles", 'build-chromeExt-background', 'build-chromeExt-SpModalLauncher', 'build-chromeExt-popUp'], function () {
});
gulp.task("generate-chrome-package", ["generate-chrome-dev"], function () {
    return gulp.src(paths.chromeExt.package.packageFiles)
        .pipe(zip(paths.chromeExt.package.name))
        .pipe(gulp.dest(paths.chromeExt.package.distFolder));
});

gulp.task("build-sppropertyBagFile", function (noUglify) {
    var obj = paths.actions.spPropertyBag;
    var entries = obj.entries;
    var destFile = obj.outputFileName;
    var destFolder = obj.outputFolder;
    return browserifyFn(entries, destFile, destFolder, noUglify);
});
gulp.task("build-chromeExt-background", function (noUglify) {
    var obj = paths.chromeExt.scripts.background;
    var entries = obj.entries;
    var destFile = obj.outputFileName;
    var destFolder = obj.outputFolder;
    return browserifyFn(entries, destFile, destFolder, noUglify);
});
gulp.task("build-chromeExt-popUp", function (noUglify) {
    var obj = paths.chromeExt.scripts.popup;
    var entries = obj.entries;
    var destFile = obj.outputFileName;
    var destFolder = obj.outputFolder;
    return browserifyFn(entries, destFile, destFolder, noUglify);
});
gulp.task("build-chromeExt-SpModalLauncher", function (noUglify) {
    var obj = paths.chromeExt.scripts.spModalLauncher;
    var entries = obj.entries;
    var destFile = obj.outputFileName;
    var destFolder = obj.outputFolder;
    return browserifyFn(entries, destFile, destFolder, noUglify);
});
gulp.task('watch', function () {
    gulp.watch(paths.actions.spPropertyBag.watchFiles, ['build-sppropertyBagFile']);
    gulp.watch(paths.chromeExt.scripts.background.watchFiles, ['build-chromeExt-background']);
    gulp.watch(paths.chromeExt.scripts.spModalLauncher.watchFiles, ['build-chromeExt-SpModalLauncher']);
    gulp.watch(paths.chromeExt.scripts.popup.watchFiles, ['build-chromeExt-popUp']);
});

gulp.task("default", ["watch"], function () { }); 