//resolve => require.ensure([], () => resolve(require('xxx')), 'common') webpack静态语法分析
//import(/* webpackChunkName: "lodash" */ 'lodash');
//https://github.com/PanJiaChen/vue-element-admin/tree/master/src/router

import PolicyTplViews from '@/views/policy-tpl'
import UserViews from '@/views/user'
import ResourceViews from '@/views/resource'
import NodeViews from '@/views/node'
import GroupViews from '@/views/group'

export const container = resolve => require.ensure([], () => resolve(require('@/views/layout/container.vue')), 'common')
export const layout = resolve => require.ensure([], () => resolve(require('@/views/layout/layout.vue')), 'common')
export const error = resolve => require.ensure([], () => resolve(require('@/views/error.vue')), 'common');
export const aboutView = resolve => require.ensure([], () => resolve(require('@/views/about/index.vue')), 'other')
export const helpView = resolve => require.ensure([], () => resolve(require('@/views/help/index.vue')), 'other')

export default {
  layout,
  container,
  aboutView,
  helpView,
  error,
  ...UserViews,
  ...ResourceViews,
  ...NodeViews,
  ...GroupViews,
  ...PolicyTplViews
}
