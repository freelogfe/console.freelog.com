// resolve => require.ensure([], () => resolve(require('xxx')), 'common') webpack静态语法分析
// import(/* webpackChunkName: "lodash" */ 'lodash');
// https://github.com/PanJiaChen/vue-element-admin/tree/master/src/router

import PolicyTplViews from '@/views/policy-tpl'
import ResourceViews from '@/views/resource'
import NodeViews from '@/views/node'
// import GroupViews from '@/views/group'

const container = resolve => require.ensure([], () => resolve(require('@/views/layout/container.vue')), 'common')
const layout = resolve => require.ensure([], () => resolve(require('@/views/layout/layout.vue')), 'common')
const error = resolve => require.ensure([], () => resolve(require('@/views/error.vue')), 'common')
const aboutView = resolve => require.ensure([], () => resolve(require('@/views/about/index.vue')), 'other')
const helpView = resolve => require.ensure([], () => resolve(require('@/views/help/index.vue')), 'other')
const mainView = resolve => require.ensure([], () => resolve(require('@/views/main/index.vue')), 'index')
const userView = resolve => require.ensure([], () => resolve(require('@/views/user/setting/index.vue')), 'user')

export const views = {
  layout,
  container,
  aboutView,
  helpView,
  error,
  mainView,
  userView,
  ...ResourceViews,
  ...NodeViews
}

export default {
  layout,
  container,
  aboutView,
  helpView,
  error,
  mainView,
  userView,
  ...ResourceViews,
  ...NodeViews,
  // ...GroupViews,
  ...PolicyTplViews
}
