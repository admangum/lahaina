var path = require('path');

module.exports = {
    // entry: './src/main.js',
    output: {
        // path: './dist/',
        filename: 'bundle.js',
        publicPath: 'wp-content/themes/lahaina/'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
                presets: ['react']
            }
        }
        // , {
        //     test: /\.css$/,
        //     loader: 'style-loader!css-loader'
        // }
        ]
    },
    devtool: '#source-map',
    resolve: {
        alias: {
            xyz: path.resolve('./src/content/styles')
        }
    }
};