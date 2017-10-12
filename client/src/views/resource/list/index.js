import TableView from '@/components/TableView/index.vue'

export default {
  name: 'resource-list',
  data() {
    return {
      resourceList: []
    }
  },
  components: {
    TableView
  },

  mounted() {
    this.load()
  },
  methods: {
    load(param) {
      return this.$services.resource.get(param || {})
        .then((res) => {
          var data = res.data
          if (data.ret === 0) {
            this.resourceList = data.data
            return data.data;
          } else {
            this.$message.error(data.msg);
          }
        })
    },
    handlePolicy(resource) {
      this.$router.push({path: '/resource/policy/create', query: {resourceId: resource.resourceId}})
    },
    handleEdit(resource) {
      this.$router.push({path: '/resource/detail', query: {resourceId: resource.resourceId}})
    }
  }
}
