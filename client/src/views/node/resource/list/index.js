import TableView from '@/components/TableView/index.vue'

export default {
  name: 'node-resource-list',
  data() {
    return {
      resourceList: [],
      query: ''
    }
  },
  components: {
    TableView
  },

  mounted() {
  },
  methods: {
    querySearchAsync() {

    },
    handleSelectSearchItem() {

    },
    queryHandler() {
      this.$message.warning('待开发')
    },
    loader() {
      return (param) => {
        if (typeof param === 'object') {
          param = {
            params: param
          }
        }
        return this.$services.g_Resources.get(param || {})
      }
    },
    handleContact(resource) {
      if (!resource.policyId) {
        this.$message.warning('该资源还没创建policy，无法进行创建合同');
      } else {
        var query = {
          resourceName: resource.resourceName,
          policyId: resource.policyId,
          resourceId: resource.resourceId
        }
        if (resource.systemMeta && resource.systemMeta.widgets) {
          query.widgets = JSON.stringify(resource.systemMeta.widgets)
        }
        this.$router.push({
          path: `/node/${this.$route.params.nodeId}/policyManagement/sign`,
          query: query
        })
      }
    },
    previewResourceHandler(resource) {
      this.$router.push({
        path: `/node/${this.$route.params.nodeId}/resource/detail`,
        query: {resourceId: resource.resourceId}
      })
    }
  }
}
