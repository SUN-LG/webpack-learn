// webpack.pro.js
const HtmlInlineCssWebpackPlugin = require('html-inline-css-webpack-plugin').default
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const path = require('path')

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map', // production
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          //   {
          //   loader: 'style-loader',
          //   options: {
          //     insert: 'head', // 样式插入到 <head>
          //     injectType: 'styleTag', //将所有的style标签合并成一个

          //   }
          //  },
          {
            loader: MiniCssExtractPlugin.loader,
          }, {
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
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          }, {
            loader: 'css-loader',
          }, 'postcss-loader', {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75, // rem 相对 px 转换的单位，1rem = 75px
              remPercision: 8 // px 转化为 rem 小数点的位数
            }
          }],
        include: path.resolve(__dirname, 'src/global.css')
      },
      {
        test: /\.gif|jpe?g|png$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'images/[name]_[hash:8].[ext]',
              }
            }
          }
        }
      }, {
        test: /\.(eot|woff|ttf|svg|pdf|mp4|webm|ogg|mp3|wav|flac|aac)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'media/[name].[hash:8].[ext]'
              }
            }
          }
        }
      }
    ]

  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
      // chunkFilename: '[id].css'
      
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: path.resolve(__dirname, 'dist/index.html')
    }),
    new HtmlInlineCssWebpackPlugin({
    }),
  ]
}

module.exports = merge(commonConfig, prodConfig);