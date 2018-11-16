const bundleScss = require('bundle-scss');
const colors = require('colors');

function ScssBundlePlugin(options) {
  options.paths.forEach(v => {
    const bundle = async () => {
      await bundleScss(options.glob, v, options.scss);
    };
    bundle().then(() => {
      console.log(colors.green('Main scss prepared with success.' + colors.rainbow("It's time to be beautiful !")));
    });
  });
}

new ScssBundlePlugin({
  glob: './projects/ng-wizi-bulma/src/**/*.scss',
  paths: ['./dist/@wizishop/ng-wizi-bulma/ng-wizi-bulma.scss'],
  scss: ['colors']
});
