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
      isShowSuspensionSchemeList: false,
      authSchemesData: null,
      upcastResourceIDs: [],
      upcastResourceAuthSchemeMap: {}
    }
  },
  computed: {
    qiHostname() {
      return window.location.hostname.replace(/^console/g, 'qi')
    },
  },
  methods: {
    rerender() {
      this.$forceUpdate()
    },
    resolveUpdateDate(updateDate) {
      const date = new Date(updateDate)
      return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
    },
    // 显示 上抛资源 的授权方案
    showUpcastResourceScheme(upcastResource, resourceLevelIndex) {
      const { resourceId } = upcastResource

      if(this.upcastResourceIDs[resourceLevelIndex]) {
        if(this.upcastResourceIDs[resourceLevelIndex] !== resourceId) {
          this.getUpcastResourceSchemeDetail(resourceId, resourceLevelIndex)
            .then(() => {
              this.upcastResourceIDs.splice(resourceLevelIndex, 1, resourceId)
            })
        }
      }else {
        if(!this.upcastResourceAuthSchemeMap[resourceId]) {
          this.getUpcastResourceSchemeDetail(resourceId, resourceLevelIndex)
            .then(() => {
              this.upcastResourceIDs.push(resourceId)
            })
        }else {
          this.upcastResourceIDs.push(resourceId)
        }
      }
    },
    refreshUpdcastResourceIDs(resourceLevelIndex) {
      this.upcastResourceIDs = this.upcastResourceIDs.slice(0, resourceLevelIndex)
    },
    // 获取上抛资源的授权方案详情
    getUpcastResourceSchemeDetail(resourceId, resourceLevelIndex) {
      return Promise.all([
        this.getResourceDetail(resourceId),
        this.getResourceAuthSchemesList(resourceId)
      ])
        .then(([ resourceDetailRes, authSchemeListRes ]) => {

          this.upcastResourceAuthSchemeMap[resourceId] = this.upcastResourceAuthSchemeMap[resourceId] || {
            parentResourceScheme: this.getParentResource(resourceLevelIndex)
          }
          if(resourceDetailRes.errcode === 0) {
            const { resourceName, resourceType, userName, updateDate } = resourceDetailRes.data
            var resourceDate = this.resolveUpdateDate(updateDate)
            Object.assign(this.upcastResourceAuthSchemeMap[resourceId], {
              resourceName, resourceType, userName, resourceDate,
              selectedAuthSchemeTabIndex: -1
            })
          }

          if(authSchemeListRes.errcode === 0) {
            this.upcastResourceAuthSchemeMap[resourceId].authSchemeList = authSchemeListRes.data
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
    getParentResource(resourceLevelIndex) {
      console.log('resourceLevelIndex ---', resourceLevelIndex)
      if(resourceLevelIndex === 0) {
        return this.authSchemesData
      }else {
        const parentResourceId = this.upcastResourceIDs[resourceLevelIndex - 1]
        return this.upcastResourceAuthSchemeMap[parentResourceId]
      }
    },
    toggleSuspensionSchemeList() {
      this.isShowSuspensionSchemeList = !this.isShowSuspensionSchemeList
    },
  },
  watch: {
    resourceInfo() {
      this.authSchemesData.resourceName = this.resourceInfo.resourceName
    }
  },
  mounted() {
    this.getResourceAuthSchemesList('710c3eea3fb61260bdc0e1f5b4678e19ecd010d1')
      .then(res => {
        console.log('res ---', res, JSON.stringify(this.resourceInfo))
        if(res.errcode === 0) {
          this.authSchemesData = {
            authSchemeList: res.data,
            selectedAuthSchemeTabIndex: -1,
          }
        }
      })
  }
}