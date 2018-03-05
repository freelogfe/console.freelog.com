/**
 * 资源管理系统
 */
import Container from 'views/layout/container.vue'

import {
  GroupCreator,
  GroupDetail,
  GroupList,
} from '@/views'

export default {
  name: 'group',
  path: 'group',
  meta: {
    requiresAuth: true,
    title: '分组管理系统'
  },
  component: Container,
  redirect: '/group/list',
  children: [
    {
      path: 'create',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '创建分组'
      },
      component: GroupCreator,
    },
    {
      path: 'list',
      meta: {
        requiresAuth: true,
        title: '分组列表'
      },
      component: GroupList
    },
    {
      path: 'detail/:groupId',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '分组详情'
      },
      component: GroupDetail
    }
  ]
}
