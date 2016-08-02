var gulp = require('gulp-param')(require('gulp'), process.argv); 
var ts = require("gulp-typescript"); 
var tsProject = ts.createProject("tsconfig.json"); 
var tsProjectSpPropBag = ts.createProject("tsconfig.json"); 
var uglify = require('gulp-uglify'); 
var zip = require('gulp-zip'); 
var rename = require('gulp-rename'); 

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

gulp.task("generate-chrome-package", ["copy-images", "copy-rootFolderFiles", "build-sppropertyBagFile", "compile-chrome-files"], function () {
    return gulp.src('dist/**')
        .pipe(zip('ChromeSPPropertiesAdmin.zip'))
        .pipe(gulp.dest('chromePackage'));
});

gulp.task("build-sppropertyBagFile", function (ugli) {
    var ret = gulp.src('src/scripts/SpPropertyBag/SpPropertyBag.ts')
        .pipe(ts(tsProjectSpPropBag)); 
        if (ugli) {
            ret = ret.pipe(uglify()); 
        }
        return  ret.pipe(gulp.dest("spPropertyBag")); 
}); 

gulp.task("compile-chrome-files", function (ugli) {
    var ret = tsProject.src()
        .pipe(ts(tsProject)); 
         if (ugli) {
            ret = ret.pipe(uglify()); 
        }
        return  ret.pipe(rename( {dirname:''})).pipe(gulp.dest("dist/scripts")); 
}); 

gulp.task("default", ["copy-images", "copy-rootFolderFiles", "build-sppropertyBagFile", "compile-chrome-files"], function(ugli) {}); 