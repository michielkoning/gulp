const gulp = require('gulp');
const config = require('../config').fonts;

/**
 * Copy images to build folder
 * if not changed
 */
gulp.task('fonts', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});
