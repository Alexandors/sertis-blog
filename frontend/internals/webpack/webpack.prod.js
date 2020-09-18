const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HashedModuleIdsPlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const publicPath = '/journey/';

module.exports = require('./webpack.base')({
  mode: 'production',
  entry: [require.resolve('react-app-polyfill/ie11'), path.join(process.cwd(), 'app/index.js')],
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    publicPath,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.m?js$/,
        terserOptions: {
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          parse: { ecma: 8 },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        extractComments: false,
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/,
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      }),
    ],
    removeAvailableModules: true,
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      name: true,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: false,
    }),
    new CompressionPlugin({
      test: /\.(js|css|html)$/,
    }),
    new HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),
    new ManifestPlugin({
      fileName: 'assets.json',
    }),
  ],
  performance: {
    assetFilter: assetFilename => !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
});
