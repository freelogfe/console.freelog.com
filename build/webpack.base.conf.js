var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
var minimist = require('minimist')
var argv = minimist(process.argv.slice(2));

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

var assetsPublicPath;
var assetsDomain = '';
if (process.env.NODE_ENV === 'production') {
  assetsDomain = (argv.env ==='beta') ? config.build.assetsTestDomain : config.build.assetsDomain
  assetsPublicPath = assetsDomain + config.build.assetsPublicPath
} else {
  assetsPublicPath = config.dev.assetsPublicPath
}

process.traceDeprecation = true;
module.exports = {
  entry: {
    app: './src/main.js'
  },
  //性能分析
  // profile: true,
  // parallelism: 1,
  // recordsPath: path.join(__dirname, 'records.json'),
  //性能分析end
  node: {
    module: "empty",
    fs: "empty"
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: assetsPublicPath
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
        use: [
          'thread-loader',
          {
            loader: 'vue-loader',
            options: vueLoaderConfig
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          "thread-loader",
          'babel-loader',
        ],
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          // "thread-loader",
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
          }
        ]

      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
