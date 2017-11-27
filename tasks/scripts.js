// gulpfile.js
const gulp = require('gulp');
const webpack = require('webpack-stream');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const size = require('gulp-size');
const plumber = require('gulp-plumber');
const util = require('gulp-util');
const config = require('../config').scripts;

const isProduction = !!util.env.production;

gulp.task('scripts', function() {
   return gulp.src(config.src)
      .pipe(plumber())
      .pipe(webpack({
          entry: config.webpackEntry,
           output: {
             filename: '[name].js',
           },
           devtool: '#inline-source-map',
            module: {
              rules: [
                {
                  test: /\.js$/,
                  exclude: [
                    'gulpfile.js',
                    /gulp/,
                    /node_modules/,
                    /bower_components/,
                  ],
                  use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['es2015']
                    }
                  }
                }
              ]
            }
        }
      ))
      .pipe(!isProduction ? sourcemaps.init({ loadMaps: true }) : util.noop())
      .pipe(isProduction ? uglify() : util.noop())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(config.dest))
      .pipe(size());
});
