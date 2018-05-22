const path = require('path');

const entry = [
  './src/index.js',
];

const output = {
  path: path.resolve(__dirname, 'build'),
  publicPath: '/assets/',
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
      { test: /\.jsx$/, use: 'babel-loader', include: /src/ },
    ],
  },
};
