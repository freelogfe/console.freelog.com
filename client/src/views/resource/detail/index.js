/*
policy更新后，后续签订的policy按新的来，已签约过的按更新前的
 */
import {mapGetters} from 'vuex'
import AuthSchemeDetail from './auth-scheme/index.vue'
import {loadDetail} from '@/data/resource/loader'
import NodeDataLoader from '@/data/node/loader'

export default {
  name: 'resource-detail',
  data() {
    return {
      resourceId: this.$route.params.resourceId,
      resourceDetail: {
        resourceInfo: {},
        isFavor: false
      },
      showAuthSchemes: false,
      animateCls: 'slideOutRight',
      showOptionsDialog: false,
      selectedNode: '',
      nodes: [],
      selectedNodes: [],
      contentTransform: 'none',
      selectedPolicy: {},
      showEdit: false
    }
  },
  computed: Object.assign({
    send: function () {
      return this.valid
    }
  }, mapGetters({
    session: 'session'
  })),
  components: {
    AuthSchemeDetail
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      loadDetail(this.resourceId).then((res) => {
        res._filesize = this.humanizeSize(res.systemMeta.fileSize)
        this.resourceDetail.resourceInfo = res
        if (this.session && this.session.user) {
          this.showEdit = (res.userId === this.session.user.userId)
        }
      });
      this.isFavorResource().then((isFavor) => {
        this.resourceDetail.isFavor = isFavor
      })
    },
    isFavorResource() {
      return this.$services.collections.get(this.resourceId).then((res) => {
        if (res.data.errcode === 0) {
          return !!res.data.data
        } else {
          throw new Error(res)
        }
      })
    },
    humanizeSize(number) {
      const UNITS = ['B', 'KB', 'MB', 'GB', 'TB'];

      if (number < 1) {
        return number + 'B';
      }

      const algorithm = 1024
      const exponent = Math.min(Math.floor(Math.log(number) / Math.log(algorithm)), UNITS.length - 1);
      number = Number((number / Math.pow(algorithm, exponent)).toPrecision(2));
      const unit = UNITS[exponent];

      return number + unit;
    },
    showAuthSchemeHandler() {
      this.animateCls = 'slideInRight'
      this.showAuthSchemes = true
      this.contentTransform = 'translate(-250px, 0)'
    },
    hideAuthSchemeHandler() {
      this.animateCls = 'slideOutRight'
      this.contentTransform = 'none'

      setTimeout(() => {
        this.showAuthSchemes = false
      }, 7e2);
    },
    previewHandler() {
      this.$message.warning('还没开发')
    },
    favorResource() {
      return this.$services.collections.post({
        resourceId: this.resourceId
      }).then((res) => {
        if (res.data.errcode === 0) {
          this.$message.success('收藏成功')
          this.resourceDetail.isFavor = true
        } else {
          this.$error.showErrorMessage(res)
        }
      })
    },
    deleteFavorResource() {
      return this.$services.collections.delete(this.resourceId).then((res) => {
        if (res.data.errcode === 0) {
          this.$message.success('已删除收藏')
          this.resourceDetail.isFavor = false
        } else {
          this.$error.showErrorMessage(res)
        }
      })
    },
    favorHandler() {
      if (this.favoring) {
        return
      }

      this.favoring = true;
      var callback
      if (!this.resourceDetail.isFavor) {
        callback = this.favorResource()
      } else {
        callback = this.deleteFavorResource()
      }

      callback.then(() => {
        this.favoring = false
      }).catch((err) => {
        this.favoring = false
        this.$error.showErrorMessage(err)
      })
    },
    loadNodes() {
      if (this.nodes.length) {
        return Promise.resolve(this.nodes)
      }

      return NodeDataLoader.onloadNodeList().then(data => {
        if (data && data.dataList) {
          return data.dataList
        } else {
          return []
        }
      });
    },
    showNodeOptions() {
      return new Promise((resolve, reject) => {
        this.loadNodes().then((nodes) => {
          this.nodes = nodes
          this.showOptionsDialog = true
          resolve(nodes)
        }).catch(reject)
      })
    },
    getResourceAuthHandler() {
      this.showNodeOptions().catch(this.$error.showErrorMessage)
      //
      // if (this.selectedPolicy.policy) {
      //   this.showNodeOptions().catch(this.$error.showErrorMessage)
      // } else {
      //   this.showAuthSchemeHandler()
      // }
    },
    hideOptionsDialogHandler() {
      this.showOptionsDialog = false
    },
    confirmAuthHandler() {
      this.hideOptionsDialogHandler()
      if (this.selectedNodes.length) {
        var promises = this.selectedNodes.map(nodeId => {
          return this.createPresentable(nodeId)
        });

        Promise.all(promises).then((list) => {
          console.log(list)
          this.$message.success('获取成功')
        }).catch(this.$error.showErrorMessage)
      }
    },
    createPresentable(nodeId) {
      var resourceInfo = this.resourceDetail.resourceInfo
      return this.$services.presentables.post({
        nodeId: nodeId,
        presentableName: resourceInfo.resourceName,
        resourceId: resourceInfo.resourceId
      }).then(res => {
        if (res.data.errcode !== 0) {
          return Promise.reject(res.data.msg)
        } else {
          return res.getData()
        }
      })
    },
    selectPolicyHandler(scheme, policy) {
      this.selectedPolicy.scheme = scheme;
      this.selectedPolicy.policy = policy
      console.log(this.selectedPolicy)
    },
    editDetailHandler() {
      this.$router.push(`/resource/edit/${this.resourceId}`)
    }
  }
}
