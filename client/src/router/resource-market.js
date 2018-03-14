/**
 * 资源市场
 */
import Container from 'views/layout/container.vue'

import {
  layout,
  resourceDetail,
  nodeResourceList
} from '@/views'

export default {
  name: 'resources',
  path: '/resources',
  component: layout,
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
      component: nodeResourceList
    },
    {
      path: 'detail',
      redirect: '/resources/market',
      hidden: true,
      meta: {
        type: 'node'
      },
      component: Container,
      children: [{
        path: ':resourceId',
        hidden: true,
        meta: {
          title: '资源详情',
          type: 'node'
        },
        component: resourceDetail
      }]
    }
  ]
}
