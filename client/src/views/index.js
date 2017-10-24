//resolve => require.ensure([], () => resolve(require('xxx')), 'common') webpack静态语法分析
//import(/* webpackChunkName: "lodash" */ 'lodash');
//https://github.com/PanJiaChen/vue-element-admin/tree/master/src/router

export const layout = resolve => require.ensure([], () => resolve(require('@/views/layout/layout.vue')), 'common')
export const error = resolve => require.ensure([], () => resolve(require('@/views/error.vue')), 'common');


export const login = resolve => require.ensure([], () => resolve(require('@/views/user/login/index.vue')), 'user');
export const signup = resolve => require.ensure([], () => resolve(require('@/views/user/signup/index.vue')), 'user');
export const resetPassword = resolve => require.ensure([], () => resolve(require('@/views/user/reset-password/index.vue')), 'user');

//资源管理
export const resourceCreator = resolve => require.ensure([], () => resolve(require('@/views/resource/create/index.vue')), 'resource')
export const resourceUpdator = resolve => require.ensure([], () => resolve(require('@/views/main/index')), 'dashboard');
export const resourcePolicyCreator = resolve => require.ensure([], () => resolve(require('@/views/resource/policy/create/index.vue')), 'resource')
export const resourcePolicyUpdator = resolve => require.ensure([], () => resolve(require('@/views/main/index')), 'dashboard')
export const resourceList = resolve => require.ensure([], () => resolve(require('@/views/resource/list/index.vue')), 'resource')
export const resourceDetail = resolve => require.ensure([], () => resolve(require('@/views/node/resource/detail/index.vue')), 'node')
export const resourceDetailEditor = resolve => require.ensure([], () => resolve(require('@/views/resource/edit/index.vue')), 'resource')

//node管理
export const nodeCreator = resolve => require.ensure([], () => resolve(require('@/views/node/create/index.vue')), 'node')
export const nodeUpdator = resolve => require.ensure([], () => resolve(require('@/views/node/create/index.vue')), 'node')
export const nodeList = resolve => require.ensure([], () => resolve(require('@/views/node/my-nodes/index.vue')), 'node')
export const nodeDetail = resolve => require.ensure([], () => resolve(require('@/views/node/detail/index.vue')), 'node')
export const nodePolicyManagement = resolve => require.ensure([], () => resolve(require('@/views/node/policyManagement/signment/index.vue')), 'node')

export const nodeResourceList = resolve => require.ensure([], () => resolve(require('@/views/node/resource/list/index.vue')), 'node')
export const nodePresentbles = resolve => require.ensure([], () => resolve(require('@/views/node/presentable/list/index.vue')), 'node')
export const nodeContracts = resolve => require.ensure([], () => resolve(require('@/views/node/contracts/list/index.vue')), 'node')
export const contractDetail = resolve => require.ensure([], () => resolve(require('@/views/node/contracts/detail/index.vue')), 'node')
export const createPresentable = resolve => require.ensure([], () => resolve(require('@/views/node/presentable/create/index.vue')), 'presentable')
export const presentableDetail = resolve => require.ensure([], () => resolve(require('@/views/node/presentable/detail/index.vue')), 'presentable')
export const pagebuildList = resolve => require.ensure([], () => resolve(require('@/views/node/page-build/list/index.vue')), 'pagebuild')

export default {
  layout,
  login,
  signup,
  resetPassword,
  error,
  resourceCreator,
  resourceUpdator,
  resourcePolicyCreator,
  resourcePolicyUpdator,
  resourceList,
  resourceDetail,
  nodeCreator,
  nodeUpdator,
  nodeList,
  nodeDetail,
  nodeResourceList,
  nodePolicyManagement,
  nodePresentbles,
  nodeContracts,

  createPresentable,
  presentableDetail,

  contractDetail,
  pagebuildList
}
