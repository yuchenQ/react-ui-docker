const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const threadLoader = require('thread-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const ROOT = path.resolve(__dirname, '.');

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

  entry: path.resolve(ROOT, 'src/index.jsx'),

  output: {
    path: path.resolve(ROOT, 'dist'),
    filename: 'bundle.js',
  },

  devtool: 'cheap-module-source-map',

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [{
      test: /\.css$/,
      use: [
        process.env.NODE_ENV === 'production'
          ? MiniCssExtractPlugin.loader
          : 'style-loader',
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
      use: ['thread-loader', 'babel-loader'],
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [
        'thread-loader',
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
      ],
    }],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT, 'src/index.html'),
      title: 'minHTML',
      filename: 'index.html',
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
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css',
    }),
    new OptimizeCSSAssetsPlugin(),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: process.env.DEV_PORT || 8000,
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
