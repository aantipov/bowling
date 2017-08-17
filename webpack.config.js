// Modules
const path = module.require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
const ENV = process.env.npm_lifecycle_event;

const isProd = ENV === 'build';
const isTest = ENV === 'test';

module.exports = (function makeWebpackConfig() {
  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  const config = {};

  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   * Should be an empty object if it's generating a test build
   * Karma will set this when it's a test build
   */
  config.entry = isTest
    ? undefined
    : {
        app: ['./src/app.module.js'],
      };

  if (isProd) {
    config.entry.vendor = ['babel-polyfill', 'angular', 'angular-animate', 'bulma/css/bulma.css'];
  }

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   * Should be an empty object if it's generating a test build
   * Karma will handle setting it up for you when it's a test build
   */
  config.output = isTest
    ? {}
    : {
        // Absolute output directory
        path: __dirname + '/dist',

        // Output path from the view of the page
        // Uses webpack-dev-server in development
        publicPath: isProd ? '/' : 'http://localhost:8080/',

        // Filename for entry points
        // Only adds hash in build mode
        filename: isProd ? '[name].[hash].js' : '[name].js',

        // Filename for non-entry points
        // Only adds hash in build mode
        chunkFilename: isProd ? '[name].[hash].js' : '[name].js',
      };

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  if (isTest) {
    config.devtool = 'inline-source-map';
  } else if (isProd) {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'eval-source-map';
  }

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */

  // Initialize module
  config.module = {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
        exclude: [/node_modules/, /vendor/],
      },
      {
        test: /\.scss$/,
        loader: isTest
          ? 'null-loader'
          : ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader'],
            }),
      },
      {
        test: /\.css$/,
        loader: isTest
          ? 'null-loader'
          : ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader'],
            }),
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'ngtemplate-loader',
            options: {
              relativeTo: path.resolve(__dirname, './src'),
            },
          },
          'html-loader',
        ],
        exclude: /index.html$/,
      },
    ],
  };

  // ISTANBUL LOADER
  // https://github.com/deepsweet/istanbul-instrumenter-loader
  // Instrument JS files with istanbul-lib-instrument for subsequent code coverage reporting
  // Skips node_modules and files that end with .spec.js
  if (isTest) {
    config.module.rules.push({
      enforce: 'pre',
      test: /\.js$/,
      exclude: [/node_modules/, /\.spec\.js$/, /vendor/,],
      loader: 'istanbul-instrumenter-loader',
      query: {
        esModules: true,
      },
    });
  }

  config.plugins = [];

  config.plugins.push(
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),
    // Reference: https://github.com/webpack/extract-text-webpack-plugin
    // Extract css files
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css',
      disable: !isProd,
      allChunks: true,
    })
  );

  if (isProd) {
    config.plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
      })
    );
  }

  // Add build specific plugins
  if (isProd) {
    config.plugins.push(
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin()
    );
  }

  return config;
})();
