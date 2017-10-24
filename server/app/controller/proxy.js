'use strict';

const path = require('path')
const fs = require('fs-extra')
const md5 = require('md5')

module.exports = app => {
    const RESOURCE_CONFIG = app.config.resource

    class FileController extends app.Controller {
        *create() {

        }
    }
    return FileController;
};
