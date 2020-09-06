const webpack = require("webpack"),
      WebpackDevServer = require("webpack-dev-server"),
      config = require("./webpack.dev.js"),
      SERVER_HOST = "0.0.0.0",
      SERVER_PORT = 3000;


new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    compress: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
}).listen(SERVER_PORT, SERVER_HOST, (err, result) => {
    (err)
        ? console.log(err)
        : console.log(`Listening at ${SERVER_HOST}:${SERVER_PORT}...`);
})