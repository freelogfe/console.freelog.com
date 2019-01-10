
import { Message } from 'element-ui'
import SchemeSignDialog from '@/components/Authorization-scheme/scheme-sign-dialog.vue'
import SchemeDetail from './scheme-detail.vue'
import {throttle} from 'lodash'

export default {
  name: 'authorization-scheme-manage',
  components: {
    SchemeDetail, SchemeSignDialog
  },
  props: {
    authType: String,
    presentableInfo: Object,
    resourceInfo: Object,
    contracts: Array,
    bubbleResourcesMap: { // 不处理的上抛资源，作用于"资源编辑页面"
      type: Object,
      default: function() {
        return {}
      }
    },
    isShowFooter: {
      type: Boolean,
      default: true
    },
    isScrollBar: {
      type: Boolean,
      default: true
    },
    isPreventExchangeSelection: {
      type: Boolean,
      default: false
    },
    isAbandon: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      allPartitionBoxW: 0,
      authSchemeBoxScrollLeft: 0,
      isShowLoading: false,
      isCanUpdateContract: false,
      isShowSuspensionSchemeList: false,
      currentOpenedResources: [],             // 当前页面已打开的资源
      resourceMap: {},
      selectedAuthSchemes:[],                 // 已选中的授权方案集合
      unResolveAuthResources: [],             // 不处理授权方案的资源集合
      actIndex: 0,
      isRegisterGlobalClickEvent: false,
      authSchemeIdentityAuthMap: {},
      throttleFn: null,
      isShowDialog: false                     // 是否显示"签约提示"弹窗
    }
  },
  computed: {
    qiHostname() {
      return window.location.hostname.replace(/^console/g, 'qi')
    },
    resourceContractsMap() {
      var map = {}
      this.contracts.forEach(contract => {
        const { resourceId } = contract
        map[resourceId] = contract
      })
      return map
    },
    boxStyle() {
      if(this.authType === 'resource') {
        return {}
      }

      if(this.currentOpenedResources.length > 1) {
        return {
          position: 'relative',
          left: (document.querySelector('#pane-schema-manager').offsetWidth - window.innerWidth) / 2 + 'px',
          width: window.innerWidth + 'px',
          margin: 0,
          "padding": "0 35px",
          "box-sizing": "border-box",
        }
      }else {
        return {}
      }

    },
    redBarStyle() {
      var x = (this.authSchemeBoxScrollLeft / this.allPartitionBoxW).toFixed(4) * 150 + 'px'
      return {
        width: (window.innerWidth / this.allPartitionBoxW).toFixed(4) * 100 + '%',
        transform: `translateX(${x})`,
      }
    },
  },
  methods: {
    initPresentableAuthSchemes() {
      this.isShowLoading = true
      var resourceId = this.resourceInfo.resourceId

      var resourceiDset = new Set(this.contracts.map(c => c.resourceId))
      resourceiDset.add(resourceId)

      return this.getResourceSchemeDetail([...resourceiDset].join(','))
        .then(() => {
          if(this.resourceMap[resourceId]) {
            this.currentOpenedResources = []
            this.currentOpenedResources.push(this.resourceMap[resourceId])
            this.refreshSelectedAuthSchemes()
          }
          this.isShowLoading = false
          return Promise.resolve()
        })
        .catch((e) => {
          this.isShowLoading = false
          Message.error(e.toString())
        })
    },
    reInitPresentableAuthSchemes(newContracts){
      this.$emit('update:contracts', newContracts)
      newContracts.forEach(c => {
        this.resolveAuthSchemeParams(this.resourceMap[c.resourceId], c)
      })

      switch (this.authType) {
        case 'presentable': {
          this.$router.push({
            path: `/node/${this.$route.params.nodeId}/presentable/${this.presentableInfo.presentableId}`,
            query: { tab: 'contract' }
          })
          break
        }
        case 'resource': {
          break
        }
        default: {}
      }
    },
    toggleResolveResource(resourceAuthScheme, resourceLevelIndex) {
      if(!this.checkIsCanExchangeSelection()) return
      resourceAuthScheme.isNoResolved = !resourceAuthScheme.isNoResolved

      const { activeAuthSchemeTabIndex, authSchemeList, isNoResolved } = resourceAuthScheme

      if(isNoResolved) {
        var bubbleResources = authSchemeList[activeAuthSchemeTabIndex].bubbleResources.map(item => {
          const { resourceId } = item
          if(!this.resourceMap[resourceId]) {
            item.selectedAuthSchemeTabIndex = -1
            return item
          }else {
            return this.resourceMap[resourceId]
          }
        })
        resourceAuthScheme.selectedAuthSchemeTabIndex = -1
        resourceAuthScheme.selectedPolicyIndex = -1
        resourceAuthScheme.isFinishSelectedAuthScheme = false
        authSchemeList[activeAuthSchemeTabIndex].selectedUpcastResourceIndex = -1
        this.cancelSomeURSchemeSelection(bubbleResources)
        this.currentOpenedResources = this.currentOpenedResources.slice(0, resourceLevelIndex + 1)
      }
      this.getAuthResolveState()
    },
    // 已经发布或已废弃的"授权方案"，阻止更改
    checkIsCanExchangeSelection() {
      if(this.isPreventExchangeSelection){
        Message.warning('已发布该授权点，当前操作不可执行')
        return false
      } if(this.isAbandon) {
        Message.warning('已废弃该授权点，当前操作不可执行')
        return false
      }else {
        return true
      }
    },
    // 取消当前资源 所有下级资源的授权方案选择
    cancelSomeURSchemeSelection(bubbleResources) {
      for(let i = 0; i < bubbleResources.length; i++) {
        const { resourceId } = bubbleResources[i]
        let targResource = this.resourceMap[resourceId]
        if(targResource) {
          const { selectedAuthSchemeTabIndex, authSchemeList } = targResource
          if(selectedAuthSchemeTabIndex !== -1) {
            const { bubbleResources = [] } = authSchemeList[selectedAuthSchemeTabIndex]
            targResource.selectedAuthSchemeTabIndex = -1
            targResource.selectedPolicyIndex = -1
            targResource.isFinishSelectedAuthScheme = false
            this.cancelSomeURSchemeSelection(bubbleResources)
          }
        }
      }
    },
    // 点击"更新合约"或"生成合约"按钮
    signContract(isUpdateContract) {
      if(!isUpdateContract) return
      this.isShowDialog = true
      return

      var contracts = this.selectedAuthSchemes.map(item => {
        const { resourceId, authSchemeId, segmentId, contractId = '' } = item
        if(contractId && contractId !== '') {
          return { resourceId, authSchemeId, policySegmentId: segmentId, contractId }
        }else {
          return { resourceId, authSchemeId, policySegmentId: segmentId }
        }
      })

      switch (this.authType) {
        case 'presentable': {
          this.$axios.put(`//${this.qiHostname}/v1/presentables/${this.presentableInfo.presentableId}`, {
            contracts
          })
            .then(res => res.data)
            .then(res => {
              if(res.errcode === 0) {
                var str = this.presentableInfo.contracts.length ? '更新' : '生成'
                Message.success(`节点资源${this.presentableInfo.presentableName}授权合约${str}成功！`)
                this.reInitPresentableAuthSchemes(res.data.contracts)
              }else {
                Message.error(res.msg)
              }
            })
          break
        }
        case 'resource': {
          break
        }
        default: {}
      }
    },
    afterSginContract(data) {
      var str = this.presentableInfo.contracts.length ? '更新' : '生成'
      Message.success(`节点资源${this.presentableInfo.presentableName}授权合约${str}成功！`)
      this.reInitPresentableAuthSchemes(res.data.contracts)
    },
    resolveUpdateDate(updateDate) {
      const date = new Date(updateDate)
      return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
    },
    refreshSelectedAuthSchemes() {
      this.selectedAuthSchemes = []
      this.unResolveAuthResources = []
      this.getSelectedAuthScheme(this.currentOpenedResources[0])
      this.$emit('update-resolved-auth-scheme',{
        resourceId: this.resourceInfo.resourceId,
        selectedAuthSchemes: this.selectedAuthSchemes,
        unResolveAuthResources:this.unResolveAuthResources
      })
      this.getAuthResolveState()
    },
    // 获取选中的"授权方案和策略"与"未处理的资源（即上抛资源）"的信息
    getSelectedAuthScheme(authSchemesData) {
      if(authSchemesData) {
        const { isNoResolved, authSchemeList, resourceName, resourceId, selectedAuthSchemeTabIndex, selectedPolicyIndex, contractId } = authSchemesData
        if(isNoResolved) {
          this.unResolveAuthResources.push({ resourceName, resourceId })
          return
        }
        if(selectedAuthSchemeTabIndex !== -1) {
          const { authSchemeName, policy, bubbleResources, authSchemeId } = authSchemeList[selectedAuthSchemeTabIndex]
          let { policyName, segmentId } = policy[selectedPolicyIndex]
          this.selectedAuthSchemes.push({
            resourceName, resourceId, authSchemeName, authSchemeId, policyName, segmentId, contractId
          })
          bubbleResources.forEach(bResource => {
            const { resourceId } = bResource
            this.getSelectedAuthScheme(this.resourceMap[resourceId])
          })
        }
      }
    },
    // 获取"依赖"的处理状态： 1：完全处理，不包含上抛；0：不完全处理，包含上抛，-1：未处理
    getAuthResolveState() {
      var authResolveState = -1
      var cOResources = this.currentOpenedResources
      for(let i = 0; i < cOResources.length; i++){
        const oR = cOResources[i]

        if(oR.isFinishSelectedAuthScheme) {
          authResolveState = 1
          break
        }
        if(oR.isNoResolved) {
          authResolveState = 0
          break
        }
        if(oR.selectedAuthSchemeTabIndex === -1) {
          authResolveState = -1
          break
        }
      }
      this.resourceInfo.authResolveState = authResolveState
      this.$emit('exchange-auth-resolve-state')
    },
    refreshCurrentOpenedResource(resourceLevelIndex) {
      var targArr = this.currentOpenedResources.slice(0, resourceLevelIndex + 1)
      var tempResource = this.currentOpenedResources[resourceLevelIndex]

      while(tempResource !== null){
        const { activeAuthSchemeTabIndex, authSchemeList } = tempResource

        const { bubbleResources, selectedUpcastResourceIndex = -1 } = authSchemeList[activeAuthSchemeTabIndex]

        if(selectedUpcastResourceIndex === -1) {
          tempResource = null
        }else {
          const { resourceId } = bubbleResources[selectedUpcastResourceIndex]

          if(this.resourceMap[resourceId]) {
            targArr.push(this.resourceMap[resourceId])
            tempResource = this.resourceMap[resourceId]
          }else {
            tempResource = null
          }
        }
      }
      this.currentOpenedResources = targArr
    },
    // 显示 上抛资源 的授权方案
    showUpcastResourceScheme(upcastResource, resourceLevelIndex) {
      const { resourceId } = upcastResource

      if(!this.resourceMap[resourceId] || this.resourceMap[resourceId].authSchemeList.length  === 0) {
        this.getResourceSchemeDetail(resourceId, resourceLevelIndex)
          .then(() => {
            this.refreshCurrentOpenedResource(resourceLevelIndex)
          })
      }else {
        this.refreshCurrentOpenedResource(resourceLevelIndex)
      }
    },
    // 获取资源的授权方案详情
    getResourceSchemeDetail(resourceIds) {
      if(resourceIds !== '') {
        return Promise.all([
          this.getResourceDetailList(resourceIds),
          this.getResourceAuthSchemesList(resourceIds)
        ])
          .then(([ detailListRes, authSchemeListRes ]) => {

            if(detailListRes.errcode === 0) {
              detailListRes.data.forEach(item => {
                const { resourceId, resourceName, resourceType, userName, updateDate } = item
                if(authSchemeListRes[resourceId]) {
                  this.resolveAuthSchemeListRes(authSchemeListRes[resourceId], resourceId)

                  var resourceDate = this.resolveUpdateDate(updateDate)
                  Object.assign(this.resourceMap[resourceId], {
                    resourceName, resourceType, userName, resourceDate,
                  })
                }
              })
            }
            return Promise.resolve()
          })
      }else {
        return Promise.reject()
      }

    },
    // 获取资源详情
    getResourceDetail(resourceId) {
      return this.$axios.get(`//${this.qiHostname}/v1/resources/${resourceId}`)
        .then(res => res.data)
    },
    // 获取资源详情列表
    getResourceDetailList(resourceIds) {
      return this.$axios.get(`//${this.qiHostname}/v1/resources/list?resourceIds=${resourceIds}`)
        .then(res => res.data)
    },
    // 获取资源授权方法
    getResourceAuthSchemesList(resourceIds) {
      return this.$axios.get(`//${this.qiHostname}/v1/resources/authSchemes`, {
        params: {
          policyStatus: 2,
          resourceIds
        }
      }).then(res => res.data)
        .then(res => {
          var map = {}
          if(res.errcode === 0) {
            res.data.forEach(item => {
              const { resourceId, status } = item
              if(status === 1) {
                map[resourceId] = map[resourceId] || []
                map[resourceId].push(item)
              }
            })
          }else {
            Message.error(res.msg)
          }
          return Promise.resolve(map)
        })
    },
    resolveAuthSchemeListRes(authSchemeList, resourceId) {
      const contractObj = this.resourceContractsMap[resourceId]
      var isNoResolved = false
      if(this.authType === 'resource') {
        isNoResolved = !!this.bubbleResourcesMap[resourceId]
      }

      this.resourceMap[resourceId] = this.resourceMap[resourceId] || {
        resourceId,
        authSchemeList,
        selectedAuthSchemeTabIndex: -1,
        activeAuthSchemeTabIndex: 0,
        selectedPolicyIndex: -1,
        isFinishSelectedAuthScheme: !!contractObj,
        isNoResolved,
      }

      this.resolveAuthSchemeParams(this.resourceMap[resourceId], contractObj)

      var authSchemeIds = authSchemeList.map(item => item.authSchemeId).join(',')
      this.getAuthSchemeIdentityAuth(authSchemeIds)
    },
    // 根据合同确定"授权方案与授权策略"的选中序号
    resolveAuthSchemeParams(tempResource, contractObj) {
      const { authSchemeList } = tempResource
      if(contractObj) {
        const { authSchemeId, policySegmentId } = contractObj
        for(let i = 0; i < authSchemeList.length; i++) {
          if(authSchemeList[i].authSchemeId === authSchemeId) {
            tempResource.activeAuthSchemeTabIndex = tempResource.selectedAuthSchemeTabIndex = i

            const { policy } = authSchemeList[i]
            for(let j = 0; j < policy.length; j++) {
              if(policy[j].segmentId === policySegmentId) {
                tempResource.selectedPolicyIndex = j
                policy[j].isHasSignHistory = true
              }else {
                policy[j].isHasSignHistory = false
              }
            }
            break
          }
        }
      }
    },
    // 获取授权点的策略段身份认证结果
    getAuthSchemeIdentityAuth(authSchemeIds) {
      if(authSchemeIds.length === 0) return
      var url = `//${this.qiHostname}/v1/auths/authSchemeIdentityAuth?authSchemeIds=${authSchemeIds}`
      if(this.authType === 'presentable') {
        var nodeId = this.presentableInfo.nodeId
        url = url + `&nodeId=${nodeId}`
      }
      return this.$axios.get(url)
        .then(res => res.data)
        .then(res => {
          if(res.errcode === 0) {
            res.data.forEach(item => {
              const { authSchemeId, policy } = item
              this.authSchemeIdentityAuthMap[authSchemeId] = this.authSchemeIdentityAuthMap[authSchemeId] || {}
              const tempMap = this.authSchemeIdentityAuthMap[authSchemeId]
              policy.forEach(p => {
                tempMap[p.segmentId] = p
              })
            })
            this.authSchemeIdentityAuthMap = Object.assign({}, this.authSchemeIdentityAuthMap)
          }else {
            Message.error(res.msg || '')
          }
        })
    },
    toggleSuspensionSchemeList() {
      this.isShowSuspensionSchemeList = !this.isShowSuspensionSchemeList
      if(!this.isRegisterGlobalClickEvent) {
        this.isRegisterGlobalClickEvent = true
        document.addEventListener('click', this.hideSuspensionSchemeList)
      }
    },
    hideSuspensionSchemeList() {
      if(this.isShowSuspensionSchemeList) {
        this.toggleSuspensionSchemeList()
      }
    },
    authSchemeBoxScroll(e) {
      this.authSchemeBoxScrollLeft = e.target.scrollLeft
    },
  },
  watch: {
    currentOpenedResources() {
      setTimeout(() => {
        var $partitionBox = document.querySelector('.scheme-partition')

        if($partitionBox) {
          var allPartitionBoxW = $partitionBox.offsetWidth * this.currentOpenedResources.length
          this.allPartitionBoxW = allPartitionBoxW
        }
      })
    },
  },
  beforeDestroy() {
    document.removeEventListener('click', this.hideSuspensionSchemeList)
    document.removeEventListener('scroll', this.throttleFn)
  },
  mounted() {
    this.initPresentableAuthSchemes()
    if(this.isScrollBar) {
      this.throttleFn = throttle(this.authSchemeBoxScroll, 17).bind(this)
      document.querySelector('.authorization-scheme-box').addEventListener('scroll', this.throttleFn, false)
    }
  }
}