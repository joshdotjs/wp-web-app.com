const path = require('path');

// Import the original config from @wordpress/scripts package.
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

console.log('__dirname', __dirname);

// Add a new entry point by extending the webpack config.
module.exports = {
  ...defaultConfig,
  resolve: {
    ...defaultConfig.resolve,
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      util: path.resolve(__dirname, 'src/util/'),
      scss: path.resolve(__dirname, 'src/scss/'),
      img: path.resolve(__dirname, '../../uploads/img/'),
      comps: path.resolve(__dirname, 'src/-comps/'),
      pages: path.resolve(__dirname, 'src/-pages/'),
    },
  },
  module: {
    ...defaultConfig.module,
    rules: [
      ...defaultConfig.module.rules,
      {
        test: /\.(jpg|png|webp)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
};