const nodeCreator = resolve => require.ensure([], () => resolve(require('./create/index.vue')), 'node')
const nodeList = resolve => require.ensure([], () => resolve(require('./list/index.vue')), 'node')
const nodeDetail = resolve => require.ensure([], () => resolve(require('./detail/index.vue')), 'node')
const nodeLogin = resolve => require.ensure([], () => resolve(require('./login/index.vue')), 'node')
const nodeResourceList = resolve => require.ensure([], () => resolve(require('./resource/list/index.vue')), 'node')
const nodeResourceDetail = resolve => require.ensure([], () => resolve(require('./resource/detail/index.vue')), 'node')

const presentableCreator = resolve => require.ensure([], () => resolve(require('./presentable/create/index.vue')), 'presentable')
const presentableDetail = resolve => require.ensure([], () => resolve(require('./presentable/detail/index.vue')), 'presentable')
const presentableSchemeDetail = resolve => require.ensure([], () => resolve(require('./presentable/auth-scheme/index.vue')), 'presentable')
const presentableList = resolve => require.ensure([], () => resolve(require('./presentables/index.vue')), 'presentable')


const pagebuildList = resolve => require.ensure([], () => resolve(require('./page-build/list/index.vue')), 'pagebuild')
const contractList = resolve => require.ensure([], () => resolve(require('./contract/list/index.vue')), 'contract')


export default {
  nodeCreator,
  nodeList,
  nodeDetail,
  nodeLogin,
  nodeResourceList,
  nodeResourceDetail,
  presentableCreator,
  presentableDetail,
  presentableList,
  pagebuildList,
  contractList,
  presentableSchemeDetail
}
