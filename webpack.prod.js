const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    output: {
        filename: '[name].[chunkhash].js', // hash值用来进行文件名替换，便于浏览器缓存
        path: path.resolve(__dirname, 'dist'),
        publicPath: './'
    },
    plugins: [
            new HtmlWebpackPlugin({
                title: 'Output Management',
                filename: 'index.html',
                template: 'index.html',
                inject: true
            }),
        new UglifyJSPlugin(), // 压缩代码
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'NODE_ENV': JSON.stringify('production')
        //     }
        // }),
        new CleanWebpackPlugin(['dist']),
        new webpack.HashedModuleIdsPlugin(), // 不管再添加任何新的本地依赖，对于每次构建，使vendor hash 都保持一致。
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