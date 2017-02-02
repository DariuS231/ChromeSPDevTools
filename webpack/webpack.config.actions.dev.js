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
         'spFeatures': './src/scripts/actions/spFeatures/app.tsx',
         'spSiteContent': './src/scripts/actions/spSiteContent/app.tsx',
         'spWebCustomActions': './src/scripts/actions/spCustomActions/app_webCa.tsx',
         'spSiteCustomActions': './src/scripts/actions/spCustomActions/app_siteCa.tsx'
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
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.scss$/i,
                loader: 'style!css!sass',
                exclude: /node_modules/,
            }
        ],
        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // }
};