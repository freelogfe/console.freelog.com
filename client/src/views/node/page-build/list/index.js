import ResourceDataLoader from '@/data/resource/loader'


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
        this.pagebuildList = data;
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
          var promise = ResourceDataLoader.onloadResourceDetail(p.resourceId).then((resourceDetail) => {
            p.resourceDetail = resourceDetail
            if (p.resourceDetail.previewImages.length) {
              p.resourceDetail._previewImage = p.resourceDetail.previewImages[0]
            } else {
              // p.resourceDetail._previewImage = ''
            }
            return resourceDetail
          })
          promises.push(promise)
        })

        return Promise.all(promises).then((resources) => {
          return presentables
        })
      })
    },
    format(pagebuildList) {
      pagebuildList.forEach((item, index) => {
        item.index = index
        if (item.status === PAGE_BUILD_STATUS.show) {
          this.currentIndex = index
        }

        this.formatPageBuild(item)
      })
      return pagebuildList
    },
    formatPageBuild(pb) {
      if (pb.status === PAGE_BUILD_STATUS.show) {
        pb.statusInfo = {
          desc: '默认展示',
          type: 'success'
        }
      } else {
        pb.statusInfo = {
          desc: '不展示',
          type: 'info'
        }
      }

      return pb
    },
    updateStatus() {
      this.pagebuildList.forEach((item) => {
        item.status = PAGE_BUILD_STATUS.hide
      })
    },
    setDefaultPageBuildHandler(presentable, status) {
      if (!status) {
        //toggle
        status = (presentable.status === PAGE_BUILD_STATUS.show) ? PAGE_BUILD_STATUS.hide : PAGE_BUILD_STATUS.show
      }

      var param = {
        nodeId: parseInt(this.$route.params.nodeId),
        status: status
      }
      return this.changePageBuildShowStatus(presentable, param)
    },
    changePageBuildShowStatus(presentable, param) {
      return this.$services.pagebuild.put(presentable.id, param)
        .then((res) => {
          if (res.data.errcode === 0) {
            if (param.status === PAGE_BUILD_STATUS.show) {
              this.updateStatus()
            }
            presentable.status = param.status
            this.formatPageBuild(presentable)
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
      this.setDefaultPageBuildHandler(pagebuild).then(() => {
        this.currentIndex = pagebuild.status === PAGE_BUILD_STATUS.show ? pagebuild.index : ''
      });
    },
    addNewPageBuildHandler() {
      this.$message.warning('还没开发呀呀呀')
    },
    gotoResourceDetailHandler(pagebuild) {
      this.$router.push(`/resource/detail/${pagebuild.resourceId}`)
    }
  }
}
