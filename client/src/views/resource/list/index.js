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
      this.$router.push({path: '/resource/policy/create', query: {resourceId: resource.resourceId}})
    },
    handleEdit(resource) {
      this.$router.push({path: '/resource/detail/edit', query: {resourceId: resource.resourceId}})
    }
  }
}
