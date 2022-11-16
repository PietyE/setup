const path = require("path")
const { ProvidePlugin } = require("webpack")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        bundle: path.resolve(__dirname, "./src/index.tsx")
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
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
            "@components": path.resolve(__dirname, './src/components/'),
            "@styles": path.resolve(__dirname, './src/styles/')
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    plugins: [
        //to identify process.env while building
        new ProvidePlugin({
            process: 'process/browser'
        }),
        new CleanWebpackPlugin(),
    ]
}
