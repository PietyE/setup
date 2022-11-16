const path = require("path")
const { ProvidePlugin } = require("webpack")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        bundle: path.resolve(__dirname, "./src/index.js")
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
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
        //to identify process.env while building
        new ProvidePlugin({
            process: 'process/browser'
        }),
        new CleanWebpackPlugin(),
    ]
}
