const gulp = require('gulp');
const path = require('path');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const inject = require('gulp-inject');
const rename = require('gulp-rename');
const config = require('../config').svg;
const colors = require('colors');

gulp.task('svg', function() {
  const svgs = gulp.src(config.icons).pipe(svgmin(function(file) {
    const prefix = path.basename(file.relative, path.extname(file.relative));
    console.log(`${colors.green('✔')} ${prefix}`);
    return {
      plugins: [{
        cleanupIDs: {
          prefix: prefix + '-',
          minify: true,
        },
        removeTitle: true,
      }],
    };
  })).pipe(rename({
    prefix: 'icon-',
  })).pipe(svgstore({
    inlineSvg: true
  }));

  return gulp.src('./src/icons/template/icons.php').pipe(inject(svgs, {
    removeTags: true,
    transform: function(filePath, file) {
      return file.contents.toString();
    }
  })).pipe(gulp.dest('./partials'));
});