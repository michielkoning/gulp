const gulp = require('gulp');
const fs = require('fs');
const realFavicon = require('gulp-real-favicon');
const config = require('../config');
const runSequence = require('run-sequence');
const rename = require('gulp-rename');
const del = require('del');

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).\

gulp.task('favicons', function(callback) {
  runSequence(
    'delete-favicons',
    'generate-favicons',
    'move-favicons',
    'inject-favicon-markups',
    'generate-manifest',
    callback,
  );
});

gulp.task('delete-favicons', () =>  {
  return del([
      config.favicons.temp,
      config.favicons.dest
    ], {
    force: true,
  });
});

gulp.task('generate-favicons', function (done) {
  realFavicon.generateFavicon({
    masterPicture: config.favicons.icon,
    dest: config.favicons.temp,
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
          name: config.theme.name,
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

gulp.task('move-favicons', () => {
  return gulp.src(config.favicons.files)
    .pipe(gulp.dest(config.favicons.dest));
});

gulp.task('generate-manifest', function(){

  const manifest = {
    lang: config.theme.lang,
    short_name: config.theme.shortName,
    name: config.theme.name,
    description: config.theme.description,
    start_url: '/',
    display: 'browser',
    developer: config.theme.author,
    manifest_version: "1",
    version: "1",
    background_color: '#f9f9f9',
    theme_color: config.theme.color,
    icons: [
    ],
  };

  const icons = ['144', '192', '512'];

  function createIcon(size) {
    manifest.icons.push({
      src: `${config.favicons.path}android-chrome-${size}x${size}.png`,
      sizes: `${size}x${size}`,
      type: 'image/png',
    });
  }

  icons.forEach(icon => createIcon(icon));

  dest = `${config.favicons.dest}manifest.json`;

  fs.writeFileSync(dest, JSON.stringify(manifest));
});


// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function() {
  return gulp.src(config.favicons.templateSrc)
    .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(config.favicons.jsonFile)).favicon.html_code))
    .pipe(rename(function (path){
      path.extname = '.twig';
    }))
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