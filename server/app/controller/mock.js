'use strict';
//本地模拟数据服务

const path = require('path')
const fs = require('fs-extra')
const md5 = require('md5')
const c2k = require('koa-connect');
const proxy = require('http-proxy-middleware');

module.exports = app => {
    const RESOURCE_CONFIG = app.config.resource

    class MockController extends app.Controller {

        * mockHandler() {
            const {ctx} = this
            var targetPath = `~/workplace/mock${ctx.path}`
            if (ctx.query.resourceType) {
                targetPath = `${targetPath}/${ctx.query.resourceType}.json`
            }

            console.log('request: ', ctx.url)
            targetPath = path.join(process.env.HOME, targetPath).replace('~', '')


            var isExisted
            try {
                var stat = fs.statSync(targetPath)
                isExisted = stat.isFile()
            } catch (err) {
            }

            if (isExisted) {
                var content = fs.readFileSync(targetPath).toString()
                try {
                    content = JSON.parse(content)
                } catch (err) {
                    ctx.set('freelog-resource-type', 'markdown')
                    ctx.set('freelog-meta', '{}')
                    ctx.set('freelog-system-meta', '{}')
                }
                return content
            } else {
                console.log(`request-> ${ctx.url}`)
                const result = yield c2k(proxy({target: 'http://192.168.0.3', changeOrigin: true}))(ctx)
                return result;
            }
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

    return MockController;
};
