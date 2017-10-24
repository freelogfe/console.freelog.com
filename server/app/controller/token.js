'use strict';

module.exports = app => {
    var tokens = [];

    class TokenController extends app.Controller {
        //check token
        *index() {
            const {ctx} = this;
            const auths = ctx.headers.authorization.split(' ');
            const types = ['Bearer', 'JWT']
            var token = (types.includes(auths[0]))? auths[1]: ctx.request.query.token;

            try {
                var decoded = app.jwt.verify(token, app.config.jwt.secret); //验证token有效性
                ctx.status = 200;
            } catch (err){
                console.log(err.message)
                ctx.body = err.message;
                ctx.status = 401;
            }
            ctx.status = 200;

            //todo
            //验证是否有权限访问链接
        }

        *create() {
            const {ctx} = this;
            const data = ctx.request.body;
            const valid = yield this.service.user.verify(data);
            if (valid) {
                const token = app.jwt.sign({username: data.username}, app.config.jwt.secret);
                const user = yield this.service.user.getUserInfo(data);
                ctx.session.user = user;
                ctx.set('Authorization', token);
                ctx.status = 204;
            } else {
                ctx.status = 401;
            }
        }

        //销毁token
        *destroy() {
            this.ctx.status = 200;
        }
    }
    return TokenController;
};
