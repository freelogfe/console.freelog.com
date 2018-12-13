import SchemeDetail from './scheme-detail.vue'

export default {
  name: 'authorization-scheme-manage',
  components: {
    SchemeDetail
  },
  props: {},
  data() {
    return {
      isShowSuspensionSchemeList: false,
      authSchemesData: null,
      upcastResourceIDs: [],
      upcastResourceAuthScheme: {}
    }
  },
  computed: {},
  methods: {
    resolveUpdateDate(updateDate) {
      const date = new Date(updateDate)
      return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
    },
    // 显示 上抛资源 的授权方案
    showUpcastResourceScheme(upcastResource, upcastResourceLevelIndex) {
      const { resourceId } = upcastResource
      if(this.upcastResourceIDs[upcastResourceLevelIndex]) {
        if(this.upcastResourceIDs[upcastResourceLevelIndex] !== resourceId) {
          this.getUpcastResourceSchemeDetail(resourceId)
            .then(() => {
              this.upcastResourceIDs.splice(upcastResourceLevelIndex, 1, resourceId)
            })
        }
      }else {
        if(!this.upcastResourceAuthScheme[resourceId]) {
          this.getUpcastResourceSchemeDetail(resourceId)
            .then(() => {
              this.upcastResourceIDs.push(resourceId)
            })
        }else {
          this.upcastResourceIDs.push(resourceId)
        }
      }
    },
    refreshUpdcastResourceIDs(upcastResourceLevelIndex) {
      this.upcastResourceIDs = this.upcastResourceIDs.slice(0, upcastResourceLevelIndex)
    },
    // 获取上抛资源的授权方案详情
    getUpcastResourceSchemeDetail(resourceId) {
      return Promise.all([
        this.getResourceDetail(resourceId),
        this.getResourceAuthSchemesList(resourceId)
      ])
        .then(([ resourceDetailRes, authSchemeListRes ]) => {
          this.upcastResourceAuthScheme[resourceId] = this.upcastResourceAuthScheme[resourceId] || {}
          if(resourceDetailRes.errcode === 0) {
            const { resourceName, resourceType, userName, updateDate } = resourceDetailRes.data
            var resourceDate = this.resolveUpdateDate(updateDate)
            Object.assign(this.upcastResourceAuthScheme[resourceId], { resourceName, resourceType, userName, resourceDate })
          }

          if(authSchemeListRes.errcode === 0) {
            this.upcastResourceAuthScheme[resourceId].authSchemeList = authSchemeListRes.data
          }

          return Promise.resolve()
        })
    },
    // 获取资源授权方法
    getResourceAuthSchemesList(resourceId) {
      return this.$axios.get('//qi.freelog.com/v1/resources/authSchemes', {
        params: {
          policyStatus: 2,
          resourceIds: resourceId
        }
      }).then(res => res.data)
    },
    // 获取资源详情
    getResourceDetail(resourceId) {
      return this.$axios.get(`//qi.freelog.com/v1/resources/${resourceId}`)
        .then(res => res.data)
    },
    toggleSuspensionSchemeList() {
      this.isShowSuspensionSchemeList = !this.isShowSuspensionSchemeList
    },
  },
  mounted() {
    this.getResourceAuthSchemesList('710c3eea3fb61260bdc0e1f5b4678e19ecd010d1')
      .then(res => {
        this.authSchemesData = res
      })
  }
}