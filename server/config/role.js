/**
 https://github.com/eggjs/egg-userrole
 https://github.com/koajs/koa-roles
 */

module.exports = function (app) {

    const roleFn = function (role) {
        return function () {
            return this.session.user && this.session.user.roles.includes(role);
        }
    };

    app.role.use('admin', roleFn('admin'));

    app.role.use('node', roleFn('nodeUser'));

    app.role.use('resource', roleFn('resourceUser'));
};
