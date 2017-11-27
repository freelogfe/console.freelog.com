'use strict';

module.exports = app => {
    class HomeController extends app.Controller {
        * index() {
            const {ctx} = this;
            yield ctx.render('index.nj');
        }

        *testCross() {
            const {ctx} = this;
            yield ctx.render('test-cross.nj');
        }

        * test() {
            const {ctx} = this;
            ctx.set('Access-Control-Allow-Origin','http://a.demo.com')
            ctx.cookies.set('name', 'abcd',{
                domain: 'demo.com'
            })
            // ctx.set('content-type','application/javascript')
            ctx.body = {
                success: true,
                name: 'b.demo.com',
                data: {
                    abc: 1,
                    array: [1, 2, 3, 4]
                }
            }
        }

        * Atest() {
            const {ctx} = this;
            ctx.set('Access-Control-Allow-Origin','*')

            ctx.body = {
                success: true,
                name: 'a.demo.com'
            }
        }


    }

    return HomeController;
};
