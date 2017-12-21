import TableView from '@/components/TableView/index.vue'

const PAGE_BUILD_STATUS = {
  show: 1,
  hide: 2
}
export default {
  name: 'node-page-build-list',
  data() {
    return {
      pagebuildList: [],
      PAGE_BUILD_STATUS: PAGE_BUILD_STATUS
    }
  },
  mounted() {
    this.loader()
      .then((data) => {
        console.log(data)
        this.pagebuildList = data
      })
  },
  methods: {
    loader() {
      const self = this;
      var param = {
        nodeId: this.$route.params.nodeId
      };
      return this.$services.pagebuild.get({
        params: param
      }).then((res) => {
        var presentables = res.getData()
        var promises = []
        presentables.forEach((p) => {
          var promise = self.$services.resource.get(p.resourceId).then((resourceRes) => {
            p.resourceDetail = resourceRes.getData()
            return resourceRes
          })
          promises.push(promise)
        })

        return Promise.all(promises).then((resources) => {
          return res.getData()
        })
      })
    },
    updateStatus() {
      this.pagebuildList.forEach((item) => {
        item.status = PAGE_BUILD_STATUS.hide
      })
    },
    setDefaultPageBuildHandler(presentable, status) {
      status = status || PAGE_BUILD_STATUS.show
      this.$services.pagebuild.put(presentable.id, {
        nodeId: parseInt(this.$route.params.nodeId),
        status: status
      }).then((res) => {
        if (res.data.errcode === 0) {
          if (status === PAGE_BUILD_STATUS.show) {
            this.updateStatus()
          }
          presentable.status = status
          this.$message.success('设置成功')
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch((res) => {
        this.$message.error(res.response.errorMsg)
      })
    },
    handlePreview(presentable) {
      this.$router.push({
        path: `/node/${this.$route.params.nodeId}/presentable/detail`,
        query: {presentableId: presentable.presentableId}
      })
    }
  }
}
