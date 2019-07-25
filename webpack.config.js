const { HotModuleReplacementPlugin } = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const threadLoader = require('thread-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ROOT = path.resolve(__dirname, '.');
const BUILD_DIR = path.resolve(__dirname, 'dist');
const SOURCE_DIR = path.resolve(__dirname, 'src');

threadLoader.warmup({
  // pool options, like passed to loader options
  // must match loader options to boot the correct pool
}, [
  // modules to load
  // can be any module, i. e.
  MiniCssExtractPlugin.loader,
  'babel-loader',
  'style-loader',
  'css-loader',
  'url-loader',
]);

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  entry: `${SOURCE_DIR}/index.jsx`,

  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.[hash].js',
    sourceMapFilename: '[name].js.map',
  },

  devtool: 'cheap-module-source-map',

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules'),
    ],
    mainFiles: ['index'],
  },

  module: {
    rules: [{
      test: /\.css$/,
      use: [
        process.env.NODE_ENV === 'production'
          ? MiniCssExtractPlugin.loader
          : 'style-loader',
        'thread-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['thread-loader', 'babel-loader?cacheDirectory'],
    }, {
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: [
        'thread-loader',
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65,
            },
            optipng: {
              enabled: true,
            },
            pngquant: {
              quality: '65-90',
              speed: 4,
            },
            gifsicle: {
              interlaced: false,
            },
            webp: {
              quality: 75,
            },
          },
        },
      ],
    }],
  },

  plugins: [
    // CleanWebpackPlugin needs to put ahead of HtmlWebpackPlugin
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT, 'src/index.html'),
      title: 'minHTML',
      filename: 'index.html',
      inject: true,
      // compress HTML config
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        useShortDoctype: true,
      },
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
    new HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.[hash].css',
      chunkFilename: '[name].[hash].css',
    }),
    new OptimizeCSSAssetsPlugin(),
  ],

  devServer: {
    contentBase: BUILD_DIR,
    compress: true,
    hot: true,
    host: process.env.DEV_HOST || '0.0.0.0',
    port: process.env.DEV_PORT || 8000,
    historyApiFallback: true,
    overlay: {
      errors: true,
    },
    open: true,
    stats: {
      colors: true,
      assets: false,
      children: false,
      chunks: false,
      chunkModules: false,
      entrypoints: false,
      hash: false,
      modules: false,
      timings: false,
      version: false,
    },
  },
};
