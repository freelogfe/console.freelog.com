'use strict';
//本地模拟数据服务

const path = require('path')
const fs = require('fs-extra')
const c2k = require('koa-connect');
const proxy = require('http-proxy-middleware');

module.exports = app => {
  const RESOURCE_CONFIG = app.config.resource
  const harfilePath = path.join(app.baseDir, ['app', 'data', 'local.freelog.com.har'].join(path.sep))
  const harData = JSON.parse(fs.readFileSync(harfilePath).toString())
  const entries = harData.log.entries

  class HarController extends app.Controller {

    * mockHandler() {
      const {ctx} = this
      var href = ctx.href
      var method = ctx.method
      for (var i = 0, len = entries.length; i < len; i++) {
        let entry = entries[i]
        let request = entry.request
        if (request.method === method && request.url === href) {
          let response = entry.response
          response.headers.forEach((item) => {
            ctx.set(item.name, item.value)
          })
          return response.content.text
        }
      }
      console.log(`request-> ${ctx.url}`)
      const result = yield c2k(proxy({target: 'http://112.74.140.101', changeOrigin: true}))(ctx)
      return result;
    }


    * proxy() {
      const {ctx} = this
      ctx.body = yield this.mockHandler()
    }


    * getHandler() {
      const {ctx} = this
      ctx.body = yield this.mockHandler()
    }

    * postHandler() {
      const {ctx} = this
      ctx.body = yield this.mockHandler()
    }
  }

  return HarController;
};
