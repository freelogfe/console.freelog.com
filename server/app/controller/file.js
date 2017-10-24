'use strict';

const path = require('path')
const fs = require('fs-extra')
const md5 = require('md5')

module.exports = app => {
    const RESOURCE_CONFIG = app.config.resource

    class FileController extends app.Controller {
        *create() {
            const {ctx} = this;
            const stream = yield ctx.getFileStream();
            console.log(stream.fields)
            let filename = md5(Date.now()+stream.filename)
            let extname = path.extname(stream.filename)
            let filePath =  path.join(RESOURCE_CONFIG.path, stream.mime, `${filename}${extname}`);
            fs.ensureDirSync(path.dirname(filePath))
            stream.pipe(fs.createWriteStream(filePath));
            ctx.status = 200;
        }
    }
    return FileController;
};
