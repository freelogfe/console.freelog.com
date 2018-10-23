const userLogin = resolve => require.ensure([], () => resolve(require('./login/index.vue')), 'user')
const userResetPassword = resolve => require.ensure([], () => resolve(require('./reset-password/index.vue')), 'user')
const userSetting = resolve => require.ensure([], () => resolve(require('./setting/index.vue')), 'user')
const userSignup = resolve => require.ensure([], () => resolve(require('./signup/index.vue')), 'user')

export default {
  userLogin, userResetPassword, userSetting, userSignup
}
