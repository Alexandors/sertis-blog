const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const publicPath = '/journey/';
const appPath = path.resolve(__dirname, '../../app');
const isAnalyze = process.env.ANALYZE === 'true';
const isDEV = process.env.NODE_ENV === 'development';

const plugins = [
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
    chunkFilename: '[name].[contenthash].css',
    ignoreOrder: false,
  }),
  new CopyPlugin([
    { from: 'app/styles/app/fonts/S6uyw4BMUTPHjx4wXiWtFCc.woff2' },
    { from: 'app/styles/app/fonts/S6u9w4BMUTPHh6UVSwiPGQ3q5d0.woff2' },
  ]),
  new webpack.EnvironmentPlugin({
    NODE_ENV: 'development',
  }),
  isAnalyze
    && new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8889,
      reportFilename: 'report.html',
      defaultSizes: 'parsed',
      openAnalyzer: true,
      generateStatsFile: true,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'info',
    }),
  new WorkboxPlugin.InjectManifest({
    swSrc: path.join(appPath, 'sw.js'),
    swDest: 'sw.js',
    include: [
      /\.(html|m?js|ico|woff2?|css|png|jpe?g|gif|svg)$/,
      /manifest.*\.json$/,
    ],
    exclude: [
      /intl/,
      /\.bin/,
      /(icon_(57|72|76|114|120|152|180|384|512|1024)x|splash).*\.png$/,
    ],
  }),
].filter(Boolean);

module.exports = (options) => ({
  mode: options.mode,
  entry: options.entry,
  output: {
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
    ...options.output,
  },
  optimization: options.optimization,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [
          /node_modules/,
          path.resolve(process.cwd(), '../bluecrystalwebnpm/tools/dist'),
        ],
        use: {
          loader: 'babel-loader',
          options: options.babelQuery,
        },
      },
      {
        test: /\.s?css$/,
        exclude: /module\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDEV,
              reloadAll: true,
            },
          },
          {
            loader: 'css-loader',
            options: { importLoaders: 3 },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009',
                  },
                  stage: 3,
                }),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [appPath],
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(appPath, './styles/scss/variables.scss'),
                path.resolve(appPath, './styles/scss/mixins.scss'),
              ],
            },
          },
        ],
      },
      {
        test: /module\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDEV,
              reloadAll: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3,
              modules: true,
              getLocalIdent: getCSSModuleLocalIdent,
              camelCase: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009',
                  },
                  stage: 3,
                }),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [appPath],
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(appPath, './styles/scss/variables.scss'),
                path.resolve(appPath, './styles/scss/mixins.scss'),
              ],
            },
          },
        ],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10 * 1024,
              noquotes: true,
              name: '[name].[contenthash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: '[name].[contenthash].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false,
                // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                // Try enabling it in your environment by switching the config to:
                // enabled: true,
                // progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: options.plugins.concat(plugins),
  resolve: {
    modules: ['node_modules', 'app'],
    extensions: ['.mjs', '.js', '.jsx', '.react.js'],
    alias: {
      '@': path.resolve(process.cwd(), 'app'),
      components: path.resolve(process.cwd(), 'app/components'),
      services: path.resolve(process.cwd(), 'app/shared/services'),
      actions: path.resolve(process.cwd(), 'app/shared/actions'),
      reducers: path.resolve(process.cwd(), 'app/shared/reducers'),
      selectors: path.resolve(process.cwd(), 'app/shared/selectors'),
      constants: path.resolve(process.cwd(), 'app/shared/constants'),
      utils: path.resolve(process.cwd(), 'app/utils'),
      'form-utils': path.resolve(process.cwd(), 'app/form-utils'),
      translations: path.resolve(process.cwd(), 'app/translations'),
      hooks: path.resolve(process.cwd(), 'app/hooks'),
    },
    mainFields: ['browser', 'module', 'main', 'jsnext:main'],
  },
  devtool: options.devtool,
  target: 'web',
  performance: options.performance || {},
});
