import Container from 'views/layout/container.vue'
import store from '../store'
import {
  nodeCreator,
  nodeUpdator,
  nodeList,
  nodeDetail,
  nodeResourceList,
  resourceDetail,
  createPresentable,
  presentableDetail,
  presentablesView,
  pagebuildList,
  contractsView,
  NodeLoginView
} from '@/views'

function requireNodeLogin(to, from, next) {
  store.dispatch('checkNode')
    .then(nodeInfo => {
      if (nodeInfo) {
        if (/:nodeId/.test(to.path)) {
          next({path: to.path.replace(':nodeId', nodeInfo.nodeId)})
        } else {
          next()
        }
      } else {
        next({path: '/node/login', query: {redirect: to.fullPath}})
      }
    })
}

//节点操作相关的页面
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
      path: 'presentables',
      beforeEnter: requireNodeLogin,
      meta: {
        requiresAuth: true,
        title: 'presentables'
      },
      component: presentablesView
    },
    {
      path: 'contracts',
      beforeEnter: requireNodeLogin,
      meta: {
        requiresAuth: true,
        title: '资源合同'
      },
      component: contractsView
    },
    {
      path: 'presentable',
      meta: {
        requiresAuth: true,
        title: 'presentable'
      },
      hidden: true,
      component: Container,
      redirect: '/node/:nodeId/presentables',
      children: [
        {
          path: 'detail',
          beforeEnter: requireNodeLogin,
          meta: {
            requiresAuth: true,
            title: 'presentable详情'
          },
          component: presentableDetail
        },
        {
          path: 'create',
          beforeEnter: requireNodeLogin,
          meta: {
            requiresAuth: true,
            title: '创建presentable'
          },
          component: createPresentable
        }
      ]
    },
    {
      path: 'setting',
      meta: {
        requiresAuth: true,
        title: 'setting'
      },
      component: Container,
      children: [
        {
          path: 'pagebuilds',
          beforeEnter: requireNodeLogin,
          meta: {
            requiresAuth: true,
            title: 'PageBuild管理'
          },
          component: pagebuildList
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
      hidden: true,
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
      path: 'detail/:nodeId',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '节点详情'
      },
      component: nodeDetail
    },
    {
      path: 'login',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '节点登录'
      },
      component: NodeLoginView
    },
    nodeItemRoute,
  ]
}
