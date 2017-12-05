/**
 * hidden=true表示在导航上默认不展示
 * requiresAuth=true 表示需要身份验证即需要登录
 */
import Vue from 'vue'
import Router from 'vue-router'
import nodeRoute from './node'
import accountRoute from './account'
import resourceRoute from './resource'
import userRoute from './user'
import eventRoute from './event'
import Container from 'views/layout/container.vue'

Vue.use(Router)

import {layout, login, error, aboutView, helpView, pageBuildPreview} from '@/views/index'

export default new Router({
  mode: 'history',
  routes: [
    accountRoute,
    userRoute,
    eventRoute,
    {
      path: '/resource/create/preview',
      meta: {requiresAuth: true, title: 'page build预览'},
      component: Container,
      hidden: true,
      children: [{
        path: '/',
        hidden: true,
        meta: {
          requiresAuth: false,
          title: 'page build预览'
        },
        component: pageBuildPreview
      }]
    },
    {
      path: '/',
      meta: {requiresAuth: true, title: '首页'},
      component: layout,
      children: [resourceRoute, nodeRoute, {
        path: 'about',
        hidden: true,
        meta: {
          requiresAuth: false,
          title: '关于freelog'
        },
        component: aboutView
      }, {
        path: 'help',
        hidden: true,
        meta: {
          requiresAuth: false,
          title: '帮助中心'
        },
        component: helpView
      }]
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
