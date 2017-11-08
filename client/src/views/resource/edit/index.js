export default {
  name: 'resource-detail-edit',
  data() {
    return {
      detail: {},
      rules: {},
      metas: []
    }
  },

  mounted() {
    var self = this;
    if (this.$route.query.resourceId) {
      this.load(this.$route.query.resourceId)
        .then((detail) => {
          Object.entries(detail.meta).forEach((entry) => {
            self.addMetaHandler(entry[0], entry[1]);
          })
        })
    } else {
      this.$message.error('缺少参数resourceId');
    }
  },
  methods: {
    addMetaHandler(key, value) {
      console.log(key);
      this.metas.push({
        key: key || '',
        value: value || ''
      })
    },
    deleteMetaHandler(index) {
      this.metas.splice(index, 1)
    },
    load(param) {
      return this.$services.resource.get(param || {})
        .then((res) => {
          return (this.detail = res.getData());
        }).catch((err)=>{
          this.$message.error(err.response.errorMsg || err)
        })
    },
    resolveMeta() {
      var metas = this.metas;
      this.detail.meta = {}
      metas.forEach((meta) => {
        this.detail.meta[meta.key] = meta.value
      })
    },
    saveHandler(form) {
      const mutableKeys = ['resourceName', 'meta'];
      var data = {}

      this.resolveMeta()
      mutableKeys.forEach((k) => {
        data[k] = this.detail[k]
      })

      // data.meta = JSON.stringify(data.meta)
      this.$services.resource.put(this.detail.resourceId, data)
        .then((res)=>{
        this.$message.success('更新成功')
        }).catch((err)=>{
        this.$message.error(err.response.errorMsg || err)
      })
    },
    backToList () {
      this.$router.push({
        path : '/resource/list',
      })
    }
  }
}
