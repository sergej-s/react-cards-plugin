'use strict';

var webpack = require('webpack');

module.exports = {
    entry: './src/main.jsx',
    output: {
        filename: './scripts/transformToCardsPlugin.js'
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 300
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    externals: {
        "react": "React",
        "jQuery": "jQuery"
    }
    //devtool: "eval-source-map"
}
