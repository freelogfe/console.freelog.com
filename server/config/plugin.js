'use strict';

exports.static = true;

exports.jwt = {
    enable: true,
    package: 'egg-jwt',
};

exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks',
};

exports.userrole = {
    package: 'egg-userrole',
};

exports.mysql = {
    enable: true,
    package: 'egg-mysql',
};