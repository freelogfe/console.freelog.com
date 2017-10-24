'use strict';

module.exports = app => {
    const nodeRole = app.role.can('node');
    const resourceRole = app.role.can('resource');

    app.resources('v1', '/v1/*', app.controller.proxy);


    app.get('/node', nodeRole, 'node.index');
    app.get('/resource', resourceRole, 'resource.index');

    app.get('/', 'home.index');
    app.get('/index', 'home.index');
    app.get('/login', 'login.index');
    app.get('/api/login', 'login.login');
    // app.get('/success', 'success.index'); // is setting in config.jwt.match

    app.resources('user', '/api/user', app.controller.user);
    app.resources('token', '/api/token', app.controller.token);
    app.resources('file', '/api/file', app.controller.file);
    app.resources('profile', '/api/profile', app.controller.file);
};
