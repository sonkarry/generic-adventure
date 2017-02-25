var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var concat = require('gulp-concat');
var concatcss = require('gulp-concat-css');
var connect = require('gulp-connect');
var watch = require('gulp-watch');

gulp.task('default', ['webserver', 'livereload', 'watch']);

gulp.task('webserver', function() {
    connect.server({
        livereload: true
    });
});

gulp.task('livereload', function() {
    gulp.src([
        './app/all.css',
        './app/all.js'
    ])
        .pipe(watch('./app/all.css'))
        .pipe(watch('./app/all.js'))
        .pipe(watch('./app/*.html'))
        .pipe(connect.reload());
});


gulp.task('js', function() {
    gulp.src([
        '!./app/scripts/all.js',
        './app/scripts/*.js'
    ])
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./app'));
});

gulp.task('css', function() {
    gulp.src([
        '!./app/styles/all.css',
        './app/styles/*.css'
    ])
        .pipe(uglifycss())
        .pipe(concatcss('all.css'))
        .pipe(gulp.dest('./app'));
});

gulp.task('watch', function() {
    var watcher = gulp.watch([
        './app/*.html',
        './app/styles/*.css',
        './app/scripts/*.js',
    ]);
    watcher.on('change', function (event) {
        console.log('Event type: ' + event.type + ': ' + event.path); // added, changed, or deleted
    });

    gulp.watch(['./app/styles/*.css'], ['css']);
    gulp.watch(['./app/scripts/*.js'], ['js']);
});

