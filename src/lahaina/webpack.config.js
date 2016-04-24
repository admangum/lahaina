module.exports = {
    // entry: './src/main.js',
    output: {
        // path: './dist/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
                presets: ['react']
            }
        }]
    },
    devtool: '#source-map'
};