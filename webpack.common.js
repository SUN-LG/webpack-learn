const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlInlineCssWebpackPlugin = require('html-inline-css-webpack-plugin').default
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  entry: './src/index.js', 				// 打包的入口文件
  output: { 							// 打包好的文件放在哪个文件夹下
    // publicPath: '/',
    filename: '[name].js',			// 打包出来的文件的名字
    path: path.resolve(__dirname, 'dist/') // 打包完放置文件的文件夹
  },
  
  optimization: {
    // usedExports: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
          }
        }
      },
      {
        test: /\.(eot|woff|ttf|svg|pdf|mp4|webm|ogg|mp3|wav|flac|aac)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'media/[name].[hash:8].[ext]'
          }
        }
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        include: path.resolve(__dirname, 'src')
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ],
  stats: 'errors-only'
}
