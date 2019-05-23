import { format } from 'date-fns'
import { mapGetters } from 'vuex'
import RichEditor from '@/components/RichEditor/index.vue'
export default {
  name: "release-detail",
  components: { RichEditor },
  data() {
    return {
      releaseId: this.$route.params.releaseId,
      isShowContentLoading: false,
      isCollectedRelease: false,
      activeReleaseVersion: '',
      release: null,
      activePolicy: null,
      selectedRPolicyIdsList: [],
      selectedUpcastRPolicyIdsList: [],
      baseUpcastReleasesList: [],
      checkedNodeList: [],
      // selectedPolicies: [],
      upcastDepReleasesMap: null,
      checkedLabelMap: {},
      resourceDetail: {
        resourceInfo: {
          description: ''
        }
      },
      selectedPolicyId: '',
      comparePolices: [
        { activeIndex: 0 },
        { activeIndex: 1 },
      ],
      compareDialogVisible: false,
      signDialogVisible: false,
      rSubordinateNodesIds: []

    }
  },
  computed: Object.assign({
    projection() {
      return ["releaseId", "resourceType", "releaseName", "latestVersion", "baseUpcastReleases", "policies", "updateDate"].join(',')
    },
    selectedPolicies() {
      var targArr = [], tmpArr = [...this.selectedRPolicyIdsList, ...this.selectedUpcastRPolicyIdsList]
      tmpArr.forEach(item => {
        const [ releaseId, policyId ] = item.split('-')
        const { releaseName, policyName } = this.checkedLabelMap[`${releaseId}-${policyId}`]
        targArr.push({ releaseId, releaseName, policyId, policyName })
      })
      return targArr
    },
  }, mapGetters({
    nodes: 'nodes'
  })),
  watch: {
    activeReleaseVersion(newV, oldV) {
      if(oldV !== '') {
        this.isShowContentLoading = true
        this.fetchResourceDetail()
      }
    },
    selectedUpcastRPolicyIdsList() {
      var tmpIds = this.selectedPolicies.map(i => i.releaseId)
      this.baseUpcastReleasesList = this.baseUpcastReleasesList.map(r => {
        r.isSelectedPolicy = tmpIds.indexOf(r.releaseId) !== -1
        return r
      })
    },
  },
  methods: {
    fetchReleaseDetail() {
      this.$services.ReleaseService.get(this.releaseId)
        .then(res => res.data)
        .then(res => {
          if(res.errcode === 0) {
            this.release = res.data

            this.formatReleaseData()
            this.fetchResourceDetail()
            this.fetchUpcastDepReleases()
          }
          this.isShowContentLoading = false
        }).catch(e => {
          this.$error.showErrorMessage(e)
          this.isShowContentLoading = false
        })
    },
    fetchResourceDetail() {
      const rVersions = this.release.resourceVersions
      var resourceId = ''
      for(let i = 0; i < rVersions.length; i++) {
        if(rVersions[i].version === this.activeReleaseVersion) {
          resourceId = rVersions[i].resourceId
          break
        }
      }
      this.$services.ResourceService.get(resourceId)
        .then(res => res.data)
        .then(res => {
          if(res.errcode === 0) {
            this.resourceDetail.resourceInfo = res.data
          }
          this.isShowContentLoading = false
        })
        .catch(e => {
          this.isShowContentLoading = false
        })
    },
    fetchReleaseSubordinateNodes() {
      this.$services.PresentablesService.get(`releaseSubordinateNodes?releaseId=${this.releaseId}`)
        .then(res => res.data)
        .then(res => {
          if(res.errcode === 0) {
            this.rSubordinateNodesIds = res.data.map(n => n.nodeId)
          }
        })
    },
    fetchReleases(ids) {
      return this.$services.ReleaseService.get(`list?releaseIds=${ids}&projection=${this.projection}`)
        .then(res => res.data)
    },
    // 获取 依赖发行的上抛发行
    fetchUpcastDepReleases() {
      const bUpcastReleases = this.release.baseUpcastReleases
      if(bUpcastReleases.length) {
        const ids = bUpcastReleases.map(r => r.releaseId).join(',')
        this.fetchReleases(ids)
          .then(res => {
            if(res.errcode === 0) {
              const arr = res.data || []
              this.upcastDepReleasesMap = {}
              for(let i = 0; i < arr.length; i++) {
                let releaseId = arr[i].releaseId
                arr[i].policies = arr[i].policies.map(p => {
                  p.checkedLabel = `${arr[i].releaseId}-${p.policyId}`
                  this.checkedLabelMap[p.checkedLabel] = { releaseName: arr[i].releaseName, policyName: p.policyName }
                  return p
                })
                this.upcastDepReleasesMap[releaseId] = arr[i]
              }
              this.baseUpcastReleasesList = arr
            }
          })
          .catch(e => this.isLoading = false)
      }

    },
    getColleactedStatus(){
      this.$services.collections.get(this.releaseId)
        .then(res => res.data)
        .then(res => {
          this.isCollectedRelease = true
        })
    },
    formatReleaseData() {
      this.activeReleaseVersion = this.release.latestVersion.version
      this.release.policies = this.release.policies.filter(p => p.status === 1).map(p => {
        p.checkedLabel = `${this.release.releaseId}-${p.policyId}`
        this.checkedLabelMap[p.checkedLabel] = { releaseName: this.release.releaseName, policyName: p.policyName }
        return p
      })
      this.activePolicy = this.release.policies[0]
      this.release.resourceVersions = this.release.resourceVersions.map(i => {
        i.createDate = format(i.createDate, 'YYYY-MM-DD')
        return i
      })
    },
    getSelectedPolicies() {

    },
    // 处理 收藏
    collectReleaseHandler() {
      if(!this.isCollectedRelease) {
        this.$services.collections.post({ releaseId: this.releaseId })
          .then(res => res.data)
          .then(res => {
            if(res.errcode === 0) {
              this.isCollectedRelease = true
            }
          })
      }else {
        this.$services.collections.delete(this.releaseId)
          .then(res => res.data)
          .then(res => {
            if(res.errcode === 0) {
              this.isCollectedRelease = false
            }
          })
      }
    },
    exchangeActivePolicy(p) {
      if(p.policyId !== this.activePolicy.policyId) {
        this.activePolicy = p
      }
    },
    exchangeComparePolicy(item, index) {
      item.activeIndex = index
    },
    showPolicyCompareBox() {
      this.compareDialogVisible = true
    },
    showSignBox() {
      this.signDialogVisible = true
    },
    // 获取授权：即创建presentable
    authSign() {
      this.$message({ type: 'warning', message: '未完成开发！' })
      return

      const targetNodes = this.checkedNodeList.filter(n => this.rSubordinateNodesIds.indexOf(n.nodeId) > -1)
      targetNodes.forEach(nodeId => {
        this.$services.PresentablesService.post({
          nodeId,
          releaseId: this.releaseId,
          presentableName: this.release.releaseName,
          version: this.activeReleaseVersion,
          resolveReleases: this.getRosolveReleases(),
        })
          .then(res => res.data)
          .then(res => {
            if(res.errcode === 0) {

            }
          })
      })
    },
    // 获取 发行以及其上抛的解决方式
    getRosolveReleases() {
      const tmpMap = {}
      const targetArr = []
      this.selectedPolicies.forEach(p => {
        const { releaseId, policyId } = p
        if(tmpMap[releaseId]) {
          tmpMap[releaseId].contracts.push({ policyId })
        }else {
          const rItem = { releaseId, contracts:[{ policyId }]}
          tmpMap[releaseId] = rItem
          targetArr.push(rItem)
        }
      })
      return targetArr
    },
  },
  created() {
    this.isShowContentLoading = true
    this.fetchReleaseDetail()
    this.fetchReleaseSubordinateNodes()
    this.getColleactedStatus()
  }
}
