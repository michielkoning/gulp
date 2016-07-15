var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');

// SASS
gulp.task('sass', function () {
  return gulp.src([
      'dev/pages/pdp.scss',
      'dev/pages/pdp-mobile.scss',
      'dev/pages/pdp-debug.scss'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))

    // .pipe(minifyCSS())
    .pipe(
      rename(
        {
          suffix: '.min',
        }
      )
    )
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

// default gulp task
gulp.task('default', ['sass']);

// gulp watch taks
gulp.task('watch', function () {

  browserSync.init({
    proxy: 'localhost/pdp_frontend',
    port: 8080,
    open: false,
    notify: false,
    // injectChanges: false,
  });

  // Watch PHP files and Sass files
  gulp.watch([
    '*.php',
    'includes/*.php',
    'dev/**/*.scss',
    'js/jclasses/dev/**/*.js',
    ],
    [
      'sass',
    ]
  ).on('change', browserSync.reload);

  // Watch JS files and Sass files
  // gulp.watch(['../../../../../../../Users/dbraakman/Documents/webshop/application/webshop/j2ee-apps/frontend.ear/frontend.war/static/js/jclasses/dev/**/*.js'], ['js']);
  // gulp.watch(['../../../../../../../Users/dbraakman/Documents/Development/wsp-rnwy-productpage/src/main/resources/wsp_rnwy_productpage/components/productpage/content/**/*.template'], ['js']);
});
