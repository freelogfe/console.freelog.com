var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var HappyPack = require('happypack');
var os = require('os')
var happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
var isProduction = process.env.NODE_ENV === 'production'
var cssOptions = {
  sourceMap: isProduction
    ? config.build.productionSourceMap
    : config.dev.cssSourceMap,
  extract: isProduction
}

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  node: {
    module: "empty",
    fs: "empty"
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'views': path.resolve(__dirname, '../src/views'),
      'styles': path.resolve(__dirname, '../src/styles')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        // loader: 'vue-loader',
        loader: 'happypack/loader?id=happyVue'
      },
      {
        test: /\.js$/,
        // loader: 'babel-loader',
        loader: 'happypack/loader?id=happybabel',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        // loader: 'url-loader',
        loader: 'happypack/loader?id=image'
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        // loader: 'url-loader',
        loader: 'happypack/loader?id=media',
        // exclude: /node_modules/
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
        // loader: 'happypack/loader?id=fonts',
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'happyVue',
      loaders: [{loader: 'vue-loader', options: vueLoaderConfig}],
      threadPool: happyThreadPool,
      verbose: false
    }),
    new HappyPack({
      id: 'happybabel',
      loaders: ['babel-loader'],
      threadPool: happyThreadPool,
      verbose: false
    }),
    new HappyPack({
      id: 'image',
      loaders: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }],
      threadPool: happyThreadPool,
      verbose: false
    }),
    new HappyPack({
      id: 'media',
      loaders: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      }],
      threadPool: happyThreadPool,
      verbose: false
    }),
    /**
    * 会出现自定义字体无法decode的情况
    * */
    // new HappyPack({
    //   id: 'fonts',
    //   loaders: [{
    //     loader: 'url-loader',
    //     options: {
    //       limit: 10000,
    //       name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
    //     }
    //   }],
    //   threadPool: happyThreadPool,
    //   verbose: false
    // }),
    new HappyPack({
      id: 'css',
      loaders: [{
        loader: 'css-loader',
        options: Object.assign({
          minimize: isProduction,
        }, cssOptions)
      }],
      threadPool: happyThreadPool,
      verbose: false
    }),
    new HappyPack({
      id: 'less',
      loaders: [{
        loader: 'less-loader',
        options: {
          sourceMap: cssOptions.sourceMap
        }
      }],
      threadPool: happyThreadPool,
      verbose: false
    }),
    new HappyPack({
      id: 'style',
      loaders: ['vue-style-loader'],
      threadPool: happyThreadPool,
      verbose: false
    })
  ]
}
