'use strict';

module.exports = appInfo => {
    const config = {};

    config.jwt = {
        secret: '123456',

        enable: false, // default is false
        match: (ctx) => {
            const reg = /token/i;
            return !reg.test(ctx.path);
        }
    };

    return config;
};
