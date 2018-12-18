import SchemeDetail from './scheme-detail.vue'
import { Message } from 'element-ui'

export default {
  name: 'authorization-scheme-manage',
  components: {
    SchemeDetail
  },
  props: {
    presentableInfo: Object,
    resourceInfo: Object,
    contracts: Array,
  },
  data() {
    return {
      isCanUpdateContract: false,
      isShowSuspensionSchemeList: false,
      currentOpenedResources: [],
      resourceMap: {},
      selectedAuthSchemes:[],
      actIndex: 0,
      isRegisterGlobalClickEvent: false,
      authSchemeIdentityAuthMap: {},
    }
  },
  computed: {
    qiHostname() {
      return window.location.hostname.replace(/^console/g, 'qi')
    },
    nodeId() {
      return this.presentableInfo.nodeId
    },
    presentableId() {
      return this.presentableInfo.presentableId
    },
    presentableName() {
      return this.presentableInfo.presentableName
    },
    presentableContractsMap() {
      var map = {}
      this.contracts.forEach(contract => {
        const { resourceId } = contract
        map[resourceId] = contract
      })
      return map
    },
    boxStyle() {
      if(this.currentOpenedResources.length > 1) {
        return {
          position: 'relative',
          left: (document.querySelector('#pane-schema-manager').offsetWidth - window.innerWidth) / 2 + 'px',
          width: window.innerWidth + 'px',
          margin: 0
        }
      }else {
        return {}
      }
    }
  },
  methods: {
    initPresentableAuthSchemes() {
      var resourceId = this.resourceInfo.resourceId

      var resourceiDset = new Set(this.presentableInfo.contracts.map(c => c.resourceId))
      resourceiDset.add(resourceId)

      return this.getResourceSchemeDetail([...resourceiDset].join(','))
        .then(() => {
          if(this.resourceMap[resourceId]) {
            this.currentOpenedResources = []
            this.currentOpenedResources.push(this.resourceMap[resourceId])
            this.refreshSelectedAuthSchemes()
          }
          return Promise.resolve()
        })
    },
    reInitPresentableAuthSchemes(newContracts){
      this.$emit('update:contracts', newContracts)
      newContracts.forEach(c => {
        this.resolveAuthSchemeParams(this.resourceMap[c.resourceId], c)
      })
    },
    // 点击"更新合约"按钮
    updateContract(isUpdateContract) {
      if(isUpdateContract) {
        var contracts = this.selectedAuthSchemes.map(item => {
          const { resourceId, authSchemeId, segmentId, contractId = '' } = item
          if(contractId && contractId !== '') {
            return { resourceId, authSchemeId, policySegmentId: segmentId, contractId }
          }else {
            return { resourceId, authSchemeId, policySegmentId: segmentId }
          }
        })

        this.$axios.put(`//${this.qiHostname}/v1/presentables/${this.presentableId}`, {
          contracts
        })
          .then(res => res.data)
          .then(res => {
            if(res.errcode === 0) {
              var str = this.presentableInfo.contracts.length ? '更新' : '生成'
              Message.success(`节点资源${this.presentableName}授权合约${str}成功！`)

              this.reInitPresentableAuthSchemes(res.data.contracts)
            }
          })
      }
    },
    resolveUpdateDate(updateDate) {
      const date = new Date(updateDate)
      return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
    },
    refreshSelectedAuthSchemes() {
      this.selectedAuthSchemes = []
      this.getSelectedAuthScheme(this.currentOpenedResources[0])
    },
    getSelectedAuthScheme(authSchemesData) {
      if(authSchemesData) {
        const { authSchemeList, resourceName, resourceId, selectedAuthSchemeTabIndex, selectedPolicyIndex, contractId } = authSchemesData
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
          policyStatus: 1,
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
          }
          return Promise.resolve(map)
        })
    },
    resolveAuthSchemeListRes(authSchemeList, resourceId) {
      const contractObj = this.presentableContractsMap[resourceId]
      this.resourceMap[resourceId] = this.resourceMap[resourceId] || {
        resourceId,
        authSchemeList,
        selectedAuthSchemeTabIndex: -1,
        activeAuthSchemeTabIndex: 0,
        selectedPolicyIndex: -1,
        isFinishSelectedAuthScheme: !!contractObj
      }

      this.resolveAuthSchemeParams(this.resourceMap[resourceId], contractObj)

      var authSchemeIds = authSchemeList.map(item => item.authSchemeId).join(',')
      this.getAuthSchemeIdentityAuth(authSchemeIds)
    },
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
      var nodeId = this.nodeId
      return this.$axios.get(`//${this.qiHostname}/v1/auths/authSchemeIdentityAuth?authSchemeIds=${authSchemeIds}&nodeId=${nodeId}`)
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
    }
  },
  watch: {

  },
  beforeDestroy() {
    document.removeEventListener('click', this.hideSuspensionSchemeList)
  },
  mounted() {

    this.initPresentableAuthSchemes()

  }
}