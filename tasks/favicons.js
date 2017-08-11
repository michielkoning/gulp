const gulp = require('gulp');
const fs = require('fs');
const realFavicon = require('gulp-real-favicon');
const config = require('../config');
const runSequence = require('run-sequence');
// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).\

gulp.task('favicons', function(callback) {
  runSequence(
    [
      'generate-favicons',
      'inject-favicon-markups',
    ],
    callback,
  );
});

gulp.task('generate-favicons', function (done) {
  realFavicon.generateFavicon({
    masterPicture: config.favicons.icon,
    dest: config.favicons.dest,
    iconsPath: config.favicons.path,
    design: {
      ios: {
        pictureAspect: 'noChange',
        assets: {
          ios6AndPriorIcons: false,
          ios7AndLaterIcons: true,
          precomposedIcons: false,
          declareOnlyDefaultIcon: true,
        },
        appName: config.theme.name,
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'noChange',
        backgroundColor: config.favicons.colorWindows,
        onConflict: 'override',
        assets: {
          windows80Ie10Tile: false,
          windows10Ie11EdgeTiles: {
            small: false,
            medium: true,
            big: false,
            rectangle: false,
          },
        },
        appName: config.theme.name,
      },
      androidChrome: {
        pictureAspect: 'noChange',
        themeColor: config.theme.color,
        manifest: {
          name: 'Haarlem bij de les',
          display: 'browser',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true,
        },
        assets: {
          legacyIcon: false,
          lowResolutionIcons: true,
        },
      },
      safariPinnedTab: {
        pictureAspect: 'blackAndWhite',
        threshold: 50.78125,
        themeColor: config.theme.color,
      },
    },
    settings: {
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false,
    },
    markupFile: config.favicons.jsonFile,
  }, function() {
    done();
  });
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function() {
  return gulp.src(config.favicons.templateSrc)
    .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(config.favicons.jsonFile)).favicon.html_code))
    .pipe(gulp.dest(config.favicons.templateDest));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
  var currentVersion = JSON.parse(fs.readFileSync(config.favicons.jsonFile)).version;
  realFavicon.checkForUpdates(currentVersion, function(err) {
    if (err) {
      throw err;
    }
  });
});