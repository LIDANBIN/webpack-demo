const express = require('express')
const webpack = require('webpack')
const opn = require('opn')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require("webpack-hot-middleware")

const app = express();
const config = require('./webpack.dev.js')
const compiler = webpack(config)

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
var devMiddleware = webpackDevMiddleware(compiler, {
    reload: true, // 自动加载页面
    quiet: true, // 禁止所有控制台输出
    hot: true,
    // target: 'electron-renderer',
    publicPath: config.output.publicPath
})
app.use(devMiddleware)
app.use(webpackHotMiddleware(compiler))

// Serve the files on port 3000.
app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n')
})

// 启动项目后自动运行浏览器
devMiddleware.waitUntilValid(() => {
    opn('http://localhost:3000/')
})