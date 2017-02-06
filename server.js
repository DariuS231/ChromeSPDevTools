const fs = require('fs');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const opener = require('opener');
const config = require('./webpack/webpack.config.actions.dev');
const host = 'localhost';
const port = 8080;

var ops = {
    cert: './node_modules/webpack-dev-server/ssl/server.pem',
    ca: './node_modules/webpack-dev-server/ssl/ca.pem',
    key: './node_modules/webpack-dev-server/ssl/server.pem'
};

new WebpackDevServer(webpack(config), {
    // All the options for webpack-dev-server here: https://webpack.js.org/configuration/devtool/
    contentBase: config.output.path,
    publicPath: config.output.publicPath,
    // All the stats options here: https://webpack.js.org/configuration/stats/
    stats: {
        colors: true, // color is life
        chunks: false, // this reduces the amount of stuff I see in my terminal; configure to your needs
        'errors-only': true
    },
    https: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    cert: fs.readFileSync(ops.cert),
    ca: fs.readFileSync(ops.cert),
    key: fs.readFileSync(ops.key),
    //requestCert: true,
    //rejectUnauthorized: true,
    hot: false,
    inline: false,
    historyApiFallback: true
})
.listen(port, host, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Listening at ${host}:${port}`);
    //opener(`https://${host}:${port}`);
});
