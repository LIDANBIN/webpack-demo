const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: {
        app: './src/index.js',
        // 使用 entry 配置手动地分离代码:
        // 如果入口 chunks 之间包含重复的模块，那些重复模块都会被引入到各个 bundle 中。
        // 这种方法不够灵活，并且不能将核心应用程序逻辑进行动态拆分代码。
        // print: './src/print.js'
        vendor: [
            'lodash'
        ]
    },
    output: {
        filename: '[name].[chunkhash].js', // hash值用来进行文件名替换，便于浏览器缓存
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management'
        }),
        new CleanWebpackPlugin(['dist'])
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|gif|png|svg)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            },
            {
                test: /\.(csv|tsv)$/,
                use: 'csv-loader'
            },
            {
                test: /\.xml$/,
                use: 'xml-loader'
            }
        ]
    }
}