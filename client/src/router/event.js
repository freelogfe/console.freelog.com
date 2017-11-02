import {layout,contractGuarantyView, signmentView}  from '@/views/index'

export default  {
  name: 'event',
  path: '/event',
  meta: {
    requiresAuth: true,
    title: '事件处理'
  },
  component: layout,
  children: [
    {
      path: 'signment',
      meta: {
        requiresAuth: true,
        title: '签署协议'
      },
      component: signmentView
    },
    {
      path: 'contractGuaranty',
      meta: {
        requiresAuth: true,
        title: '支付保证金'
      },
      component: contractGuarantyView
    }
  ]
}
