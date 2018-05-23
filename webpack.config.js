const path = require('path');
const webpack = require('webpack');

const entry = [
  './src/index.js',
];

const output = {
  path: path.resolve(__dirname, 'build'),
  publicPath: '/build/',
  filename: 'bundle.js',
};

module.exports = {
  entry,
  output,
  devtool: 'eval-source-map',
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.js$/, use: 'babel-loader', include: /src/ },
      { test: /\.jsx$/, use: 'babel-loader', include: /src/ }
    ],
  },
};
