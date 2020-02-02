const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    context: __dirname + '/src',
    mode: 'development',
    entry: {
        main: './client/index.js'
    },
    output: {
        path: __dirname +'/public/build/',
        filename:'[name].[contenthash].js'
    },
    module: {
        rules: [
            {
                test: /\.(pcss|css)$/,
                use: [
                    {
                        loader: 'style-loader',
                      },
                      {
                        loader: 'css-loader',
                        options: {
                          importLoaders: 1,
                        }
                      },
                      {
                        loader: 'postcss-loader'
                      }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: "file-loader"
            },
            

        ]
    },
    resolve: {
        extensions: ['.js', '.jsx','.pcss'],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template:'./source/index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: __dirname + '/src/source/favicon/logo.png',
                to: __dirname + '/public/icons/'
            }
        ])
    ]
}