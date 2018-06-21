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
      showOptionsDialog: false,
      selectedNode: '',
      nodes: [],
      contentTransform: 'none',
      selectedPolicy: {}
    }
  },
  computed: Object.assign({
    isOwnerResource: function () {
      return this.resourceDetail.resourceInfo.isOwner
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

        if (this.session && this.session.user) {
          res.isOwner = (res.userId === this.session.user.userId)
        } else {
          res.isOwner = false
        }
        this.resourceDetail.resourceInfo = res
        if (res.isOwner) {
          this.showAuthSchemes = true
        }
      }).catch(err => {
        this.$router.push('/')
        // this.$error.showErrorMessage(err)
      });

      this.isFavorResource().then((isFavor) => {
        this.resourceDetail.isFavor = isFavor
      }).catch(err => {
        console.warn(err)
        // this.$error.showErrorMessage(err)
      });
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
      this.showAuthSchemes = true
      this.transformLeft = Math.min(250, Math.max(this.$refs.detailContent.offsetLeft - 20, 0));
      this.contentTransform = `translate(-${this.transformLeft}px, 0)`
    },
    hideAuthSchemeHandler() {
      this.contentTransform = 'none'
      this.showAuthSchemes = false
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

      return Promise.all([this.loadResourceOwners(), NodeDataLoader.onloadNodeList()]).then(res => {
        var resourceOwners = res[0];
        var nodeList = res[1].dataList || []
        var ownersMap = {}
        resourceOwners.forEach(item => {
          ownersMap[item.nodeId] = item
        })

        nodeList.map(node => {
          node.checked = !!ownersMap[node.nodeId]
          if (node.checked) {
            node._presentable = ownersMap[node.nodeId]
            node.selected = true
          }
          return node
        })

        return nodeList
      })
    },
    loadResourceOwners() {
      return this.$axios.get(`/v1/presentables/resourceSubordinateNodes`, {
        params: {
          resourceId: this.resourceId
        }
      }).then(res => {
        return res.getData()
      })
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
      var selectedNodes = []
      this.nodes.forEach(node => {
        if (node.checked) {
          selectedNodes.push(node.nodeId)
        }
      })

      if (selectedNodes.length) {
        var promises = selectedNodes.map(nodeId => {
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
    },
    nodeOptCheckHandler(node) {
      console.log(node)
      node.checked = !node.checked
      this.$forceUpdate()
    }
  }
}
