/*eslint-disable no-var */
var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

const appPath = path.join(__dirname, 'app')

module.exports = {
  appPath: appPath,

  devtool: 'inline-source-map',

  entry: fs.readdirSync(appPath).reduce(function (entries, dir) {
    if (fs.statSync(path.join(appPath, dir)).isDirectory())
      entries[dir] = path.join(appPath, dir, 'app.js')

    return entries
  }, {}),

  output: {
    path: __dirname + '/__build__',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, loader: 'style!css' }
    ]
  },

  resolve: {
    alias: {
        'common': path.join(__dirname, 'assets/common'),
        'assets': path.join(__dirname, 'assets')
    }
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]

}
