require('./global');

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jasmine = require('gulp-jasmine');
var asyncPipe = require('gulp-async-func-runner');

gulp.task('utests', () => {
  gulp
    .src('tests/unit/**')
    .pipe(jasmine());
});

gulp.task('itests', () => {
  gulp
    .src('tests/integration/**')
    .pipe(jasmine());
});

gulp.task('tests', ['utests', 'itests']);

gulp.task('default', []);
