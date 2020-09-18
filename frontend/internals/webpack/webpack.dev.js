const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const publicPath = '/journey/';

module.exports = require('./webpack.base')({
  mode: 'development',
  entry: [
    require.resolve('react-app-polyfill/ie11'),
    'webpack-hot-middleware/client?reload=true',
    path.join(process.cwd(), 'app/index.js'),
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'app/index.html',
    }),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/, // exclude node_modules
      failOnError: false, // show a warning when there is a circular dependency
    }),
  ],
  devtool: 'cheap-source-map',
  performance: {
    hints: false,
  },
});
