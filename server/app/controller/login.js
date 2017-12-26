'use strict';

module.exports = app => {
    class LoginController extends app.Controller {
        * index() {
            const {ctx} = this;
            // ctx.cookies.set('authInfo', 'eyJhbGciOiJSU0EtU0hBMjU2IiwidHlwIjoiSldUIn0=.eyJ1c2VySWQiOjEwMDI0LCJ1c2VyTmFtZSI6IiIsIm5pY2tuYW1lIjoicGhpbHlvdW5nIiwiZW1haWwiOiIiLCJtb2JpbGUiOiIxMzQ4MDEyNTgxMCIsInRva2VuU24iOiJhM2ExYWJiZmQwYTU0MWU5ODUzMDczZTVhYjAxMzJmZiIsInVzZXJSb2xlIjoxLCJzdGF0dXMiOjEsImNyZWF0ZURhdGUiOiIyMDE3LTEwLTI1VDEyOjI3OjMyLjAwMFoiLCJ1cGRhdGVEYXRlIjoiMjAxNy0xMS0wMVQxNjoyNDoyMC4wMDBaIiwiZXhwIjoxNTE1NDY3MTgxLCJpYXQiOjE1MTQxNzExODEsImp0aSI6ImEzYTFhYmJmZDBhNTQxZTk4NTMwNzNlNWFiMDEzMmZmIiwiaXNzIjoiRlJFRS1MT0ctSURFTlRJVFktUFJPVklERVIiLCJzdWIiOiJ1c2VyIiwiYXVkIjoiZnJlZUxvZ1dlYlNpdGUifQ==.c687eca36d71f8dc01c57861a3e3d469558866142444b945e275da9394b8645f1cecc66954855d484fabf6a8c04141bcb84ed88bcfbef1b101793873012846bb28d005eef6a495ea19c062e4a4ed0a54b34d025fb304bdcbe366adf9ed6cb6605db58cd5d8463ed733e694c1c6486b90e54755fcd6dfd72320b976ca83ae5ae3', {
            //     httpOnly: true
            // })


            ctx.set('access-control-allow-credentials',true)
            ctx.set('access-control-allow-headers','Authorization,X-Requested-With,Content-Type')
            ctx.set('access-control-allow-methods','GET,POST,PUT,DELETE,OPTIONS')
            ctx.set('access-control-allow-origin','*')
            // ctx.set('access-control-allow-credentials',true)
            yield ctx.render('login.nj');
        }


        * testLogin() {
            const {ctx} = this;
            ctx.cookies.set('authInfo', 'eyJhbGciOiJSU0EtU0hBMjU2IiwidHlwIjoiSldUIn0=.eyJ1c2VySWQiOjEwMDI0LCJ1c2VyTmFtZSI6IiIsIm5pY2tuYW1lIjoicGhpbHlvdW5nIiwiZW1haWwiOiIiLCJtb2JpbGUiOiIxMzQ4MDEyNTgxMCIsInRva2VuU24iOiJhM2ExYWJiZmQwYTU0MWU5ODUzMDczZTVhYjAxMzJmZiIsInVzZXJSb2xlIjoxLCJzdGF0dXMiOjEsImNyZWF0ZURhdGUiOiIyMDE3LTEwLTI1VDEyOjI3OjMyLjAwMFoiLCJ1cGRhdGVEYXRlIjoiMjAxNy0xMS0wMVQxNjoyNDoyMC4wMDBaIiwiZXhwIjoxNTE1NDY3MTgxLCJpYXQiOjE1MTQxNzExODEsImp0aSI6ImEzYTFhYmJmZDBhNTQxZTk4NTMwNzNlNWFiMDEzMmZmIiwiaXNzIjoiRlJFRS1MT0ctSURFTlRJVFktUFJPVklERVIiLCJzdWIiOiJ1c2VyIiwiYXVkIjoiZnJlZUxvZ1dlYlNpdGUifQ==.c687eca36d71f8dc01c57861a3e3d469558866142444b945e275da9394b8645f1cecc66954855d484fabf6a8c04141bcb84ed88bcfbef1b101793873012846bb28d005eef6a495ea19c062e4a4ed0a54b34d025fb304bdcbe366adf9ed6cb6605db58cd5d8463ed733e694c1c6486b90e54755fcd6dfd72320b976ca83ae5ae3', {
                httpOnly: true
            })
            ctx.set('access-control-allow-credentials',true)
            ctx.set('access-control-allow-headers','Authorization,X-Requested-With,Content-Type')
            ctx.set('access-control-allow-methods','GET,POST,PUT,DELETE,OPTIONS')
            ctx.set('access-control-allow-origin','*')
            ctx.body = {ret: 0};
        }


        * login() {
            const {ctx} = this;
            const user = yield this.service.user.getUserInfo({
                username: ctx.request.query.username,
                password: '123456'
            });
            ctx.session.user = user;


            ctx.body = user;
        }
    }

    return LoginController;
};