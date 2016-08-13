
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

var paths =  {
    chromeExt:{
        rootDistFoldder:'dist/chromeExtension/dev',
        rootFolderFiles: ['src/manifest.json'],
        package:{
            packageFiles:'dist/chromeExtension/dev/**',
            name: 'ChromeSPPropertiesAdmin.zip',
            distFolder:'dist/chromeExtension/prod'
        },
        images:{
            src:'src/images/*.png',
            dist:'dist/chromeExtension/dev/images'
        },
        scripts:{
            background:{
                watchWildCard:'src/scripts/chromeExtension/background.ts',
                entries:['src/scripts/chromeExtension/background.ts'],
                outputFolder:'dist/chromeExtension/dev',
                outputFileName:'background.js'
            },
            spModalLauncher:{
                watchWildCard:'src/scripts/chromeExtension/spModalLauncher.ts',
                entries:['src/scripts/chromeExtension/spModalLauncher.ts'],
                outputFolder:'dist/chromeExtension/dev',
                outputFileName:'spModalLauncher.js'
            }
        }
    },
    actions: {
        spPropertyBag:{
            watchWildCard:[
                'src/scripts/actions/SpPropertyBag/**/*.tsx'
            ],
            entries:['src/scripts/actions/SpPropertyBag/main.tsx'],
            outputFolder:'dist/actions/SpPropertyBag',
            outputFileName:'SpPropertyBag.js'
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
    .on('error', function(err){
      console.log(err.message);
      this.emit('end');
    }).pipe(source(destFile)).pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}));

    if(!noUglify){
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

gulp.task("generate-chrome-package", ["copy-images", "copy-rootFolderFiles", 'build-chromeExt-background', 'build-chromeExt-SpModalLauncher'], function () {
    return gulp.src(paths.chromeExt.package.packageFiles)
        .pipe(zip(paths.chromeExt.package.name))
        .pipe(gulp.dest(paths.chromeExt.package.distFolder));
});

gulp.task("build-sppropertyBagFile", function (noUglify) {
    var obj = paths.actions.spPropertyBag;
    var entries = obj.entries;
    var destFile = obj.outputFileName;
    var destFolder = obj.outputFolder;
    return browserifyFn(entries,destFile,destFolder, noUglify);
}); 
gulp.task("build-chromeExt-background", function (noUglify) {
    var obj = paths.chromeExt.scripts.background;
    var entries = obj.entries;
    var destFile = obj.outputFileName;
    var destFolder = obj.outputFolder;
    return browserifyFn(entries,destFile,destFolder, noUglify);
}); 
gulp.task("build-chromeExt-SpModalLauncher", function (noUglify) {
    var obj = paths.chromeExt.scripts.spModalLauncher;
    var entries = obj.entries;
    var destFile = obj.outputFileName;
    var destFolder = obj.outputFolder;
    return browserifyFn(entries,destFile,destFolder, noUglify);
}); 
gulp.task('watch',function(){
    gulp.watch(paths.actions.spPropertyBag.watchWildCard, ['build-sppropertyBagFile']);
    gulp.watch(paths.chromeExt.scripts.background.watchWildCard, ['build-chromeExt-background']);
    gulp.watch(paths.chromeExt.scripts.spModalLauncher.watchWildCard, ['build-chromeExt-SpModalLauncher']);
});

gulp.task("default", ["watch"], function() { }); 