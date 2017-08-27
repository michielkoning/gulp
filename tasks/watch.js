const gulp = require('gulp');
const config = require('../config').watch;

/**
 * Start browsersync task and then watch files for changes
 */
gulp.task('watch', ['browser-sync'], () => {
  gulp.watch(config.sass, ['sass', 'critical']);
  gulp.watch(config.svg, ['svg']);
  gulp.watch(config.scripts, ['scripts']);
});
