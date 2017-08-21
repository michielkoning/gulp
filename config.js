const theme = require('./theme.json');
const pkg = require('./../package.json');
const siteDetails = Object.assign(theme, pkg);

const src = './';
const root = './../';
const assets = `${root}assets/`;
const assetsUrl = `${theme.liveUrl}wp-content/themes/${theme.theme}/assets/`;

const icons = siteDetails.defaultIcons.map(function(icon) {
  return `${src}icons/defaults/${icon}.svg`;
});
icons.push(`${src}icons/theme/*.svg`);
icons.push( `${src}images/logo.svg`);

module.exports = {
  theme: siteDetails,
  browsersync: {
    development: {
      proxy: theme.url,
      open: false,
      port: 9999,
      files: [
        `${assets}scripts/**/*.js`,
        `${root}style.css`,
        `${root}**/*.php`,
        `${root}views/**/*.twig`,
      ],
    },
  },
  delete: {
    src: assets,
  },
  scripts: {
    src: [
      `${src}scripts/theme/functions.js`,
    ],
    webpackEntry: {
      functions: `${src}scripts/theme/functions.js`,
    },
    dest: `${assets}scripts`,
  },
  sass: {
    src: `${src}sass/style.scss`,
    dest: root,
    options: {
      noCache: true,
      compass: false,
      bundleExec: true,
      sourcemap: true,
    },
    critical: {
      src: `${src}sass/critical.scss`,
      template: `${src}templates/critical.php`,
      dest: `${assets}css`,
    },
    autoprefixer: {
      browsers: ['last 2 versions'],
      cascade: false,
      flexbox: 'no-2009',
    },
  },
  sourcemaps: {
    includeContent: false,
    sourceRoot: `${src}scss`,
  },
  images: {
    src: `${src}images/**/*`,
    dest: `${assets}images`,
  },
  svg: {
    template: `${src}templates/icons.html`,
    dest: `${root}views/partials/`,
    icons,
  },
  favicons: {
    icon: `${src}favicons/favicon.png`,
    jsonFile: `${src}favicons/faviconData.json`,
    dest: `${assets}favicons/`,
    path: `${assetsUrl}favicons/`,
    colorWindows: siteDetails.color,
    templateSrc: `${src}templates/favicons.html`,
    templateDest: `${root}views/partials/`,
  },
  watch: {
    scripts: `${src}scripts/**/*.js`,
    sass: `${src}sass/**/*.s+(a|c)ss`,
    svg: `${src}icons/theme/*.svg`,
  },
  manifest: {
    lang: 'nl',
  },
  rsync: {
    src: [
      './*.php',
      './partials/*.php',
      'style.css',
      'assets/**',
    ],
    options: {
      destination: '/var/www/wordpress/public_html/wp-content/themes/haarlembijdeles/',
      root: './',
      hostname: '136.144.129.215',
      username: 'michiel',
      port: 22,
      incremental: false,
      progress: true,
      relative: true,
      emptyDirectories: true,
      recursive: true,
      clean: true,
      include: [],
    },
  },
};
