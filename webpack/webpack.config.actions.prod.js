///////////////////////////////////////////////////////////////////////////////////////////////////
//  WebPack Development Config
///////////////////////////////////////////////////////////////////////////////////////////////////
//
//  author: Jose Quinto - https://blogs.josequinto.com
//
//  More webpack examples: https://github.com/jquintozamora/react-es6-webpack-minimal-starter-template/tree/master/webpack
//
///////////////////////////////////////////////////////////////////////////////////////////////////

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    // To enhance the debugging process. More info: https://webpack.js.org/configuration/devtool/
    devtool: 'source-map',
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
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["",".ts", ".tsx", ".js"]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')      // Reduces 78 kb on React library
            },
            'DEBUG': false,                                 // Doesn´t have effect on my example
            '__DEVTOOLS__': false                           // Doesn´t have effect on my example
        }),
        // Plugings for optimizing size and performance.
        // Here you have all the available by now: 
        //    Webpack 1. https://github.com/webpack/webpack/blob/v1.13.3/lib/optimize
        //    Webpack 2. https://github.com/webpack/webpack/tree/master/lib/optimize
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
                drop_console: true,
                drop_debugger: true
            },
            minimize: true,
            debug: false,
            sourceMap: true,
            output: {
                comments: false
            },

        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new ExtractTextPlugin('./styles/bundle.css', {
            allChunks: true
        })
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
                loader: ExtractTextPlugin.extract("style", "css!sass")
            }
        ]
    }
};