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
    images:['src/images/*.png'],
    rootFolderFiles: ['src/manifest.json']
}; 


gulp.task("copy-images", function () {
    return gulp.src(paths.images)
        .pipe(gulp.dest("dist/images")); 
}); 

gulp.task("copy-rootFolderFiles", function () {
    return gulp.src(paths.rootFolderFiles)
        .pipe(gulp.dest("dist")); 
}); 

gulp.task("generate-chrome-package", ["copy-images", "copy-rootFolderFiles", "compile-chrome-files"], function () {
    return gulp.src('dist/**')
        .pipe(zip('ChromeSPPropertiesAdmin.zip'))
        .pipe(gulp.dest('chromePackage'));
});



gulp.task("build-sppropertyBagFile", function (ugli) {
     var ret = browserify({
        basedir: '.',
        debug: true,
        entries: ['src/scripts/SpPropertyBag/main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .transform("babelify")
    .bundle()
    .pipe(source('SpPropertyBag.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}));
    if(ugli){
        ret = ret.pipe(uglify());
    }
    
    return ret.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("SpPropertyBag"));
}); 

gulp.task("compile-chrome-files", function (ugli) {
    var ret = tsProject.src()
        .pipe(ts(tsProject)); 
         if (ugli) {
            ret = ret.pipe(uglify()); 
        }
        return  ret.pipe(rename( {dirname:''})).pipe(gulp.dest("dist/scripts")); 
}); 

gulp.task("default", ["copy-images", "copy-rootFolderFiles", "compile-chrome-files","build-sppropertyBagFile"], function(ugli) {}); 