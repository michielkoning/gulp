const gulp = require('gulp');
const fs = require('fs');
const config = require('../config');

gulp.task('manifaaest', function(){

  const manifest = {
    lang: config.lang,
    short_name: config.theme.shortName,
    name: config.theme.name,
    description: config.theme.description,
    start_url: '/',
    display: 'browser',
    background_color: '#f9f9f9',
    theme_color: config.color,
    icons: [
    ],
  };

  const icons = ['144', '192', '512'];

  function createIcon(size) {
    manifest.icons.push({
      src: `${config.iconsPath}android-chrome-${size}x${size}.png`,
      sizes: `${size}x${size}`,
      type: 'image/png',
    });
  }

  icons.forEach(icon => createIcon(icon));

  dest = `${config.favicons.dest}manifest.json`;

  fs.writeFileSync(dest, JSON.stringify(manifest));
});
