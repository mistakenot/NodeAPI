var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jasmine = require('gulp-jasmine');

gulp.task('start-serve', resolve => {
  resolve();
});

gulp.task('stop-serve', resolve => {

});

gulp.task('itests-run', ['start-serve'], resolve => {
  gulp
    .src('tests/integration/**')
    .pipe(jasmine());
});

gulp.task('stop-serve-itests', ['itests-run', 'stop-serve']);

gulp.task('utests', () => {
  gulp
    .src('tests/unit/**')
    .pipe(jasmine());
});

gulp.task('itests', ['stop-serve-itests'], () => {

});

gulp.task('tests', ['utests', 'itests']);

gulp.task('default', []);
