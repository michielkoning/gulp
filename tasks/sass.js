/* eslint-disable import/no-extraneous-dependencies */

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const util = require('gulp-util');
const csso = require('gulp-csso');
const size = require('gulp-size');
const notify = require('gulp-notify');
const combineMq = require('gulp-combine-mq');
const banner = require('gulp-banner');
const inject = require('gulp-inject');
const config = require('../config');

const comment = `/*
Theme Name: <%= config.theme.name %>
Theme URI: <%= config.theme.homepage %>
Author: <%= config.theme.author.name %>
Author URI: <%= config.theme.author.url %>
Description: <%= config.theme.description %>
Version: <%= config.theme.version %>
License: <%= config.theme.license %>
*/`;

const isProduction = !!util.env.production;

gulp.task('sass', () => {
  console.log(isProduction);
  return gulp.src(config.sass.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', (err) => {
      notify().write(err);
    }))
    .pipe(autoprefixer(config.sass.autoprefixer))
    .pipe(isProduction ? combineMq() : util.noop())
    .pipe(isProduction ? csso() : util.noop())
    .pipe(banner(comment, {
      config,
    }))
    .pipe(!isProduction ? sourcemaps.write() : util.noop())
    .pipe(gulp.dest(config.sass.dest))
    .pipe(size())
    .pipe(notify({ message: 'Styles task complete' }));
});
