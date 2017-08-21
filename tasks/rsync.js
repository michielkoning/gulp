const gulp = require('gulp');
const rsync = require('gulp-rsync');
const config = require('../config').rsync;

/**
 * Copy files and folder to server
 * via rsync
 */
gulp.task('rsync', function() {
  return gulp.src(config.src)
    .pipe(rsync(config.options));
});
