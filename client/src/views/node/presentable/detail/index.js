
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
          return (this.detail = res.getData());
        }).catch((err)=>{
          this.$message.error(err.response.errorMsg || err)
        })
    },
    updateDetail(formName) {
      const self = this;
    }
  }
}
