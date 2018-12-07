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
        target: '/v1/presentables?nodeId=10018&isOnline=2',
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
      console.log('format list', list)
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
        console.log(resources)
        resources.forEach(resource => {
          resource.postImgUrl = this.resolvePostImgUrl(resource)
          Object.assign(list[maps[resource.resourceId]].resourceInfo, resource)
        })
      })

      if (authSchemeIds.length) {
        this.loadPresentablesSchemes(authSchemeIds)
          .then(schemes=>{
            schemes.forEach(scheme=>{
              let {index, contract} = schemeIdMaps[scheme.authSchemeId]
              scheme.selectedPolicy = this.getSelectedPolicy(scheme, contract)
              this.$set(list[index], 'scheme', scheme)
            })
          })
      }

      setTimeout(()=>{
        console.log(list)
      },1e3)
      return list
    },
    loadPresentablesSchemes(authSchemeIds){
      return loadAuthSchemes({
        authSchemeIds: authSchemeIds
      }).then(schemes=>{
        return schemes
      })
    },
    getSelectedPolicy(scheme, contract){
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
        src = resource.previewImages[0] + `?x-oss-process=style/${isSupportWebp ? 'webp' : 'jpg'}_image`
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
      if (presentable.isOnlineChecked) {
        presentable.isOnline = 1
      } else {
        presentable.isOnline = 0
      }
      this.$services.presentables.put(presentable.presentableId, {
        isOnline: presentable.isOnline
      }).then((res) => {
        if (!(res.data.errcode === 0 && res.data.errcode === 0)) {
          presentable.isOnline = 0
          presentable.isOnlineChecked = false
          this.$message.error(res.data.msg || '更新失败')
        }
      }).catch((err) => {
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
    }
  }
}
