var gulp = require('gulp');

var jasmine = require('gulp-jasmine');

gulp.task('utests', () => {
  gulp
    .src('tests/unit/**')
    .pipe(jasmine());
});

gulp.task('itests', () => {

});

gulp.task('tests', ['utests', 'itests']);

gulp.task('default', []);
