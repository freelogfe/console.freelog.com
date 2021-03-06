const resourceCreator = resolve => require.ensure([], () => resolve(require('./create/index.vue')), 'resource')
const resourceDetail = resolve => require.ensure([], () => resolve(require('./detail/index.vue')), 'resource-detail')
const resourceList = resolve => require.ensure([], () => resolve(require('./list/index.vue')), 'resource-list')
const resourceEditor = resolve => require.ensure([], () => resolve(require('./edit/index.vue')), 'resource-editor')


export default {
  resourceCreator,
  resourceEditor,
  resourceDetail,
  resourceList
}
