var path = require('path');
// var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);
var BUILDJSPATH = "js/vendor.js";

var common = {
    output: {
        path: path.resolve(ROOT_PATH, 'build'),
        filename: 'js/bundle.js'
    }
};


if (TARGET === 'build') {
    module.exports = merge(common, {
        entry: {
            app: path.resolve(ROOT_PATH, 'app/app.jsx'),
            vendor: ["react", "react-router", "jquery", "jquery-ui"]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin("vendor", BUILDJSPATH),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                "root.jQuery": "jquery"
            })
        ],
        devtool: 'eval-source-map',
        module: {
            // Note: don't include the same loader in multiple places, e.g putting babel under "common" and here.
            // Webpack will error out if you try this.
            loaders: [{
                test: /\.jsx?$/,
                loaders: ['babel'],
                include: path.resolve(ROOT_PATH, 'app')
            }]
        }

    });
}

if (TARGET === 'buildall') {
    module.exports = merge(common, {
        entry: {
            app: path.resolve(ROOT_PATH, 'app/app.jsx'),
            vendor: ["react", "react-router", "jquery", "jquery-ui"]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin("vendor", BUILDJSPATH)
        ],
        devtool: 'eval-source-map',
        module: {
            // Note: don't include the same loader in multiple places, e.g putting babel under "common" and here.
            // Webpack will error out if you try this.
            loaders: [{
                test: /\.jsx?$/,
                loaders: ['babel'],
                include: path.resolve(ROOT_PATH, 'app')
            }]
        }

    });
}


var devServerCommon = {
    entry: {
        app: [path.resolve(ROOT_PATH, 'app/app.jsx')]
    },
    devServer: {
        colors: true,
        noInfo: false,
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "root.jQuery": "jquery"
        })
    ]
};

var startCommon = merge(common, devServerCommon);

if (TARGET === 'start' || !TARGET) {
    // react-hot loader used, with full(ish) eval source maps generated.
    console.log("start called");
    module.exports = merge(startCommon, {
        devtool: 'eval-source-map',
        module: {
            // Note: don't include the same loader in multiple places, e.g putting babel under "common" and here.
            // Webpack will error out if you try this.
            loaders: [{
                test: /\.jsx?$/,
                loaders: ['react-hot', 'babel'],
                include: path.resolve(ROOT_PATH, 'app')
            }]
        }

    });
}
