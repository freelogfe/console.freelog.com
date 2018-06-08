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
        this.pagebuildList = data.map((item, index) => {
          item.index = index
          return item
        });
        console.log(this.pagebuildList)
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
        presentables.forEach((p) => {
          var promise = self.$services.resource.get(p.resourceId).then((resourceRes) => {
            p.resourceDetail = resourceRes.getData()
            if (p.resourceDetail.previewImages.length) {
              p.resourceDetail._previewImage = p.resourceDetail.previewImages[0]
            } else {
              p.resourceDetail._previewImage = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527660657079&di=44f93c3efc9bf6e81a4996ae1e10b886&imgtype=0&src=http%3A%2F%2Fgb.cri.cn%2Fmmsource%2Fimages%2F2014%2F04%2F08%2F90%2F13642159619414055870.jpg'
            }
            return resourceRes
          })
          promises.push(promise)
        })

        return Promise.all(promises).then((resources) => {
          return presentables
        })
      })
    },
    format(pagebuildList) {
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
