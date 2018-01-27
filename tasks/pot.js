var gulp = require('gulp');
var wpPot = require('gulp-wp-pot');

gulp.task('translate', function () {
  return gulp.src('src/*.php')
  .pipe(wpPot( {
    domain: 'adler',
    package: 'Adler'
  } ))
  .pipe(gulp.dest('file.pot'));
});