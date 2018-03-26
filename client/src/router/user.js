import Views from '@/views/index'

export default {
  path: '/user',
  meta: {
    requiresAuth: false,
    title: '节点管理系统'
  },
  component: Views.container,
  redirect: '/user/login',
  children: [
    {
      path: 'login',
      meta: {
        requiresAuth: false,
        title: '用户登录'
      },
      component: Views.userLogin
    },
    {
      path: 'reset_pw',
      hidden: true,
      meta: {
        requiresAuth: false,
        title: '重置密码'
      },
      component: Views.userResetPassword
    },
    {
      path: 'signup',
      meta: {
        requiresAuth: false,
        title: '注册新账户'
      },
      component: Views.userSignup
    }
  ]
}
