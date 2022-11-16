const path = require("path")
const { DefinePlugin } = require("webpack")
const { ProvidePlugin } = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    devServer: {
        port: 3000,
        hot: true,
        liveReload: false,
        open: true,
        //enabling history for SPA
        historyApiFallback: true
    },
    entry: {
        bundle: path.resolve(__dirname, "./src/index.js")
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "[name].js",
        // enable if we do not want to use CleanWebpackPlugin()
        // clean: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
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
            {
                test: /\.(png|jpe?g|gif)$/i,
                exclude: /node_modules/,
                use: ["file-loader"]

            }
        ]
    },
    resolve: {
        alias: {
            Components: path.resolve(__dirname, './src/components/'),
            Styles: path.resolve(__dirname, './src/styles/')
        },
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new ProvidePlugin({
            process: 'process/browser'
        }),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify("development"),
            'process.env.PUBLIC_URL': JSON.stringify(path.resolve(__dirname, "./public"))
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            linkType: "text/css"
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "Webpack App",
            inject: 'body',
            template: path.resolve(__dirname, './public/index.html')
        })
    ]
}
