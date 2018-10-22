/* eslint-disable */

const path = require('path')
const isProd = process.env.NODE_ENV === 'production'
const srcDir = path.resolve('./src')


module.exports = {
  crossorigin: 'anonymous',
  devServer: {
    hot: false,
    inline: false,
    port: 8080,
    inline: false,
    disableHostCheck: true,
    historyApiFallback: true,
    hot: false,
    // https: {
    //   key: fs.readFileSync('./config/cert/server_ca.key'),
    //   cert: fs.readFileSync('./config/cert/server_ca.crt'),
    // }
  },
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
