'use strict';

module.exports = app => {
    class LoginController extends app.Controller {
        * index() {
            const {ctx} = this;
            yield ctx.render('login.nj');
        }

        * login() {
            const {ctx} = this;
            const user = yield this.service.user.getUserInfo({username: ctx.request.query.username, password: '123456'});
            ctx.session.user = user;
            ctx.body = user;
        }
    }
    return LoginController;
};