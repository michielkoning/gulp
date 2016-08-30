var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// SASS
gulp.task('sass', function () {
  return gulp.src([
      'sass/style.scss'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
      flexbox: 'no-2009',
    }))

    .pipe(cleanCSS({
        keepSpecialComments: false,
      }
    ))
    .pipe(gulp.dest('../css'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return gulp.src(['scripts/_*.js', 'scripts/*.js'])
    .pipe(concat('functions.js'))
    .pipe(uglify())
    .pipe(gulp.dest('../scripts'));
});

// default gulp task
gulp.task('default', ['sass', 'scripts']);

// gulp watch taks
gulp.task('watch', function () {

  browserSync.init({
    proxy: 'localhost/kompas/www',
    port: 8080,
    open: false,
    notify: false,
    // injectChanges: false,
  });

  // Watch PHP files and Sass files
  gulp.watch([
    'sass/*.scss',
    'sass/**/*.scss',
    'scripts/*.js',
    '../../*.php',
    ],
    [
      'sass',
      'scripts',
    ]
  ).on('change', browserSync.reload);
});
