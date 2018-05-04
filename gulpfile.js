'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var stripCssComments = require('gulp-strip-css-comments');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');
var gulpIf = require('gulp-if');
var concat = require('gulp-concat');

gulp.task('styles', function() {
  gulp.src('app/public/assets/sass/main.scss')
  .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
    }))
  .pipe(stripCssComments({preserve: false})) //preserve: false strips all comments including '/*!' important
  .pipe(cssmin())
  .pipe(rename({suffix: '.min'}))
  // where compiled CSS will be spat out
  .pipe(gulp.dest('app/public/src/css'))
});

gulp.task('scripts', function() {
    return gulp.src('app/public/assets/js/*.js')
      .pipe(concat('main.min.js'))
      .pipe(gulpIf('*.js', uglify()))
      .pipe(gulp.dest('app/public/src/js'));
  });
  
// If you don't use the scripts folder just remove it from the task array
gulp.task('default', ['styles, 'scripts']);


