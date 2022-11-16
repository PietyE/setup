const path = require("path")
const merge = require("webpack-merge")
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
        new TerserPlugin({
            terserOptions: {
                parse: {
                    // We want terser to parse ecma 8 code. However, we don't want it
                    // to apply minification steps that turns valid ecma 5 code
                    // into invalid ecma 5 code. This is why the `compress` and `output`
                    ecma: 8,
                },
                compress: {
                    ecma: 5,
                    warning: false,
                    inline: 2,
                },
                mangle: {
                    // Find work around for Safari 10+
                    safari10: true,
                },
                output: {
                    ecma: 5,
                    comments: false,
                    ascii__only: true,
                }
            },
            // Use multi-process parallel running to improve the build speed
            parallel: true,
            // Enable file caching
            cache: true,
        })
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
        ],
    },
})
