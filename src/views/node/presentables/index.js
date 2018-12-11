import CONFIG from '@/config/index'
import FreelogSwitch from '@/components/Switch/index.vue'
import PresentableDetail from '../presentable/detail/index.vue'
import SearchResource from '../../resource/search/index.vue'
import {RESOURCE_TYPES} from '@/config/resource'
import Pagination from '@/components/Pagination/index.vue'
import {loadResources} from '@/data/resource/loader'
import {loadAuthSchemes} from '@/data/scheme/loader'

const STATUS_TIPS = CONFIG.PRESENTABLE_STATUS_TIPS

export default {
  name: 'presentables',
  data() {
    return {
      showSearchResource: false,
      presentableList: [],
      currentPresentable: {
        index: -1,
        detail: {}
      },
      searchData: {
        contractState: '',
        onlineState: '',
        resourceType: ''
      },

      tableConfig: {
        rowClassName: 'resource-row',
        'cell-class-name': 'res-row-cell',
        'show-header': false
      },
      paginationConfig: {
        target: `/v1/presentables?nodeId=${this.$route.params.nodeId}&isOnline=2`,
        params: {}
      },

      contractStateOptions: [
        {
          value: '0',
          label: '未签约'
        },
        {
          value: '1',
          label: '已签约'
        }
      ],
      onlineStateOptions: [
        {
          value: '0',
          label: '下线'
        },
        {
          value: '1',
          label: '上线'
        }
      ],
      resourceTypeOptions: Object.keys(RESOURCE_TYPES).map(type => {
        return {
          value: type,
          label: RESOURCE_TYPES[type]
        }
      })
    }
  },
  components: {
    PresentableDetail,
    FreelogSwitch,
    SearchResource,
    Pagination
  },

  watch: {
    $route() {
      if (!this.$route.params.nodeId) return
      this.paginationConfig.target = `/v1/presentables?nodeId=${this.$route.params.nodeId}&isOnline=2`
    }
  },

  mounted() {
    // this.initView(this.$route.params.nodeId)
  },
  methods: {
    queryHandler() {
      this.$message.warning('待开发')
    },
    initView(nodeId) {
      if (nodeId) {
        Object.assign(this.currentPresentable, {
          index: -1,
          detail: {}
        })
        this.loadPresentables({nodeId, isOnline: 2})
          .then(this.formatHandler.bind(this))
          .then((list) => {
            this.presentableList = list
          })
      } else {
        this.$message.error('缺失节点ID参数')
      }
    },
    formatHandler(list) {
      if (!list || !list.length) {
        return []
      }

      var rids = []
      var authSchemeIds = []
      var maps = {}
      var schemeIdMaps = {}

      list.forEach((item, index) => {
        rids.push(item.resourceId)

        var contract = this.getPresentableContract(item)
        if (contract) {
          authSchemeIds.push(contract.authSchemeId)
          schemeIdMaps[contract.authSchemeId] = {
            index, contract
          }
        }
        maps[item.resourceId] = index
        this.resolvePresentable(item)
      })

      loadResources(rids).then(resources => {
        resources.forEach(resource => {
          resource.postImgUrl = this.resolvePostImgUrl(resource)
          this.$set(list[maps[resource.resourceId]], 'resourceInfo', resource)
        })
      })

      if (authSchemeIds.length) {
        this.loadPresentablesSchemes(authSchemeIds)
          .then(schemes => {
            schemes.forEach(scheme => {
              let {index, contract} = schemeIdMaps[scheme.authSchemeId]
              scheme.selectedPolicy = this.getSelectedPolicy(scheme, contract)
              this.$set(list[index], 'scheme', scheme)
            })
          })
      }
      return list
    },
    loadPresentablesSchemes(authSchemeIds) {
      return loadAuthSchemes({
        authSchemeIds: authSchemeIds
      }).then(schemes => {
        return schemes
      })
    },
    getSelectedPolicy(scheme, contract) {
      for (let i = 0; i < scheme.policy.length; i += 1) {
        const policy = scheme.policy[i]
        if (policy.segmentId === contract.policySegmentId) {
          return policy
        }
      }
    },
    getPresentableContract(presentableInfo) {
      const contracts = presentableInfo.contracts || []
      if (contracts.length) {
        let contract
        for (let i = 0; i < contracts.length; i += 1) {
          contract = contracts[i]
          if (contract.resourceId === presentableInfo.resourceId) {
            return contract
          }
        }
      }

      return null
    },
    resolvePostImgUrl(resource) {
      let src

      if (resource.previewImages.length) {
        src = resource.previewImages[0]
      } else {
        src = ''
      }

      return src
    },
    resolvePresentable(item) {
      item.isOnlineChecked = !!item.isOnline
      item._statusInfo = STATUS_TIPS[item.status]
      item.isReady = (item.status & 7) === 7
      item.hasContract = item.contracts.length > 0
      item.detailLink = `/node/${this.$route.params.nodeId}/presentable/${item.presentableId}`
    },
    loadPresentables(param) {
      return this.$services.presentables.get({params: param}).then(res => res.getData()).catch(this.$error.showErrorMessage)
    },
    changePresentableHandler(presentable, index) {
      this.currentPresentable.index = index
      this.currentPresentable.detail = presentable
    },
    changePresentableOnlineHandler(presentable) {
      if (presentable.status & 3 !== 3) {
        return this.$error.showErrorMessage('合同不完备或不存在可用策略')
      }

      if (presentable.isLoading) return

      presentable.isLoading = true
      var nodeId = this.$route.params.nodeId
      const url = `/v1/auths/presentables/${presentable.presentableId}/presentableTreeAuthTest?nodeId=${nodeId}`
      this.$axios.get(url)
        .then(res => {
          const {errcode, ret, msg, data} = res.data
          if (errcode !== 0 || ret !== 0 || data.isAuth === false) {
            presentable.isLoading = false
            return Promise.reject(data.isAuth === false ? '未获得授权' : msg)
          }

          if (presentable.isOnlineChecked) {
            presentable.isOnline = 1
          } else {
            presentable.isOnline = 0
          }

          return this.$axios.put(`/v1/presentables/${presentable.presentableId}/onlineOrOffline`, {
            isOnline: presentable.isOnline
          }).then((res) => {
            presentable.isLoading = false
            if (!(res.data.errcode === 0 && res.data.errcode === 0)) {
              return Promise.reject(res.data.msg || '更新失败')
            }
          })
        })
        .catch((err) => {
          console.log(err)
          presentable.isLoading = false
          presentable.isOnline = 0
          presentable.isOnlineChecked = false
          this.$error.showErrorMessage(err)
        })
    },
    showSearchResourceHandler() {
      this.showSearchResource = true
    },
    beforeCloseDialogHandler() {
      this.showSearchResource = false
    },
    addResourceHandler(resource) {
      this.createPresentable({
        nodeId: this.$route.params.nodeId,
        presentableName: resource.resourceName,
        resourceId: resource.resourceId
      }).then((presentable) => {
        this.presentableList.push(presentable)
        this.showSearchResource = false
      }).catch(this.$error.showErrorMessage)
    },
    createPresentable(data) {
      return this.$services.presentables.post(data).then((res) => {
        if (res.data.errcode !== 0) {
          return Promise.reject(res.data.msg)
        }
        return res.getData()
      })
    },
    updatePresentableHandler(presentable) {
      const curPresentable = this.currentPresentable.detail
      Object.assign(curPresentable, presentable)
      this.resolvePresentable(curPresentable)
    },
    deletePresentableHandler(presentable) {
      this.$confirm(`确定删除${presentable.presentableName}?`)
        .then(() => {
          this.$services.presentables.delete(presentable.presentableId)
            .then(({data}) => {
              var {ret, errcode, msg} = data
              if (ret === 0 && errcode === 0) {
                this.$message.success('成功删除')
                this.$refs.paginationRef.reload()
              } else {
                this.$message.fail(msg)
              }
            })
        }).catch(() => {
      })
    }
  }
}
