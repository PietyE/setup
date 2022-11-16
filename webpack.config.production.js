const path = require("path")
const { merge } = require("webpack-merge")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { DefinePlugin } = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
    mode: "production",
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "[name].[contenthash].js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader, {
                        loader: "css-loader",
                        options: {
                            modules: undefined,
                            sourceMap: true
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify("production"),
            'process.env.PUBLIC_URL': JSON.stringify(path.resolve(__dirname, "./public"))
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
            linkType: "text/css"
        }),
        new CssMinimizerPlugin(),
        new HtmlWebpackPlugin({
            title: "Webpack App",
            inject: 'body',
            template: path.resolve(__dirname, './public/index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),

    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin({
                minimizerOptions: {
                    test: /\.css&/i,
                    preset: [
                        "default",
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
            new TerserPlugin({
                terserOptions: {
                    compress: true
                },
                parallel: true,
            })
        ],
    },
})
