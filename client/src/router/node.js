import Container from 'views/layout/container.vue'

import {
  nodeCreator,
  nodeUpdator,
  nodeList,
  nodeDetail,
  nodeResourceList,
  resourceDetail,
  nodePolicyManagement,
  nodeMyResourceList
} from '@/views'

export default {
  path: 'node',
  meta: {
    requiresAuth: true,
    title: '节点管理系统'
  },
  component: Container,
  children: [
    {
      path: 'operation',
      meta: {
        requiresAuth: true,
        title: '节点操作'
      },
      component: Container,
      children: [
        {
          path: 'create',
          meta: {
            requiresAuth: true,
            title: '创建节点'
          },
          component: nodeCreator
        },
        {
          path: 'update',
          hidden: true,
          meta: {
            requiresAuth: true,
            title: '更新节点'
          },
          component: nodeUpdator
        }
      ]
    },
    {
      path: 'list',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '节点列表'
      },
      component: nodeList
    },
    {
      path: 'resources',
      meta: {
        requiresAuth: true,
        title: '资源列表'
      },
      component: nodeResourceList
    },
    {
      path: 'resources/mine',
      meta: {
        requiresAuth: true,
        title: '我的资源'
      },
      component: nodeMyResourceList
    },
    {
      path: 'resources/detail',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '资源详情'
      },
      component: resourceDetail
    },
    {
      path: 'detail',
      meta: {
        requiresAuth: true,
        title: '节点详情'
      },
      component: nodeDetail
    },
    {
      path: 'policyManagement',
      meta: {
        requiresAuth: true,
        title: '节点策略操作'
      },
      component: Container,
      children: [
        {
          path: 'sign',
          meta: {
            requiresAuth: true,
            title: '创建节点'
          },
          component: nodePolicyManagement
        },
      ]
    },
  ]
}
