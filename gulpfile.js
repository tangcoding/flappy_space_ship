var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var livereload = require('gulp-livereload');

// JavaScript linting task
gulp.task('jshint', function() {
  return gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Watch task
gulp.task('watch', function() {
  gulp.watch('./js/*.js', ['jshint']);
  // gulp.watch('site/scss/*.scss', ['sass']);
});


// Minify index
gulp.task('html', function() {
  return gulp.src('./index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('build/'));
});

// JavaScript build task, removes whitespace and concatenates all files
gulp.task('scripts', function() {
  return browserify('./js/main.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

// Styles build task, concatenates all the files
gulp.task('styles', function() {
  return gulp.src('./css/*.css')
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('build/css'));
});

// Image optimization task
gulp.task('images', function() {
  return gulp.src('./img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
});

// liveload
gulp.task('refresh', function() {
  livereload.reload();
});



// Watch task
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./css/**', ['styles']);
  gulp.watch('./*.html', ['html']);
  gulp.watch(['./js/**', './*.js'], ['scripts']);
  gulp.watch(['./css/**', './*.html', './js/**', './*.js']).on('change', livereload.changed);
  // gulp.watch('./scss/*.scss', ['sass']);
});

// Default task
// gulp.task('default', ['jshint',  'watch']);
gulp.task('default', ['build', 'watch']);

// Build task
gulp.task('build', ['jshint',  'html', 'scripts', 'styles', 'images']);