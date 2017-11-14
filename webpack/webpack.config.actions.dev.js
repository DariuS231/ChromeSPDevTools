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
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    // To enhance the debugging process. More info: https://webpack.js.org/configuration/devtool/
    devtool: 'inline-source-map',
    target: 'web',
    // Using webpack multiple entry point
    entry: {
        'spPropertyBag': './src/scripts/actions/spPropertyBag/app.tsx',
        'spFeatures': './src/scripts/actions/spFeatures/app.tsx',
        'spSearch': './src/scripts/actions/spSearch/app.tsx',
        'spSiteContent': './src/scripts/actions/spSiteContent/app.tsx',
        'spWebCustomActions': './src/scripts/actions/spCustomActions/app_webCa.ts',
        'spSiteCustomActions': './src/scripts/actions/spCustomActions/app_siteCa.ts'
    },
    output: {
        path: path.join(__dirname, './../dist/actions'),
        filename: '[name]/[name].js',
        publicPath: '/dist/actions/'
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js"]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: './styles/bundle.css',
            allChunks: true
        })
    ],
    module: {
        // loaders -> rules in webpack 2
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: '/node_modules/'
            },
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                use: "source-map-loader",
                exclude: '/node_modules/'
            },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.scss$/i,
                use: ExtractTextPlugin.extract({
                    //fallback: 'style-loader',
                    fallbackLoader: 'style-loader',
                    //use: [
                    loader: [{
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 1,
                                minimize: true
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            }
        ]
    }
};