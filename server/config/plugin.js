'use strict';

exports.static = true;

exports.jwt = {
    enable: false,
    package: 'egg-jwt',
};

exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks',
};

exports.userrole = {
    package: 'egg-userrole',
};

exports.jsonp = {
    enable: false,
    package: 'egg-jsonp',
};

exports.mysql = {
    enable: true,
    package: 'egg-mysql',
};

exports.cors = {
    enable: false,
    package: 'egg-cors',
};