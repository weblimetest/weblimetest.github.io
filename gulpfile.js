'use strict';

 // gulp plugins
var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    concat       = require('gulp-concat'),
    cleanCSS     = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    sourceMaps   = require('gulp-sourcemaps'),
    gulpif       = require('gulp-if'),
    clean        = require('gulp-clean'),
    browserSync  = require('browser-sync').create(),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    uglify       = require('gulp-uglifyjs'),
    rename       = require('gulp-rename'),
    cache        = require('gulp-cache'),
    rigger       = require('gulp-rigger');
// ENVIRONMENT
// var ENV = process.env.NODE_ENV || 'production';
var ENV            = 'dev',
    reload         = browserSync.reload,
    serverSettings = {
        server: {
            baseDir: "./dest"
        },
        notify: false,
        port: 9000,
        open: false,
    };
//objects
var path = {
    app: { 
        html: 'app/*.html', 
        js: 'app/js/main.js',
        css: 'app/css/*.css',
        sass: 'app/sass/*.scss',
        img: 'app/img/**/*.*', 
    },    
    dest: { 
        html: 'dest',
        js: 'dest/js',
        css: 'dest/css',
        img: 'dest/img',
    },
    watch: { 
        html: 'app/*.html',
        js: 'app/js/*.js',
        sass: 'app/sass/**/*.scss',
        img: 'app/img/**/*.*',
    },
    clean: 'dest',
};

// ******************************* TASKS ********************************************
// Default task
 gulp.task('default', ()=> {
    ENV = 'production';
    gulp.start([ 
        'build' 
    ]);
}); 

// HTML building task
gulp.task('buildHtml', ()=> {
        gulp.src(path.app.html)
        .pipe(gulp.dest(path.dest.html))
        .pipe(reload({stream: true})); 
});
// CSS building task
gulp.task('buildCss', ()=> {
    gulp.src(path.app.sass) 
        .pipe(gulpif(ENV != 'production', sourceMaps.init())) 
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['last 4 versions'], cascade: false})) 
        .pipe(cleanCSS()) 
        .pipe(gulpif(ENV != 'production', sourceMaps.write()))
        .pipe(gulp.dest(path.dest.css))
        .pipe(reload({stream: true}));  
});
// JS building task
gulp.task('buildJs', ()=> {
    gulp.src(path.app.js) 
        .pipe(rigger()) 
        .pipe(gulpif(ENV != 'production', sourceMaps.init())) 
        .pipe(uglify()) 
        .pipe(gulpif(ENV != 'production', sourceMaps.write()))
        .pipe(gulp.dest(path.dest.js)) 
        .pipe(reload({stream: true})); 
});

// Images building task
 gulp.task('buildImage', ()=> {
    gulp.src(path.app.img) 
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        })))
        .pipe(gulp.dest(path.dest.img)) 
        .pipe(reload({stream: true})); 
}); 

// Destination folder clearance task
gulp.task('clean', ()=> {
    gulp.src('dest/*', {read: false})
         .pipe(clean());
});
// Server initialization task
gulp.task('server', ()=> {
    browserSync.init(serverSettings);
});
    
//Project building task
gulp.task('build', ['buildHtml', 'buildCss', 'buildJs','buildImage']);

// Autorun task
gulp.task('watch', ()=> {
    gulp.watch(path.watch.html, ['buildHtml']);
    gulp.watch(path.watch.sass, ['buildCss']);
    gulp.watch(path.watch.js, ['buildJs']);
    gulp.watch(path.watch.js, ['buildImage']);
});
 
        
