//resolve => require.ensure([], () => resolve(require('xxx')), 'common') webpack静态语法分析

export const layout = resolve => require.ensure([], () => resolve(require('@/views/layout/layout.vue')), 'common')
export const login = resolve => require.ensure([], () => resolve(require('@/views/login/index.vue')), 'login');
export const error = resolve => require.ensure([], () => resolve(require('@/views/error.vue')), 'common');
export const resourceCreator = resolve => require.ensure([], () => resolve(require('@/views/resource/create/index.vue')), 'resource')
export const resourceUpdator = resolve => require.ensure([], () => resolve(require('@/views/main/index')), 'dashboard');
export const resourcePolicyCreator = resolve => require.ensure([], () => resolve(require('@/views/resource/policy/create/index.vue')), 'resource')
export const resourcePolicyUpdator = resolve => require.ensure([], () => resolve(require('@/views/main/index')), 'dashboard')
export const resourceList = resolve => require.ensure([], () => resolve(require('@/views/main/index')), 'dashboard')
export const resourceDetail = resolve => require.ensure([], () => resolve(require('@/views/main/index')), 'dashboard')

export const nodeCreator = resolve => require.ensure([], () => resolve(require('@/views/node/create/index.vue')), 'node')
export const nodeUpdator = resolve => require.ensure([], () => resolve(require('../views/main/index')), 'dashboard')
export const nodeList = resolve => require.ensure([], () => resolve(require('../views/main/index')), 'dashboard')
export const nodeDetail = resolve => require.ensure([], () => resolve(require('../views/main/index')), 'dashboard')


export default {
  layout,
  login,
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
  nodeDetail
}
