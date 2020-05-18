// webpack.dev.js
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const path = require('path')

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader', {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
            }
          }, 'less-loader', 'postcss-loader', {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75, // rem 相对 px 转换的单位，1rem = 75px
              remPercision: 8 // px 转化为 rem 小数点的位数
            }
          }],
        exclude: [path.resolve(__dirname, 'node_modules')]
      }, {
        test: /\.css$/,
        use: [
          'style-loader', {
            loader: 'css-loader',
          }, 'postcss-loader', {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75, // rem 相对 px 转换的单位，1rem = 75px
              remPercision: 8 // px 转化为 rem 小数点的位数
            }
          }],
        include: path.resolve(__dirname, 'src/global.css')
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    open: true,
    port: 8080,
    proxy: {
      context: ['/auth', '/api'], // 多个路径，代理到同一个target
      target: 'https://cn.bing.com',
      pathRewrite: {'^/api': ''}, // 重写路径
      secure: false, // 代理到https，需关闭安全选项才能正常运行
      changeOrigin: true // 解决跨域问题
    },
    hot: true,
    hotOnly: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(commonConfig, devConfig)