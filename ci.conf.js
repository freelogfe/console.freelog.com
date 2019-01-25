/*eslint-disable*/

const path = require('path')
const userHome = require('user-home')

const ossConfig = require(path.join(userHome, '.freelog', 'oss-config.json')) // 避免泄漏oss keys

module.exports = {
  // aliyun oss 配置
  oss: ossConfig,
  // git分支名对应的发布环境
  local: './dist',
  deploys: [{
    branch: 'publish',
    env: 'prod',
    bucket: 'frcdn',
    path: 'console/'
  }, {
    branch: 'daily',
    env: 'beta',
    bucket: 'test-frcdn',
    path: 'console/'
  }]
}
