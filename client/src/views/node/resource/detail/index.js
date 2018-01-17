export default {
  name: 'resource-detail',
  data() {
    return {
      detail: {},
    }
  },

  mounted() {
    if (this.$route.query.resourceId) {
      this.load(this.$route.query.resourceId)
    } else {
      this.$message.error('缺少参数resourceId');
    }
  },
  methods: {
    load(param) {
      return this.$services.resource.get(param || {})
        .then((res) => {
          return (this.detail = res.getData());
        }).catch((err)=>{
          this.$message.error(err.response.errorMsg || err)
        })
    },
    bakcToList(){
      this.$router.push({
        path: `/node/${this.$route.params.nodeId}/resources`,
      })
    },
    gotoCreateContract(resource) {
      var query = {
        resourceName: resource.resourceName,
        resourceType : resource.resourceType,
        resourceId: resource.resourceId
      }

      this.$router.push({
        path: `/node/${this.$route.params.nodeId}/presentable/create`,
        query: query
      })
    },
  }
}
