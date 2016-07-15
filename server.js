/*eslint-disable no-console, no-var */
var express = require('express')
var rewrite = require('express-urlrewrite')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var WebpackConfig = require('./webpack.config')

const appPath = WebpackConfig.appPath

var app = express()

app.use(webpackDevMiddleware(webpack(WebpackConfig), {
  publicPath: '/__build__/',
  stats: {
    colors: true
  }
}))

var fs = require('fs')
var path = require('path')

fs.readdirSync(appPath).forEach(function (file) {
  if (fs.statSync(path.join(appPath, file)).isDirectory())
    app.use(rewrite(appPath + '/' + file + '/*', appPath + '/' + file + '/index.html'))
})

app.use(express.static(appPath))

app.listen(8080, function () {
  console.log('Server listening on http://localhost:8080, Ctrl+C to stop')
})
