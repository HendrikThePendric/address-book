var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        './src/index.js'
    ],
    output: {
        filename: './dist/bundle.js',
        sourceMapFilename: './dist/bundle.map'
    },
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-1']
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader', 'sass-loader'])
            }
        ]
    },
    postcss: [
        autoprefixer({ browsers: ['> 1%', 'IE 7'] })
    ],
    plugins: [
        new ExtractTextPlugin('dist/style.css', {
            allChunks: true
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devtool: "#source-map",
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    }
};
