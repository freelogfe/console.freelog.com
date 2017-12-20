import Container from 'views/layout/container.vue'

import {
  nodeCreator,
  nodeUpdator,
  nodeList,
  nodeDetail,
  nodeResourceList,
  resourceDetail,
  nodeContractCreator,
  createPresentable,
  presentableDetail,
  presentablesView,
  pagebuildList,

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
        title: 'PageBuild管理列表'
      },
      component: pagebuildList
    },
    {
      path: 'presentables',
      meta: {
        requiresAuth: true,
        title: 'presentables'
      },
      component: presentablesView
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
      path: 'contract',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '节点策略操作'
      },
      component: Container,
      children: [
        {
          path: 'create',
          meta: {
            requiresAuth: true,
            title: '创建合同'
          },
          component: nodeContractCreator
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
