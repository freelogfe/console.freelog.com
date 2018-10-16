/**
 * 资源管理系统
 */
import Views from '@/views'

export default {
  name: 'group',
  path: 'group',
  meta: {
    requiresAuth: true,
    title: '分组管理系统'
  },
  component: Views.container,
  redirect: '/group/list',
  children: [
    {
      path: 'create',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '创建分组'
      },
      component: Views.groupCreator,
    },
    {
      path: 'list',
      meta: {
        requiresAuth: true,
        title: '分组列表'
      },
      component: Views.groupList
    },
    {
      path: 'detail/:groupId',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '分组详情'
      },
      component: Views.groupDetail
    }
  ]
}
