import TableView from '@/components/TableView/index.vue'

export default {
  name: 'node-resource-list',
  data() {
    return {
      resourceList: [],
      query:''
    }
  },
  components: {
    TableView
  },

  mounted() {
  },
  methods: {
    querySearchAsync(){

    },
    handleSelectSearchItem(){

    },
    queryHandler(){
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
    handlePolicy(resource) {
      this.$router.push({path: '/node/policyManagement/sign', query: {resourceId: resource.resourceId}})
    },
    handleEdit(resource) {
      this.$router.push({path: '/node/resources/detail', query: {resourceId: resource.resourceId}})
    }
  }
}
