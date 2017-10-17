
export default {
  name: 'presentable-detail',
  data() {
    return {
      detail: {}
    }
  },

  mounted() {
    const presentableId = this.$route.query.presentableId
    if (presentableId) {
      this.load(presentableId)
    } else {
      this.$message.error('缺少参数contractId');
    }
  },
  methods: {
    load(param) {
      return this.$services.presentables.get(param || {})
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
    updateDetail(formName) {
      const self = this;
    }
  }
}
