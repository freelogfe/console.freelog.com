(window.webpackJsonp=window.webpackJsonp||[]).push([["user"],{"24Tl":function(e,r,t){"use strict";t.r(r);var s=t("L2JU"),a=t("11pw"),o=t("36qw"),i=t("FHQA"),l={name:"user-setting",data:function(){return{userInfo:{},rules:{loginName:[{required:!0,message:"请输入账号",trigger:"blur"},{validator:o.a,trigger:"blur"},{min:6,max:16,message:"长度在 6 到 16 个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:16,message:"长度在 6 到 16 个字符",trigger:"blur"}]},error:null,loading:!1,rememberUser:!1}},computed:Object(s.b)({session:"session"}),mounted:function(){var e=this;this.loading=!0,this.loadUserDetail().then(function(r){e.loading=!1,e.userInfo=r,console.log(r)}).catch(function(){e.loading=!1})},methods:{loadUserDetail:function(){return this.$services.user.get(this.session.user.userId).then(function(e){return e.getData()})},submit:function(e){var r=this;this.$refs[e].validate(function(e){if(!e)return!1;r.error=null,r.loading=!0;var t=Object.assign(r.userInfo,{jwtType:"header",isRememer:r.rememberUser?1:0});r.$store.dispatch("userLogin",t).then(function(e){a.c.set("loginName",t.loginName);var s=r.$route.query.redirect;s&&Object(i.a)(s)||(s="/"),r.$router.replace(s),r.loading=!1}).catch(function(e){switch(r.error={title:"发生错误",message:e||"出现异常，请稍后再试！"},e.response&&e.response.status){case 401:r.error.message="用户名或密码错误！";break;case 500:r.error.message="服务器内部异常，请稍后再试！"}r.loading=!1})})}}},n=(t("Zh4c"),t("KHd+")),c=Object(n.a)(l,function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("section",{staticClass:"login-section"},[t("el-form",{ref:"loginForm",staticClass:"user-form",attrs:{"auto-complete":"off",model:e.userInfo,rules:e.rules,"label-width":"100px"}},[t("el-form-item",{attrs:{prop:"userName",label:"用户姓名"}},[t("el-input",{attrs:{placeholder:"请输入用户姓名"},model:{value:e.userInfo.userName,callback:function(r){e.$set(e.userInfo,"userName",r)},expression:"userInfo.userName"}})],1),e._v(" "),t("el-form-item",{attrs:{prop:"nickname",label:"用户昵称"}},[t("el-input",{attrs:{placeholder:"请输入用户昵称"},model:{value:e.userInfo.nickname,callback:function(r){e.$set(e.userInfo,"nickname",r)},expression:"userInfo.nickname"}})],1),e._v(" "),t("el-form-item",{attrs:{prop:"email",label:"email"}},[t("el-input",{attrs:{placeholder:"请输入email"},model:{value:e.userInfo.email,callback:function(r){e.$set(e.userInfo,"email",r)},expression:"userInfo.email"}})],1),e._v(" "),t("el-form-item",{attrs:{prop:"mobile",label:"手机号"}},[t("el-input",{attrs:{placeholder:"请输入手机号",disabled:""},model:{value:e.userInfo.mobile,callback:function(r){e.$set(e.userInfo,"mobile",r)},expression:"userInfo.mobile"}})],1),e._v(" "),t("el-form-item",{staticClass:"login-btns"},[t("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary",disabled:!0,loading:e.loading},on:{click:function(r){e.submit("loginForm")}}},[e._v(e._s(e.loading?"保存中...":"保存")+"\n      ")])],1)],1)],1)},[],!1,null,"5ef96072",null);r.default=c.exports},"36qw":function(e,r,t){"use strict";t.d(r,"a",function(){return s});var s=function(e,r,t){if(r){/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(r)||/^1[34578]\d{9}$/.test(r)?t():t(new Error("账号格式有误，输入正确的手机号或邮箱"))}else t(new Error("账号不能为空"))}},"5oY/":function(e,r,t){"use strict";t.r(r);var s=t("11pw"),a=t("36qw"),o=t("FHQA"),i={name:"signup",data:function(){var e=this;return{model:{loginName:"",nickname:"",password:"",checkPassword:""},rules:{loginName:[{required:!0,message:"请输入账号名",trigger:"blur"},{validator:a.a,trigger:"blur"}],nickname:[{required:!0,message:"请输入昵称",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{validator:function(r,t,s){""===t?s(new Error("请输入密码")):(""!==e.model.checkPassword&&e.$refs.signupForm.validateField("checkPassword"),s())},trigger:"blur"},{min:6,message:"长度至少6个字符",trigger:"blur"}],checkPassword:[{required:!0,message:"请输入确认密码",trigger:"blur"},{validator:function(r,t,s){""===t?s(new Error("请再次输入密码")):t!==e.model.password?s(new Error("两次输入密码不一致!")):s()},trigger:"blur"},{min:6,message:"长度至少6个字符",trigger:"blur"}]},error:null,loading:!1,logining:!1}},methods:{login:function(){var e=this,r=this.$route.query.redirect,t=/^(https?:)?\/\//.test(r),a={loginName:this.model.loginName,password:this.model.password,jwtType:t?"cookie":"header"};r&&Object(o.a)(r)||(r="/node/list"),e.logining=!0,this.$store.dispatch("userLogin",a).then(function(){s.c.set("loginName",a.loginName),t?location.replace(r):e.$router.replace(r||"/node/list")}).catch(function(r){e.logining=!1})},submit:function(e){var r=this;this.loading||this.$refs[e].validate(function(e){if(!e)return!1;r.error=null,r.loading=!0;var t={};Object.keys(r.model).forEach(function(e){"checkPassword"!==e&&(t[e]=r.model[e])}),r.$services.other.register(t).then(function(e){0===e.data.errcode?(r.$message.success("注册成功"),r.login()):r.$message.error(e.data.msg),r.loading=!1}).catch(function(e){switch(r.error={title:"发生错误",message:"出现异常，请稍后再试！"},e.response&&e.response.status){case 401:r.error.message="用户名或密码错误！";break;case 500:r.error.message="服务器内部异常，请稍后再试！"}r.loading=!1})})}}},l=(t("xgEx"),t("KHd+")),n=Object(l.a)(i,function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("section",{directives:[{name:"loading",rawName:"v-loading",value:e.logining,expression:"logining"}],staticClass:"login-section",attrs:{"element-loading-text":"正在登录中..."}},[t("header",{staticClass:"login-header"},[e.error?t("el-alert",{attrs:{title:e.error.title,type:"error",description:e.error.message,"show-icon":""}}):e._e()],1),e._v(" "),t("el-form",{ref:"signupForm",staticClass:"login-form",attrs:{"auto-complete":"off",model:e.model,rules:e.rules,"label-width":"80px"}},[t("h2",{staticClass:"heading"},[e._v("注册用户")]),e._v(" "),t("el-form-item",{attrs:{prop:"loginName",label:"账号",required:""}},[t("el-input",{attrs:{type:"text",placeholder:"请输入手机号或邮箱"},model:{value:e.model.loginName,callback:function(r){e.$set(e.model,"loginName",r)},expression:"model.loginName"}})],1),e._v(" "),t("el-form-item",{attrs:{prop:"nickname",label:"用户昵称",required:""}},[t("el-input",{attrs:{type:"text",placeholder:"请输入用户昵称"},model:{value:e.model.nickname,callback:function(r){e.$set(e.model,"nickname",r)},expression:"model.nickname"}})],1),e._v(" "),t("el-form-item",{attrs:{prop:"password",label:"设置密码",required:""}},[t("el-input",{attrs:{type:"password",placeholder:"密码(6-16位字母、数字和符号)"},model:{value:e.model.password,callback:function(r){e.$set(e.model,"password",r)},expression:"model.password"}})],1),e._v(" "),t("el-form-item",{attrs:{prop:"checkPassword",label:"确认密码",required:""}},[t("el-input",{attrs:{type:"password",placeholder:"请输入确认密码"},model:{value:e.model.checkPassword,callback:function(r){e.$set(e.model,"checkPassword",r)},expression:"model.checkPassword"}})],1),e._v(" "),t("el-form-item",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],attrs:{label:"验证码",prop:"verifyCode"}},[t("el-input",{attrs:{placeholder:"请输入验证码"},model:{value:e.model.verifyCode,callback:function(r){e.$set(e.model,"verifyCode",r)},expression:"model.verifyCode"}})],1),e._v(" "),t("el-form-item",[t("a",{staticClass:"user-op",attrs:{href:"/user/login"}},[e._v("去登录"),t("i",{staticClass:"el-icon-d-arrow-right"})])]),e._v(" "),t("el-form-item",{staticClass:"login-btns"},[t("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary",loading:e.loading},on:{click:function(r){e.submit("signupForm")}}},[e._v(e._s(e.loading?"注册中...":"注册")+"\n      ")])],1)],1)],1)},[],!1,null,"1babb061",null);r.default=n.exports},DvxU:function(e,r,t){"use strict";t.r(r);t("11pw");var s=t("FHQA"),a=t("36qw"),o={name:"reset-password",data:function(){return{model:{loginName:"",password:""},rules:{loginName:[{required:!0,message:"请输入用户名",trigger:"blur"},{validator:a.a,trigger:"blur"}],verifyCode:[{required:!0,message:"请输入验证码",trigger:"blur"}]},error:null,loading:!1}},methods:{submit:function(e){var r=this;this.$refs[e].validate(function(e){if(!e)return!1;r.error=null,r.loading=!0,r.$services.other.resetPassword(r.model).then(function(e){if(0===e.data.errcode){var t=r.$route.query.redirect;t&&Object(s.a)(t)||(t="/"),r.$router.replace(t)}else r.error={title:"",message:e.data.msg};r.loading=!1}).catch(function(e){switch(r.loading=!1,r.error={title:"发生错误",message:"出现异常，请稍后再试！"},e.response&&e.response.status){case 401:r.error.message="用户名或密码错误！";break;case 500:r.error.message="服务器内部异常，请稍后再试！"}})})}}},i=(t("ZG55"),t("KHd+")),l=Object(i.a)(o,function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("section",{staticClass:"login-section"},[t("header",{staticClass:"login-header"},[e.error?t("el-alert",{attrs:{title:e.error.title,type:"warning",description:e.error.message,"show-icon":""}}):e._e()],1),e._v(" "),t("el-form",{ref:"formRef",staticClass:"login-form",attrs:{"auto-complete":"off",model:e.model,rules:e.rules,"label-width":"60px"}},[t("h2",{staticClass:"heading"},[e._v("找回密码")]),e._v(" "),t("el-form-item",{attrs:{prop:"loginName",label:"账号"}},[t("el-input",{attrs:{type:"text",placeholder:"手机号或邮箱"},model:{value:e.model.loginName,callback:function(r){e.$set(e.model,"loginName",r)},expression:"model.loginName"}})],1),e._v(" "),t("el-form-item",{attrs:{prop:"password",label:"密码"}},[t("el-input",{attrs:{type:"password",placeholder:""},model:{value:e.model.password,callback:function(r){e.$set(e.model,"password",r)},expression:"model.password"}})],1),e._v(" "),t("el-form-item",{staticClass:"login-btns"},[t("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary",loading:e.loading},on:{click:function(r){e.submit("formRef")}}},[e._v(e._s(e.loading?"验证中...":"立即验证")+"\n      ")])],1)],1)],1)},[],!1,null,"e6baad88",null);r.default=l.exports},Lodb:function(e,r,t){},TaL4:function(e,r,t){},XM1F:function(e,r,t){},ZG55:function(e,r,t){"use strict";var s=t("ZnCm");t.n(s).a},Zh4c:function(e,r,t){"use strict";var s=t("Lodb");t.n(s).a},ZnCm:function(e,r,t){},"l/gp":function(e,r,t){"use strict";var s=t("XM1F");t.n(s).a},nCwR:function(e,r,t){"use strict";t.r(r);var s=t("11pw"),a=t("36qw"),o=t("FHQA"),i={name:"login",data:function(){var e={loginName:[{required:!0,message:"请输入账号",trigger:"blur"},{validator:a.a,trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,message:"长度至少6个字符",trigger:"blur"}]};return{model:{loginName:s.c.get("loginName")||"",password:""},signUpLink:"/user/signup",rules:e,error:null,loading:!1,rememberUser:!1}},mounted:function(){var e=this.$route.query.redirect;Object(o.a)(e)&&(this.signUpLink+="?redirect=".concat(e))},methods:{submit:function(e){var r=this,t=this;this.$refs[e].validate(function(e){if(!e)return!1;r.error=null,r.loading=!0;var a=Object.assign(r.model,{isRememer:r.rememberUser?1:0});r.$store.dispatch("userLogin",a).then(function(e){s.c.set("loginName",a.loginName);var i=r.$route.query.redirect;Object(o.a)(i)?location.replace(i):t.$router.replace("/"),t.loading=!1}).catch(function(e){if(console.log(e),"string"==typeof e)t.error={title:"",message:e};else switch(t.error={title:"发生错误",message:e.response.errorMsg||"出现异常，请稍后再试！"},e.response&&e.response.status){case 401:t.error.message="用户名或密码错误！";break;case 500:t.error.message="服务器内部异常，请稍后再试！"}t.loading=!1})})}}},l=(t("l/gp"),t("KHd+")),n=Object(l.a)(i,function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("section",{staticClass:"login-section"},[t("header",{staticClass:"login-header"},[e.error?t("el-alert",{attrs:{title:e.error.title,type:"warning",description:e.error.message,"show-icon":""}}):e._e()],1),e._v(" "),t("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{"auto-complete":"off",model:e.model,rules:e.rules,"label-width":"0"}},[t("h2",{staticClass:"heading"},[e._v("用户登录")]),e._v(" "),t("el-form-item",{attrs:{prop:"loginName"}},[t("el-input",{attrs:{type:"text",placeholder:"请输入用户名"},model:{value:e.model.loginName,callback:function(r){e.$set(e.model,"loginName",r)},expression:"model.loginName"}},[t("template",{slot:"prepend"},[t("i",{staticClass:"fa fa-user",attrs:{"aria-hidden":"true"}})])],2)],1),e._v(" "),t("el-form-item",{attrs:{prop:"password"}},[t("el-input",{attrs:{type:"password",placeholder:"请输入密码"},nativeOn:{keyup:function(r){if(!("button"in r)&&e._k(r.keyCode,"enter",13,r.key,"Enter"))return null;e.submit("loginForm")}},model:{value:e.model.password,callback:function(r){e.$set(e.model,"password",r)},expression:"model.password"}},[t("template",{slot:"prepend"},[t("i",{staticClass:"fa fa-unlock-alt",attrs:{"aria-hidden":"true"}})])],2)],1),e._v(" "),t("el-form-item",[t("el-checkbox",{model:{value:e.rememberUser,callback:function(r){e.rememberUser=r},expression:"rememberUser"}},[e._v("记住我")]),e._v(" "),t("span",{staticClass:"user-ops"},[t("a",{staticClass:"user-op",attrs:{href:"/user/reset_pw"}},[e._v("忘记密码")]),e._v(" | "),t("a",{staticClass:"user-op",attrs:{href:e.signUpLink}},[e._v("注册新用户")])])],1),e._v(" "),t("el-form-item",{staticClass:"login-btns"},[t("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary",loading:e.loading},on:{click:function(r){e.submit("loginForm")}}},[e._v(e._s(e.loading?"登陆中...":"登录")+"\n      ")])],1)],1)],1)},[],!1,null,"541c6a02",null);r.default=n.exports},xgEx:function(e,r,t){"use strict";var s=t("TaL4");t.n(s).a}}]);