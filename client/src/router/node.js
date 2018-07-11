import store from '../store'
import {nprogress} from '../lib'

import Views from '@/views'

//节点操作相关的页面
export const nodeItemRoute = {
  path: ':nodeId',
  component: Views.container,
  hidden: true,
  meta: {
    requiresAuth: true,
    title: ':nodeId节点' //:key 可动态通过route.params上的k-v进行替换
  },
  children: [
    {
      path: 'presentables',
      meta: {
        requiresAuth: true,
        title: 'presentables',
        type: 'node'  //nav router type
      },
      component: Views.presentableList
    },
    {
      path: 'contracts',
      meta: {
        requiresAuth: true,
        title: '资源合同',
        type: 'node'
      },
      component: Views.contractList
    },
    {
      path: 'presentable',
      meta: {
        requiresAuth: true,
        title: 'presentable',
        type: 'node'
      },
      hidden: true,
      component: Views.container,
      redirect: '/node/:nodeId/presentable',
      children: [
        {
          path: ':presentableId',
          meta: {
            requiresAuth: true,
            title: '节点资源详情',
            type: 'node'
          },
          component: Views.presentableDetail,
        },
        {
          path: ':presentableId/scheme_detail',
          meta: {
            requiresAuth: true,
            title: '资源依赖授权管理',
            type: 'node'
          },
          component: Views.presentableSchemeDetail
        },
        {
          path: 'detail',
          meta: {
            requiresAuth: true,
            title: '节点资源详情',
            type: 'node'
          },
          component: Views.presentableDetail
        },
        {
          path: 'create',
          meta: {
            requiresAuth: true,
            title: '创建presentable',
            type: 'node'
          },
          component: Views.presentableCreator
        }
      ]
    },
    {
      path: 'setting',
      meta: {
        requiresAuth: true,
        title: '节点设置'
      },
      component: Views.container,
      children: [
        {
          path: 'pagebuilds',
          meta: {
            requiresAuth: true,
            title: 'PageBuild管理',
            type: 'node'
          },
          component: Views.pagebuildList
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
  component: Views.container,
  redirect: '/',
  children: [
    {
      path: 'create',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '创建节点'
      },
      component: Views.nodeCreator
    },
    {
      path: 'list',
      meta: {
        requiresAuth: true,
        type: 'node',
        title: '节点列表'
      },
      component: Views.nodeList
    },
    {
      path: 'policy_tpl/list',
      meta: {
        requiresAuth: true,
        title: '策略模板列表',
        type: 'node'
      },
      component: Views.policyTplList
    },
    {
      path: 'policy_tpl',
      hidden: true,
      meta: {
        requiresAuth: true,
        type: 'node'
      },
      component: Views.container,
      redirect: '/node/policy_tpl/list',
      children: [
        {
          path: 'create',
          hidden: true,
          meta: {
            requiresAuth: true,
            title: '创建策略模板',
            type: 'node'
          },
          component: Views.policyTplCreator
        },
        {
          path: 'detail',
          hidden: true,
          meta: {
            requiresAuth: true,
            title: '策略模板详情',
            type: 'node'
          },
          component: Views.policyTplDetail
        }
      ]
    },
    {
      path: ':nodeId',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '节点详情'
      },
      component: Views.nodeDetail
    },
    nodeItemRoute,
  ]
}
