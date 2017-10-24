import Container from 'views/layout/container.vue'

import {signup, login, resetPassword} from '@/views/index'


export default {
  path: '/user',
  meta: {
    requiresAuth: false,
    title: '节点管理系统'
  },
  component: Container,
  redirect: '/user/login',
  children: [
    {
      path: 'login',
      meta: {
        requiresAuth: false,
        title: '用户登录'
      },
      component: login
    },
    {
      path: 'reset_pw',
      hidden: true,
      meta: {
        requiresAuth: false,
        title: '重置密码'
      },
      component: resetPassword
    },
    {
      path: 'signup',
      meta: {
        requiresAuth: false,
        title: '注册新账户'
      },
      component: signup
    }
  ]
}
