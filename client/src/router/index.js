/**
 * meta 配置
 * hidden=true表示在导航上默认不展示
 * requiresAuth=true 表示需要身份验证即需要登录
 * scrollTop=true 切换路由时，页面滚动到顶部，默认是true
 */
import Vue from 'vue'
import Router from 'vue-router'
import nodeRoute from './node'
import accountRoute from './account'
import resourceRoute from './resource'
import userRoute from './user'
import resourceMarket from './resource-market'
import Container from 'views/layout/container.vue'

Vue.use(Router)

import {layout, login, error, aboutView, helpView, pageBuildPreview} from '@/views/index'

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}
    if (to.hash) {
      position.selector = to.hash
    }

    if (to.meta.scrollToTop !== false) {
      position.x = 0
      position.y = 0
    }
    return position
  }
}

export default new Router({
  mode: 'history',
  scrollBehavior,
  routes: [
    accountRoute,
    userRoute,
    resourceMarket,
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
