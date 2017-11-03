const merge = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.common.js')

Object.keys(common.entry).forEach(function (name) {
    common.entry[name] = ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'].concat(common.entry[name])
})

module.exports = merge(common, {
    devtool: 'inline-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 模块热替换webpack-dev-middleware
        // Use NoErrorsPlugin for webpack 1.x
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            __DEV__: true,
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
})