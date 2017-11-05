var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = [{
    entry: ["babel-polyfill", "./web/scripts/app.jsx"],
    output: {
        path: path.resolve(__dirname, "./build/web/"),
        filename: "bundle.js"
    },
    target: "web",
    module: {
        loaders: [{
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: [/node_modules/, "./app"]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                query: {
                    name: "assets/[name].[ext]?[hash]"
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
    externals: {
        debug: "commonjs debug"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "index",
            filename: "index.html",
            template: "web/index.html",
            inject: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}];