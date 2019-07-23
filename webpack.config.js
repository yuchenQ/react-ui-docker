const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const ROOT = path.resolve(__dirname, '.');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  entry: path.resolve(ROOT, 'src/index.jsx'),

  output: {
    path: path.resolve(ROOT, 'dist'),
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [{
      test: /\.css$/,
      use: ['thread-loader', 'style-loader', 'css-loader'],
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
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
  ],

  devServer: {
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
