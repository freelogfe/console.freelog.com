/**
 * 资源管理系统
 */
import Views from '@/views'

export default {
  name: 'resource',
  path: 'resource',
  meta: {
    requiresAuth: true,
    title: '资源管理系统'
  },
  component: Views.container,
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
      component: Views.resourceCreator,
    },
    {
      path: 'list',
      meta: {
        requiresAuth: true,
        title: '我的资源',
        type: 'resource'
      },
      component: Views.resourceList
    },
    {
      path: 'detail',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '编辑资源详情',
        type: 'resource'
      },
      component: Views.resourceDetail
    },
    {
      path: 'policy_tpl/list',
      meta: {
        requiresAuth: true,
        title: '资源策略模板列表',
        type: 'resource'
      },
      component: Views.policyTplList
    },
    {
      path: 'policy_tpl',
      hidden: true,
      meta: {
        requiresAuth: true,
        type: 'resource'
      },
      component: Views.container,
      redirect: '/resource/policy_tpl/list',
      children: [
        {
          path: 'create',
          hidden: true,
          meta: {
            requiresAuth: true,
            title: '创建资源策略模板',
            type: 'resource'
          },
          component: Views.policyTplCreator
        },
        {
          path: 'detail',
          hidden: true,
          meta: {
            requiresAuth: true,
            title: '资源策略模板详情',
            type: 'resource'
          },
          component: Views.policyTplDetail
        }
      ]
    }
  ]
}
