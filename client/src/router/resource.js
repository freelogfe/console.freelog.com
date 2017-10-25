import Container from 'views/layout/container.vue'

import {
  resourceCreator,
  resourceUpdator,
  resourcePolicyCreator,
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
        title: '资源列表'
      },
      component: resourceList
    },
    {
      path: 'detail/edit',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '编辑资源详情'
      },
      component: resourceDetailEditor
    },
    {
      path: 'policy',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '资源策略管理'
      },
      component: Container,
      children: [
        {
          path: 'create',
          hidden: true,
          meta: {
            requiresAuth: true,
            title: '创建策略'
          },
          component: resolve => require.ensure([], () => resolve(require('@/views/resource/policy/create/index.vue')), 'resource')
        },

      ]
    },
  ]
}
