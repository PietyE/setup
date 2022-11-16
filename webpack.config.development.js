const path = require("path")
const { merge } = require("webpack-merge")
const { DefinePlugin } = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
    mode: "development",
    devServer: {
        port: 3000,
        hot: true,
        liveReload: false,
        open: true,
        historyApiFallback: true
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    "style-loader", {
                        loader: "css-loader",
                        options: {
                            modules: undefined,
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify("development"),
            'process.env.PUBLIC_URL': JSON.stringify(path.resolve(__dirname, "./public"))
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            linkType: "text/css"
        }),
        new HtmlWebpackPlugin({
            title: "Webpack App",
            inject: 'body',
            template: path.resolve(__dirname, './public/index.html')
        })
    ]
})
