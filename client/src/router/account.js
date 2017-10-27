import {layout, userSetting}  from '@/views/index'

export default  {
  name: 'account',
  path: '/account',
  meta: {
    requiresAuth: true,
    title: '账户'
  },
  component: layout,
  redirect: '/account/settings',
  children: [
    {
      path: 'settings',
      meta: {
        requiresAuth: true,
        title: '账户设置'
      },
      component: userSetting
    }
  ]
}
