/**
 * hidden=true表示在导航上默认不展示
 * requiresAuth=true 表示需要身份验证即需要登录
 */
import Vue from 'vue'
import Router from 'vue-router'
import nodeRoute from './node'
import accountRoute from './account'
import resourceRoute from './resource'

Vue.use(Router)

import {layout, login, error}  from '@/views/index'

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'login',
      path: '/login',
      meta: {
        requiresAuth: false,
        title: '登录'
      },
      component: login
    },
    accountRoute,
    {
      path: '/',
      meta: {requiresAuth: true, title: '首页'},
      component: layout,
      children: [resourceRoute, nodeRoute]
    },
    {
      name: 'not-found',
      path: '*',
      meta: {
        requiresAuth: false,
        title: 'not found'
      },
      component: layout,
      children: [{
        name: '404',
        path: '',
        meta: {
          requiresAuth: false,
          title: '404'
        },
        component: error
      }]
    }
  ]
})
