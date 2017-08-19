const theme = require('./theme.json');
const pkg = require('../package.json');
const siteDetails = Object.assign(theme, pkg);

const src = './src/';
const assets = './assets/';
const srcIcons = `${src}icons/`;
const assetsUrl = `${theme.liveUrl}wp-content/themes/${theme.theme}/assets/`;

module.exports = {
  theme: siteDetails,
  browsersync: {
    development: {
      proxy: theme.url,
      open: false,
      port: 9999,
      files: [
        `${assets}scripts/**/*.js`,
        './style.css',
        './**/*.php',
        './**/*.twig',
      ],
    },
  },
  delete: {
    src: assets,
  },
  scripts: {
    src: [
      `${src}scripts/functions.js`,
      `${src}scripts/contact.js`,
      `${src}scripts/sticky-nav.js`,
    ],
    webpackEntry: {
      functions: `${src}scripts/functions.js`,
      contact: `${src}scripts/contact.js`,
      'sticky-nav': `${src}scripts/sticky-nav.js`,
    },
    dest: `${assets}scripts`,
  },
  sass: {
    src: `${src}sass/style.scss`,
    dest: './',
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
  },
  autoprefixer: {
    browsers: ['last 2 versions'],
    cascade: false,
    flexbox: 'no-2009',
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
    template: `${src}templates/icons.php`,
    icons: [
      `${srcIcons}*.svg`,
      `${src}images/logo.svg`,
    ],
  },
  favicons: {
    icon: `${src}images/logo.svg`,
    jsonFile: `${src}favicons/faviconData.json`,
    dest: `${src}images/favicons/`,
    path: `${assetsUrl}images/favicons/`,
    colorWindows: siteDetails.color,
    templateSrc: `${src}templates/favicons.php`,
    templateDest: './partials',
  },
  watch: {
    scripts: `${src}scripts/**/*.js`,
    sass: `${src}sass/**/*.s+(a|c)ss`,
    svg: `${srcIcons}/**/*.svg`,
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
