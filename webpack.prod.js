const merge = require('webpack-merge')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    plugins: [
        new UglifyJSPlugin(), // 压缩代码
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        // 将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中。
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({ // 分离代码方式二：去除重复的引入
            // ExtractTextPlugin: 用于将 CSS 从主应用程序中分离。
            // bundle-loader: 用于分离代码和延迟加载生成的 bundle。
            // promise-loader: 类似于 bundle-loader ，但是使用的是 promises。
            name: 'common' // 指定公共bundle的名称
        })
    ],
    devtool: 'source-map'
})