const nodeCreator = resolve => require.ensure([], () => resolve(require('./create/index.vue')), 'node')
const nodeList = resolve => require.ensure([], () => resolve(require('./list/index.vue')), 'node')
const nodeDetail = resolve => require.ensure([], () => resolve(require('./detail/index.vue')), 'node')
const nodeLogin = resolve => require.ensure([], () => resolve(require('./login/index.vue')), 'node')
const nodeResourceList = resolve => require.ensure([], () => resolve(require('./resource/list/index.vue')), 'node')
const nodeResourceDetail = resolve => require.ensure([], () => resolve(require('./resource/detail/index.vue')), 'node')
const presentableCreator = resolve => require.ensure([], () => resolve(require('./presentable/create/index.vue')), 'node')
const presentableDetail = resolve => require.ensure([], () => resolve(require('./presentable/detail/index.vue')), 'node')
const presentableList = resolve => require.ensure([], () => resolve(require('./presentables/index.vue')), 'node')
const pagebuildList = resolve => require.ensure([], () => resolve(require('./page-build/list/index.vue')), 'node')

const contractList = resolve => require.ensure([], () => resolve(require('./contract/list/index.vue')), 'node')


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
  contractList
}
