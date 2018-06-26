const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const PATHS = parts.paths();

module.exports = merge([
  {
    entry: [
      'babel-polyfill',
      PATHS.app
    ],
    target: 'node',
    externals: [nodeExternals()],
    module: {
      rules: [{
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }]
    },
    output: {
      path: PATHS.build,
      filename: 'server.js'
    },
  },

  parts.generateSourceMaps({ type: 'source-map' }),
  //parts.setFreeVariable('process.env.NODE_ENV', 'production'),
]);