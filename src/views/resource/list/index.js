import SearchInput from '@/components/SearchInput/index.vue'
import CONFIG from '@/config/index'
import ResourceItems from './list.vue'

const { RESOURCE_STATUS } = CONFIG

export default {
  name: 'resource-list',
  data() {
    return {
      resourceList: [],
      curTabName: 'self',
      RESOURCE_STATUS
    }
  },
  components: {
    ResourceItems,
    SearchInput
  },

  mounted() {
  },
  methods: {
    handleEdit(resource) {
      this.$router.push({ path: `/resource/detail/${resource.resourceId}` })
    },
    editAuthNode(resource) {
      this.$router.push({ path: `/resource/detail/${resource.resourceId}/auth_schemes` })
    },
    searchHandler(query) {
      this.$message.warning('未开发')
    }
  }
}
