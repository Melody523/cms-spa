const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
require("@babel/polyfill")


module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    // devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin()
    ],
    devServer: {
        contentBase: './',
        hot: true,
        proxy: {
            '/api': {
                target: 'http://localhost:5230',
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'main.js'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    externals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        _: 'lodash'
    },
    mode: 'development'
}