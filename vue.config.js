/* eslint-disable */
const fs = require('fs')
const path = require('path')
const srcDir = path.resolve('./src')
var minimist = require('minimist')
var argv = minimist(process.argv.slice(2));
const isProd = argv.env === 'prod' || process.env.NODE_ENV === 'production'

function getBaseUrl() {
  var baseUrl
  if (argv.env === 'beta') {
    baseUrl = '//static.testfreelog.com/console'
  } else if (isProd) {
    baseUrl = '//static.freelog.com/console'
  } else {
    baseUrl = '/'
  }
  return baseUrl
}

function getDevServer() {
  var config = {
    port: 8080,
    inline: true,
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    host: '0.0.0.0'
  }

  if (argv.https) {
    Object.assign(config, {
      https: {
        key: fs.readFileSync('./config/cert/server_ca.key'),
        cert: fs.readFileSync('./config/cert/server_ca.crt'),
      }
    })
  }

  return config
}

module.exports = {
  baseUrl: getBaseUrl(),
  crossorigin: 'anonymous',
  devServer: getDevServer(),

  css: {
    extract: true
  },
  filenameHashing: isProd,
  configureWebpack: {
    entry: "./src/main.js",
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': srcDir,
        static: path.join(srcDir, 'static'),
        components: path.join(srcDir, 'components'),
      },
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: `chunk-vendors`,
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial'
          },
          common: {
            name: `chunk-common`,
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true
          }
        },
      }
    },
    plugins: []
  },
  chainWebpack: config => {

  }
};
