var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    helpers = require('./helpers');

// Webpack Config
module.exports = {

    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },

    resolve: {
        extensions: ['', '.js', '.ts']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'),
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
            {
                test: /\.css$/,
                include: helpers.root('src', 'app'),
                loader: 'raw'
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader','css-loader', 'sass-loader']
            },
            { 
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            { 
                test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                excludes: /(node_modules|bower_components)/,
                loader: 'file-loader?name=fonts/[name].[ext]' 
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]

}