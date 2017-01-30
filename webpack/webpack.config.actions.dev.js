///////////////////////////////////////////////////////////////////////////////////////////////////
//  WebPack PROD Config for Actions
///////////////////////////////////////////////////////////////////////////////////////////////////
//
//  author: Jose Quinto - https://blogs.josequinto.com
//
//  More webpack examples: https://github.com/jquintozamora/react-es6-webpack-minimal-starter-template/tree/master/webpack
//
///////////////////////////////////////////////////////////////////////////////////////////////////

const path = require('path');
const webpack = require('webpack');

module.exports = {
    // To enhance the debugging process. More info: https://webpack.js.org/configuration/devtool/
    devtool: 'cheap-module-eval-source-map',
    defineDebug: true,
    debug: true,
    // Using webpack multiple entry point 
    entry: {
        'spPropertyBag': './src/scripts/actions/spPropertyBag/app.tsx',
         'spFeatures': './src/scripts/actions/spFeatures/main.tsx',
         'spSiteContent': './src/scripts/actions/spSiteContent/app.tsx',
         'spWebCustomActions': './src/scripts/actions/spCustomActions/mainWebCa.tsx',
         'spSiteCustomActions': './src/scripts/actions/spCustomActions/mainSiteCa.tsx'
    },
    output: {
        path: path.join(__dirname, './../dist/actions'),
        filename: '[name]/[name].js',
        publicPath: '/dist/actions/'
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".ts", ".tsx", ".js"]
    },
    plugins: [
            /**
         * This is where the magic happens! You need this to enable Hot Module Replacement!
         */
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2016&presets[]=es2015&presets[]=react!ts-loader'
            },
            {
                test: /\.scss$/i,
                loader: 'style!css!sass',
                exclude: /node_modules/,
            }
        ]
    }
};