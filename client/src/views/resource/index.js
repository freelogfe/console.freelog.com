const resourceCreator = resolve => require.ensure([], () => resolve(require('./create/index.vue')), 'resource')
const resourceDetail = resolve => require.ensure([], () => resolve(require('./detail/index.vue')), 'resource')
const resourceList = resolve => require.ensure([], () => resolve(require('./list/index.vue')), 'resource')
const pageBuildPreview = resolve => require.ensure([], () => resolve(require('./create/preview.vue')), 'resource')
const resourceAuthSchemeEditor = resolve => require.ensure([], () => resolve(require('./auth-scheme/index.vue')), 'resource')
const resourceEditor = resolve => require.ensure([], () => resolve(require('./edit/index.vue')), 'resource')


export default {resourceCreator, resourceEditor, resourceDetail, resourceList, pageBuildPreview, resourceAuthSchemeEditor}
