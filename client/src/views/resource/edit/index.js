export default {
  name: 'resource-detail-edit',
  data() {
    return {
      detail: {},
      rules: {}
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
          var data = res.data
          if (data.ret === 0) {
            this.detail = data.data
            return data.data;
          } else {
            this.$message.error(data.msg);
          }
        })
    },
    saveHandler(form){

    }
  }
}
