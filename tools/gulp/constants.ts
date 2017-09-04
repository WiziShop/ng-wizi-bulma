import {join} from 'path';

export const MODULE_VERSION = require('../../package.json').version;

export const PROJECT_ROOT = join(__dirname, '../..');
export const SOURCE_ROOT = join(PROJECT_ROOT, 'src');

export const DIST_ROOT = join(PROJECT_ROOT, 'dist');
export const DIST_COMPONENTS_ROOT = join(DIST_ROOT, 'ng-wizi-bulma');


export const HTML_MINIFIER_OPTIONS = {
  collapseWhitespace: true,
  removeComments: true,
  caseSensitive: true,
  removeAttributeQuotes: false
};

export const LICENSE_BANNER = `/**
  * @license WiziShop v${MODULE_VERSION}
  * License: MIT
  */`;

export const NPM_VENDOR_FILES = [
  '@angular', 'core-js/client',  'rxjs', 'systemjs/dist',
  'zone.js/dist', 'web-animations-js',
];

export const COMPONENTS_DIR = join(SOURCE_ROOT, 'lib');
