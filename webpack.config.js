const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: path.join(__dirname, '/src'),
  mode: 'development',
  entry: {
    main: './client/index.js',
  },
  output: {
    path: path.join(__dirname, '/public/build/'),
    filename: '[name].js',
    // [contenthash]
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // получает имя, то есть node_modules/packageName/not/this/part.js
            // или node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // имена npm-пакетов можно, не опасаясь проблем, использовать
            // в URL, но некоторые серверы не любят символы наподобие @
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
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
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: [/node_modules/, /public/, /server/],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: 'file-loader',
      },
      {
        test: /\.(otf|ttf|eot)$/,
        use: 'file-loader',
      },

    ],
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
      template: './source/index.html',
    }),
    new CopyWebpackPlugin([
      // {
      //     from: __dirname + '/src/source/images/icons/',
      //     to: __dirname + '/public/images/icons/'
      // }
    ]),
  ],
};
