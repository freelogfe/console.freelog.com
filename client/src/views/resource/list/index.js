import TableView from '@/components/TableView/index.vue'

export default {
  name: 'resource-list',
  data() {
    return {
      resourceList: [],
      RESOURCE_STATUS: ['未知状态', '正常', '发布', '冻结']
    }
  },
  components: {
    TableView
  },

  mounted() {
  },
  methods: {
    loader() {
      return (param) => {
        if (typeof param === 'object') {
          param = {
            params: param
          }
        }
        return this.$services.resource.get(param || {})
      }
    },
    handlePolicy(resource) {
      this.$router.push({path: '/resource/policy/create', query: {resourceId: resource.resourceId}})
    },
    handleEdit(resource) {
      this.$router.push({path: '/resource/detail/edit', query: {resourceId: resource.resourceId}})
    }
  }
}
