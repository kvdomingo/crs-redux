const path = require("path"),
      HtmlWebpackPlugin = require("html-webpack-plugin"),
      MiniCssExtractPlugin = require("mini-css-extract-plugin"),
      CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;


module.exports = {
    context: __dirname,
    module: {
        rules: [
            {
                test: /\.js(x)?$/,
                exclude: [
                    /node_modules/,
                ],
                use: ["babel-loader"]
            },
            {
                test: /\.s[ac]ss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
            { test: /\.(woff|woff2)$/, loader: "url-loader" },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?mimetype=application/octet-stream"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                issuer: {
                    test: /\.jsx$/
                },
                use: ["babel-loader", "@svgr/webpack", "url-loader"]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader"
            },
            {
                test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            },
            {
                test: /\.gif(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=image/gif"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "frontend/templates/frontend/index.html"),
            filename: "index.html"
        })
    ],
    resolve: {
        extensions: [".js", ".jsx"]
    }
};
