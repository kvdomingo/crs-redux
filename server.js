const webpack = require("webpack"),
      WebpackDevServer = require("webpack-dev-server"),
      config = require("./webpack.dev.js");


new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    inline: true,
    historyApiFallback: true,
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
}).listen(3000, "localhost", (err, result) => {
    (err)
        ? console.log(err)
        : console.log("Listening at localhost:3000...");
})