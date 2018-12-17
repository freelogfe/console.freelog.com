import SchemeDetail from './scheme-detail.vue'
import schemeData, { resourceDetail } from './111.js'

export default {
  name: 'authorization-scheme-manage',
  components: {
    SchemeDetail
  },
  props: {
    resourceInfo: Object,
  },
  data() {
    return {
      isCanUpdateContract: false,
      isShowSuspensionSchemeList: false,
      currentOpenedResources: [],
      resourceMap: {},
      selectedAuthSchemes:[],
      actIndex: 0
    }
  },
  computed: {
    qiHostname() {
      return window.location.hostname.replace(/^console/g, 'qi')
    },
  },
  methods: {
    // 点击"更新合约"按钮
    updateContract(isUpdateContract) {
      if(isUpdateContract) {

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
        const { authSchemeList, resourceName, selectedAuthSchemeTabIndex, selectedPolicyIndex } = authSchemesData
        if(selectedAuthSchemeTabIndex !== -1) {
          const { authSchemeName, policy, bubbleResources } = authSchemeList[selectedAuthSchemeTabIndex]
          let policyName = policy[selectedPolicyIndex].policyName
          this.selectedAuthSchemes.push({ resourceName, authSchemeName, policyName })
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

      if(!this.resourceMap[resourceId]) {
        this.getUpcastResourceSchemeDetail(resourceId, resourceLevelIndex)
          .then(() => {
            this.refreshCurrentOpenedResource(resourceLevelIndex)
          })
      }else {
        this.refreshCurrentOpenedResource(resourceLevelIndex)
      }
    },
    // 获取上抛资源的授权方案详情
    getUpcastResourceSchemeDetail(resourceId, resourceLevelIndex) {
      return Promise.all([
        this.getResourceDetail(resourceId),
        this.getResourceAuthSchemesList(resourceId)
      ])
        .then(([ resourceDetailRes, authSchemeListRes ]) => {

          this.resourceMap[resourceId] = this.resourceMap[resourceId] || {
            isFinishSelectedAuthScheme: false,
            selectedAuthSchemeTabIndex: -1,
            activeAuthSchemeTabIndex: 0,
            selectedPolicyIndex: -1,
          }
          if(resourceDetailRes.errcode === 0) {
            const { resourceName, resourceType, userName, updateDate } = resourceDetailRes.data
            var resourceDate = this.resolveUpdateDate(updateDate)
            Object.assign(this.resourceMap[resourceId], {
              resourceName, resourceType, userName, resourceDate, resourceId,
            })
          }

          if(authSchemeListRes.errcode === 0) {
            this.resourceMap[resourceId].authSchemeList = authSchemeListRes.data
          }

          return Promise.resolve()
        })
    },
    // 获取资源详情
    getResourceDetail(resourceId) {
      return this.$axios.get(`//${this.qiHostname}/v1/resources/${resourceId}`)
        .then(res => res.data)
        .then(() => resourceDetail[resourceId])
    },
    // 获取资源授权方法
    getResourceAuthSchemesList(resourceId) {
      return this.$axios.get(`//${this.qiHostname}/v1/resources/authSchemes`, {
        params: {
          policyStatus: 2,
          resourceIds: resourceId
        }
      }).then(res => res.data)
        .then(() => schemeData[resourceId])
    },
    toggleSuspensionSchemeList() {
      this.isShowSuspensionSchemeList = !this.isShowSuspensionSchemeList
    },
  },
  watch: {

  },
  mounted() {
    var self = this
    document.addEventListener('click', function(e) {
      if(self.isShowSuspensionSchemeList) {
        self.toggleSuspensionSchemeList()
      }
    })

    var resourceId = '710c3eea3fb61260bdc0e1f5b4678e19ecd010d1'
    this.getResourceAuthSchemesList(resourceId)
      .then(res => {
        if(res.errcode === 0) {
          this.resourceMap[resourceId] = {
            authSchemeList: res.data,
            selectedAuthSchemeTabIndex: -1,
            activeAuthSchemeTabIndex: 0,
            selectedPolicyIndex: -1,
            resourceName: this.resourceInfo.resourceName || '',
            resourceId
          }
          this.currentOpenedResources.push(this.resourceMap[resourceId])
        }
      })
  }
}