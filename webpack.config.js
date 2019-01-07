const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AutoPreFixer = require('autoprefixer');

module.exports = {
    entry: [
        '@babel/polyfill', './src/index.js'
    ],
    output: {
        path : path.resolve(__dirname, 'public'),
        filename: 'js/app.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/app.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(s*)css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [AutoPreFixer]
                            },
                        }
                    ]
                })
            }
        ]
    },
    node: { fs: 'empty' },
    devtool: 'source-map',
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devServer: {
        port: 7777,
        historyApiFallback: true,
        hot: true,
        inline: true,
        contentBase: './' ,
        publicPath : '/public/'
    }
};