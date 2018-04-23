import TableView from '@/components/TableView/index.vue'
import CONFIG from '@/config/index'

const {RESOURCE_STATUS} = CONFIG

export default {
  name: 'resource-list',
  data() {
    return {
      resourceList: [],
      RESOURCE_STATUS: RESOURCE_STATUS
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
      this.$router.push({path: '/resource/detail#policy', query: {resourceId: resource.resourceId}})
    },
    handleEdit(resource) {
      this.$router.push({path: '/resource/detail', query: {resourceId: resource.resourceId}})
    },
    createAuthNode(resource) {
      this.$router.push({path: '/resource/detail#authnode', query: {resourceId: resource.resourceId}})
    }
  }
}
