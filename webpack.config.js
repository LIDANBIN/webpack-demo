const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    // entry: './src/index.js', // 入口文件
    // 分离入口
    entry: {
        // Configuration options can be passed to the client by adding querystring parameters to the path in the webpack config.
        app: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/index.js'],
        // print: './src/print.js'
    },
    output: {
        // filename: 'bundle.js', // 出口文件
        // 分离出口
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({ // 创建全新的 index.html 文件，并将所有的 bundle 自动添加到 html 中。
            title: 'Output Management'
        }),
        new CleanWebpackPlugin(['dist']), // 每次构建前清理 './dist'文件夹
        // new webpack.HotModuleReplacementPlugin() // 模块热替换webpack-dev-server
        // new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(), // 模块热替换webpack-dev-middleware
        // Use NoErrorsPlugin for webpack 1.x
        new webpack.NoEmitOnErrorsPlugin(),
        new UglifyJSPlugin() // 删除未引用代码，精简bundle
    ],
    devtool: '#source-map', // 追踪错误和警告在源代码中的位置
    // devServer: { // 在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件。
    //     contentBase: './dist',
    //     hot: true // 模块热替换webpack-dev-server
    // },
    // 通过 loader 引入任何其他类型的文件。
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