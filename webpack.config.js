const path = require('path');

module.exports = {
  entry: [
    './index.js',
  ],
  output: {
    filename: './bundle.js',
    library: 'Request',
    libraryTarget: 'var',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '/*'),
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
