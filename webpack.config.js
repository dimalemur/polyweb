const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    context: __dirname + '/src',
    mode: 'development',
    entry: {
        main: './client/index.js'
    },
    output: {
        path: __dirname + '/public/build/',
        filename: '[name].[contenthash].js'
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
                        loader: MiniCssExtractPlugin.loader,
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
                use:"babel-loader",
                exclude: [/node_modules/, /public/, /server/]
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: "file-loader"
            },
            {
                test: /\.(otf|ttf|eot)$/,
                use: "file-loader",
            },


        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.pcss'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',

        }),
        new HTMLWebpackPlugin({
            template: './source/index.html'
        }),
        new CopyWebpackPlugin([
            // {
            //     from: __dirname + '/src/source/images/icons/',
            //     to: __dirname + '/public/images/icons/'
            // }
        ])
    ]
}