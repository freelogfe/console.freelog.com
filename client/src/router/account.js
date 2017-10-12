export default  {
  name: 'account',
  path: '/account',
  meta: {
    requiresAuth: true,
    title: '账户'
  },
  component: resolve => require.ensure([], () => resolve(require('@/views/layout/layout.vue')), 'common'),
  children: [
    {
      path: 'settings',
      meta: {
        requiresAuth: true,
        title: '账户设置'
      },
      component: resolve => require.ensure([], () => resolve(require('@/views/account/settings/index.vue')), 'account')
    }
  ]
}
