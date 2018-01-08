import Container from 'views/layout/container.vue'

import {
  resourceCreator,
  resourceUpdator,
  resourcePolicyUpdator,
  resourceList,
  resourceDetailEditor
} from '@/views'

export default {
  name: 'resource',
  path: 'resource',
  meta: {
    requiresAuth: true,
    title: '资源管理系统'
  },
  component: Container,
  redirect: '/resource/list',
  children: [
    {
      path: 'create',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '创建资源'
      },
      component: resourceCreator,
    },
    {
      path: 'update',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '更新资源'
      },
      component: resourceUpdator
    },
    {
      path: 'list',
      meta: {
        requiresAuth: true,
        title: '我的资源'
      },
      component: resourceList
    },
    {
      path: 'detail',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '编辑资源详情'
      },
      component: resourceDetailEditor
    }
  ]
}
