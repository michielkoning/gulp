const theme = require('./../theme.json');
const pkg = require('./../package.json');
const siteDetails = Object.assign(theme, pkg);

const src = './';
const root = './../';
const temp = `${src}temp/`;
const assets = `${root}assets/`;
const assetsUrl = `/wp-content/themes/${theme.theme}/assets/`;

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
      `${src}scripts/theme/contact.js`,
      `${src}scripts/theme/sticky-nav.js`,
    ],
    webpackEntry: {
      functions: `${src}scripts/theme/functions.js`,
      contact: `${src}scripts/theme/contact.js`,
      'sticky-nav': `${src}scripts/theme/sticky-nav.js`,
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
  },
  autoprefixer: {
    browsers: ['last 2 versions'],
    cascade: false,
    flexbox: 'no-2009',
  },
  critical: {
    src: `${src}sass/critical.scss`,
    template: `${src}templates/critical.html`,
    temp,
    dest: `${root}views/partials/`,
  },
  sourcemaps: {
    includeContent: false,
    sourceRoot: `${src}scss`,
  },
  images: {
    src: `${src}images/**/*`,
    dest: `${assets}images`,
  },
  fonts: {
    src: `${src}fonts/**/*`,
    dest: `${assets}fonts`,
  },
  svg: {
    template: `${src}templates/icons.html`,
    dest: `${root}views/partials/`,
    icons,
  },
  favicons: {
    icon: `${src}favicons/favicon.svg`,
    jsonFile: `${temp}favicons/faviconData.json`,
    temp: `${temp}favicons/`,
    dest: `${assets}favicons/`,
    path: `${assetsUrl}favicons/`,
    colorWindows: siteDetails.color,
    templateSrc: `${src}templates/favicons.html`,
    templateDest: `${root}views/partials/`,
    files: `${temp}favicons/*.+(png|svg|ico|xml)`,
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
