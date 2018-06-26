const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

exports.paths = () => ({
  app: path.join(__dirname, '../../src'),
  build: path.join(__dirname, '../../build'),
});

exports.clean = (path, options) => ({
  plugins: [
    new CleanWebpackPlugin([path], options),
  ],
});


exports.loadJavaScript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,

        use: {
          loader: 'babel-loader',
          options: {
            // Enable caching for improved performance during development.
            cacheDirectory: true,
          },
        },
      },
    ],
  },
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

exports.setFreeVariable = (key, value) => {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env),
    ],
  };
};
