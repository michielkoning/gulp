const gulp = require('gulp');
const config = require('../config').images;
const imagemin = require('gulp-imagemin');

/**
 * Copy images to build folder
 * if not changed
 */
gulp.task('images', function() {
  return gulp.src(config.src)
    .pipe(imagemin({
      optimizationLevel: 3,
      progessive: true,
      interlaced: true,
    }))
    .pipe(gulp.dest(config.dest));
});
