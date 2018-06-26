const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

const PATHS = parts.paths();

module.exports = merge([
  {
    entry: [
      'babel-polyfill',
      'webpack/hot/poll?1000',
      PATHS.app
    ],
    target: 'node',
    externals: [nodeExternals({
      whitelist: ['webpack/hot/poll?1000']
    })],
    module: {
      rules: [{
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }]
    },
    plugins: [
      new StartServerPlugin('server.js'),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
    output: {
      path: PATHS.build,
      filename: 'server.js'
    },
  },

  parts.generateSourceMaps({ type: 'source-map' }),
  parts.setFreeVariable('process.env.NODE_ENV', 'development'),
  parts.setFreeVariable('process.env.DB_NAME', 'utimeTest'),
  parts.setFreeVariable('process.env.DB_USER', 'testUser'),
  parts.setFreeVariable('process.env.DB_PASS', 'qwertzqwertz'),
]);