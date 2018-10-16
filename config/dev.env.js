var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  mode: 'development',
  NODE_ENV: '"development"'
})
