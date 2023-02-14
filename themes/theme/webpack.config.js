const path = require('path');

// Import the original config from @wordpress/scripts package.
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

console.log('__dirname', __dirname);

// Add a new entry point by extending the webpack config.
module.exports = {
  ...defaultConfig,
  // entry: {
  //   bundle: './src/index.js'
  // },
  resolve: {
    ...defaultConfig.resolve,
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      util: path.resolve(__dirname, 'src/util/'),
      // scss: path.resolve(__dirname, 'src/scss/'),
    },
  },
};