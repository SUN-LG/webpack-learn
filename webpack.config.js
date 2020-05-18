const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlInlineCssWebpackPlugin = require('html-inline-css-webpack-plugin').default
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js', 				// 打包的入口文件
  output: { 							// 打包好的文件放在哪个文件夹下
    // publicPath: '/',
    filename: '[name].js',			// 打包出来的文件的名字
    path: path.resolve(__dirname, 'dist/') // 打包完放置文件的文件夹
  },
  devtool: 'cheap-module-source-map',
  optimization: {
    // usedExports: true,
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['babel-loader'],
      include: path.resolve(__dirname, 'src')
    },{
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
    },{
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
    },{
      test: /\.gif|jpe?g|png$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10240,
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'img/[name]_[hash:8].[ext]',
            }
          }
        }
      }
    },{
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
    }]
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
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
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
}
