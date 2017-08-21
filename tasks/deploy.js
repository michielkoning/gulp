const gulp = require('gulp');
const runSequence = require('run-sequence');

/**
 * Run all tasks needed for a build in defined order
 */
gulp.task('deploy', function(callback) {
  runSequence(
    'delete',
    [
      'sass',
      'svg',
      'scripts',
      'images',
    ],
    [
      'generate-favicons',
      'inject-favicon-markups',
    ],
    'rsync',
    callback,
  );
});
