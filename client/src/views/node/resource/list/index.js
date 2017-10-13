import TableView from '@/components/TableView/index.vue'

export default {
  name: 'node-resource-list',
  data() {
    return {
      resourceList: []
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
        return this.$services.g_Resources.get(param || {})
      }
    },
    handlePolicy(resource) {
      this.$router.push({path: '/node/policyManagement/sign', query: {resourceId: resource.resourceId}})
    },
    handleEdit(resource) {
      this.$router.push({path: '/node/resources/detail', query: {resourceId: resource.resourceId}})
    }
  }
}
