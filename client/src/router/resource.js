/**
 * 资源管理系统
 */
import Container from 'views/layout/container.vue'

import {
  resourceCreator,
  resourceUpdator,
  resourcePolicyUpdator,
  resourceList,
  authNodeList,
  resourceDetailEditor,
  resourceCreateAuthNode
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
        title: '创建资源',
        type: 'resource'
      },
      component: resourceCreator,
    },
    {
      path: 'update',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '更新资源',
        type: 'resource'
      },
      component: resourceUpdator
    },
    {
      path: 'list',
      meta: {
        requiresAuth: true,
        title: '我的资源',
        type: 'resource'
      },
      component: resourceList
    },
    {
      path: 'detail',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '编辑资源详情',
        type: 'resource'
      },
      component: resourceDetailEditor
    },
    {
      path: 'authnode',
      hidden:true,
      meta: {
        requiresAuth: true,
        title: '创建授权点',
        type: 'resource'
      },
      component: resourceCreateAuthNode
    },
    {
      path: 'authnodemanagement',
      meta: {
        requiresAuth: true,
        title: '授权合同管理',
        type: 'resource'
      },
      component: authNodeList
    },
  ]
}
