'use strict';

module.exports = appInfo => {
    const config = {};

    config.security = {
        csrf: {
            enable: false,
        },
        domainWhiteList: ['http://console.freelog.com']
    };

    config.jwt = {
        secret: '123456',

        enable: false, // default is false
        match: (ctx) => {
            const reg = /token/i;
            return !reg.test(ctx.path);
        }
    };

    config.mysql = {
        // 单数据库信息配置
        // client: {
        //     host: 'localhost',
        //     port: '3306',
        //     user: 'root',
        //     password: '1234',
        //     database: 'db_freelog',
        // }
    };



    return config;
};
