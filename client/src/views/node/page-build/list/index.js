import ResourceDataLoader from '@/data/resource/loader'
import SearchResource from '../../../resource/search/index.vue'


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
      currentIndex: 1,
      showSearchResource: false
    }
  },
  components: {SearchResource},
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

      var resourceDetail = pb.resourceDetail;
      if (resourceDetail.previewImages.length) {
        pb.resourceDetail._previewImage = resourceDetail.previewImages[0]
      } else {
        resourceDetail._previewImage = ''
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
      var msg;
      if (pagebuild.status === PAGE_BUILD_STATUS.show) {
        msg = '确定取消使用该页面?'
      } else {
        msg = '确定选用该页面?'
      }

      this.$confirm(msg)
        .then(() => {
          this.setDefaultPageBuildHandler(pagebuild).then(() => {
            this.currentIndex = pagebuild.status === PAGE_BUILD_STATUS.show ? pagebuild.index : ''
          });
        }).catch(() => {
      })
    },
    addNewPageBuildHandler() {
      this.showSearchResource = true
      // this.$message.warning('还没开发呀呀呀')
    },
    gotoResourceDetailHandler(pagebuild) {
      this.$router.push(`/resource/detail/${pagebuild.resourceId}`)
    },
    addResourceHandler(resource) {
      this.createPresentable({
        nodeId: this.$route.params.nodeId,
        presentableName: resource.resourceName,
        resourceId: resource.resourceId
      }).then(presentable => {
        presentable.resourceDetail = Object.assign({}, resource);
        this.pagebuildList.push(this.formatPageBuild(presentable))
        this.showSearchResource = false
      }).catch(this.$error.showErrorMessage);
    },
    createPresentable(data) {
      return this.$services.presentables.post(data).then(res => {
        if (res.data.errcode !== 0) {
          return Promise.reject(res.data.msg)
        } else {
          return res.getData()
        }
      })
    }
  }
}
