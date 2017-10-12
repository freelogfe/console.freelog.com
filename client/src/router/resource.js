import Container from 'views/layout/container.vue'

import {
  resourceCreator,
  resourceUpdator,
  resourcePolicyCreator,
  resourcePolicyUpdator,
  resourceList,
  resourceDetail
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
      path: 'operation',
      meta: {
        requiresAuth: true,
        title: '资源操作'
      },
      component: Container,
      children: [
        {
          path: 'create',
          meta: {
            requiresAuth: true,
            title: '创建资源'
          },
          component: resourceCreator
        },
        {
          path: 'update',
          hidden: true,
          meta: {
            requiresAuth: true,
            title: '更新资源'
          },
          component: resourceUpdator
        }
      ]
    },
    {
      path: 'policy',
      meta: {
        requiresAuth: true,
        title: '资源策略操作'
      },
      component: Container,
      children: [
        {
          path: 'create',
          meta: {
            requiresAuth: true,
            title: '创建资源策略'
          },
          component: resourcePolicyCreator
        },
        {
          path: 'update',
          hidden: true,
          meta: {
            requiresAuth: true,
            title: '更新资源'
          },
          component: resourcePolicyUpdator
        }
      ]
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
      path: 'detail',
      meta: {
        requiresAuth: true,
        title: '资源详情'
      },
      component: resourceDetail
    },
    {
      path: 'policy',
      meta: {
        requiresAuth: true,
        title: '资源策略管理'
      },
      component: Container,
      children: [
        {
          path: 'create',
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
