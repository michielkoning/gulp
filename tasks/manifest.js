const gulp = require('gulp');
const fs = require('fs');
const config = require('../config').manifest;

gulp.task('manifest', function(){

  const manifest = {
    lang: config.lang,
    short_name: config.shortName,
    name: config.name,
    description: config.description,
    start_url: '/',
    display: 'browser',
    background_color: '#f9f9f9',
    theme_color: config.color,
    icons: [
    ],
  };

  const icons = ['144', '192'];

  function createIcon(size) {
    manifest.icons.push({
      src: `${config.iconsPath}android-chrome-${size}x${size}.png`,
      sizes: `${size}x${size}`,
      type: 'image/png',
    });
  }

  icons.forEach(icon => createIcon(icon));

  fs.writeFileSync('./assets/manifest.json', JSON.stringify(manifest));
});
