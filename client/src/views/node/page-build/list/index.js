const PAGE_BUILD_STATUS = {
  show: 1,
  hide: 2
}
export default {
  name: 'node-page-build-list',
  data() {
    return {
      pagebuildList: [],
      PAGE_BUILD_STATUS: PAGE_BUILD_STATUS,
      currentIndex: 1
    }
  },
  mounted() {
    this.loader()
      .then(this.format.bind(this))
      .then((data) => {
        this.pagebuildList = [1, 2, 3].map(n => {
          return {
            index: n
          }
        })
        // this.pagebuildList = data
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
        var promises = [];
        var promises2 = [];
        presentables.forEach((p) => {
          var promise = self.$services.resource.get(p.resourceId).then((resourceRes) => {
            p.resourceDetail = resourceRes.getData()
            return resourceRes
          })
          promises.push(promise)

          var promise2 = self.$services.pbStatics.get({params: {presentableIds: p.presentableId}}).then((resourceRes) => {
            p.pbStatics = resourceRes.getData()[0]
            return resourceRes
          })
          promises2.push(promise2)
        })

        return Promise.all(promises.concat(promises2)).then((resources) => {
          return presentables
        })
      })
    },
    format(pagebuildList) {
      console.log('pagebuildList', pagebuildList)
      pagebuildList.forEach((item) => {
        item.statusInfo = (item.status === PAGE_BUILD_STATUS.show) ? {
          desc: '默认展示',
          type: 'success'
        } : {
          desc: '不展示',
          type: 'info'
        }
      })
      return pagebuildList
    },
    updateStatus() {
      this.pagebuildList.forEach((item) => {
        item.status = PAGE_BUILD_STATUS.hide
      })
    },
    setDefaultPageBuildHandler(presentable, status) {
      status = status || PAGE_BUILD_STATUS.show
      var param = {
        nodeId: parseInt(this.$route.params.nodeId),
        status: status
      }
      this.changePageBuildShowStatus(presentable, param)
    },
    changePageBuildShowStatus(presentable, param) {
      this.$services.pagebuild.put(presentable.id, param)
        .then((res) => {
          if (res.data.errcode === 0) {
            if (param.status === PAGE_BUILD_STATUS.show) {
              this.updateStatus()
            }
            presentable.status = param.status
            this.format(this.pagebuildList)
            this.$message.success('设置成功')
          } else {
            throw new Error(res.data.msg)
          }
        }).catch(this.$error.showErrorMessage)
    },
    handlePreview(presentable) {
      this.$router.push({
        path: `/node/${this.$route.params.nodeId}/presentable/detail`,
        query: {presentableId: presentable.presentableId, ispb: true}
      })
    },
    changePageBuildHandler(pagebuild) {
      this.currentIndex = pagebuild.index
    }
  }
}
