import Container from 'views/layout/container.vue'

import {
  nodeCreator,
  nodeUpdator,
  nodeList,
  nodeDetail,
  nodeResourceList,
  resourceDetail,
  nodePolicyManagement,
  nodePresentbles,
  nodeContracts,
  createPresentable,
  presentableDetail,
  contractDetail,
  pagebuildList,
  contractEventSignment
} from '@/views'

export const nodeItemRoute = {
  path: ':nodeId',
    component: Container,
    hidden: true,
    meta: {
    requiresAuth: true,
      title: ':nodeId节点' //:key 可动态通过route.params上的k-v进行替换
  },
  redirect: '/node/:nodeId/presentables',
  children: [
    {
      path: 'resources',
      meta: {
        requiresAuth: true,
        title: '资源市场'
      },
      component: nodeResourceList
    },
    {
      path: 'pagebuilds',
      meta: {
        requiresAuth: true,
        title: 'pagebuild列表'
      },
      component: pagebuildList
    },
    {
      path: 'presentables',
      meta: {
        requiresAuth: true,
        title: 'presentables'
      },
      component: nodePresentbles
    },
    {
      path: 'contracts',
      meta: {
        requiresAuth: true,
        title: 'contracts'
      },
      component: nodeContracts
    },
    {
      path: 'contract/detail',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '合同详情'
      },
      component: contractDetail
    },
    {
      path: 'contract/event/signment',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '签署'
      },
      component: contractEventSignment
    },
    {
      path: 'presentable',
      meta: {
        requiresAuth: true,
        title: 'presentable'
      },
      hidden: true,
      component: Container,
      children: [
        {
          path: 'detail',
          meta: {
            requiresAuth: true,
            title: 'presentable详情'
          },
          component: presentableDetail
        },
        {
          path: 'edit',
          meta: {
            requiresAuth: true,
            title: 'presentable详情'
          },
          component: presentableDetail
        },
        {
          path: 'create',
          meta: {
            requiresAuth: true,
            title: '创建presentable'
          },
          component: createPresentable
        }
      ]
    },
    {
      path: 'resource/detail',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '资源详情'
      },
      component: resourceDetail
    },
    {
      path: 'policyManagement',
      hidden: true,
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
            title: '创建合同'
          },
          component: nodePolicyManagement
        },
      ]
    }
  ]
};

export default {
  path: 'node',
  meta: {
    requiresAuth: true,
    title: '节点管理系统'
  },
  component: Container,
  redirect: '/node/list',
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
      path: 'edit',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '更新节点'
      },
      component: nodeUpdator
    },
    {
      path: 'list',
      meta: {
        requiresAuth: true,
        title: '节点列表'
      },
      component: nodeList
    },
    {
      path: 'detail',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '节点详情'
      },
      component: nodeDetail
    },
    nodeItemRoute,
  ]
}
