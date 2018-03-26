/**
 * 资源市场
 */
import Views from '@/views'

export default {
  name: 'resources',
  path: '/resources',
  component: Views.layout,
  redirect: '/resources/market',
  meta: {
    requiresAuth: true,
    title: '资源市场'
  },
  children: [
    {
      path: 'market',
      hidden: true,
      meta: {
        type: 'node'
      },
      component: Views.nodeResourceList
    },
    {
      path: 'detail',
      redirect: '/resources/market',
      hidden: true,
      meta: {
        type: 'node'
      },
      component: Views.container,
      children: [{
        path: ':resourceId',
        hidden: true,
        meta: {
          title: '资源详情',
          type: 'node'
        },
        component: Views.nodeResourceDetail
      }]
    }
  ]
}
