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
    gotoCreateContract(resource) {
      var query = {
        resourceName: resource.resourceName,
        resourceId: resource.resourceId
      }
      if (resource.systemMeta && resource.systemMeta.widgets) {
        query.widgets = JSON.stringify(resource.systemMeta.widgets)
      }
      this.$router.push({
        path: `/node/${this.$route.params.nodeId}/policyManagement/sign`,
        query: query
      })
    },
    handleContact(resource) {
      switch (resource.status) {
        case 1:
          this.$message.warning('该资源还没创建policy，无法创建合同');
          break;
        case 2:
          this.gotoCreateContract(resource)
          break;
        case 3:
          this.$message.warning('该资源已被冻结');
          break;
        default:
          this.$message.warning('未知资源状态');
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
