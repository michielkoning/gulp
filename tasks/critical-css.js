/* eslint-disable import/no-extraneous-dependencies */

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const inject = require('gulp-inject');
const config = require('../config');
const bowerFiles = require('main-bower-files');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const del = require('del');
const runSequence = require('run-sequence');

gulp.task('critical-delete', () =>  {
  return del([
      config.critical.temp,
      config.critical.dest + 'critical.twig',
    ], {
    force: true
  });
});

gulp.task('critical-css', () =>  {
  return gulp.src(config.critical.src)
    .pipe(plumber())
    .pipe(sass().on('error', (err) => {
      notify().write(err);
    }))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(csso())
    .pipe(gulp.dest(config.critical.temp));
});

gulp.task('critical-js', () =>  {
  return gulp.src(bowerFiles()[0])
    .pipe(uglify())
    .pipe(gulp.dest(config.critical.temp));
});

gulp.task('critical-template', () =>  {

  const injectConfig = {
    removeTags: true,
    transform: function(filePath, file) {
      return file.contents.toString();
    },
  };

  return gulp.src(config.critical.template)
    .pipe(inject(gulp.src(config.critical.temp + 'critical.css'), injectConfig))
    .pipe(inject(gulp.src(config.critical.temp + 'loadCSS.js'), injectConfig))
    .pipe(rename(function (path){
      path.extname = '.twig';
    }))
    .pipe(gulp.dest(config.critical.dest));
});


gulp.task('critical', function(callback) {
  runSequence(
    'critical-delete',
    [
      'critical-css',
      'critical-js',
    ],
    'critical-template',
    callback,
  );
});