
export default {
  name: 'contract-detail',
  data() {
    return {
      detail: {}
    }
  },

  mounted() {
    if (this.$route.query.contractId) {
      this.load(this.$route.query.contractId)
    } else {
      this.$message.error('缺少参数contractId');
    }
  },
  methods: {
    load(param) {
      return this.$services.contract.get(param || {})
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
    updateNodeDetail(formName) {
      const self = this;
    }
  }
}
