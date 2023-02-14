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
      scss: path.resolve(__dirname, 'src/scss/'),
      img: path.resolve(__dirname, 'img/'),
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
      // {
      //   test: /\.scss$/,
      //   use: ["style-loader", "css-loader", "sass-loader"]
      // },
    ],
  },
};