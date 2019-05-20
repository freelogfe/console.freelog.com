
import { beautify } from '@freelog/resource-policy-lang'
import SchemeFloatBall from '@/components/Authorization-scheme/scheme-float-ball.vue'

export default {
  name: 'scheme-manage',
  components: {
    SchemeFloatBall
  },
  props:  {
    type: {
      type: String,
      default: 'create'
    },
    release: Object,
    releaseScheme: Object,
    releasesTreeData: Array,
    depReleases: {
      type: Array,
      default: []
    },
    baseUpcastReleases: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
      isLoading: false,
      activeSelectedIndex: 0,
      isSelectedReleaesUpcast: false,
      depReleasesList: [],
      upcastDepReleasesIds: [],
      upcastDepReleasesMap: null,
      targetReleases: [],
      tmpSelectedPolicies: [],
      selectedAuthSchemes: [],
      selectedRelease: null,
      // releaseScheme: null
    }
  },
  computed: {
    depReleasesMap() {
      var map = {}
      this.depReleasesList.forEach(release => {
        map[release.releaseId] = release
      })
      return map
    },
    baseUpcastReleasesIDs() {
      return this.baseUpcastReleases.map(i => i.releaseId)
    },
    projection() {
      return ["releaseId", "resourceType", "releaseName", "latestVersion", "baseUpcastReleases", "policies", "updateDate"].join(',')
    },
  },
  watch: {
    releaseScheme() {
      this.getTargetReleases()
    }
  },
  methods: {
    fetchReleases(ids) {
      return this.$services.ReleaseService.get(`list?releaseIds=${ids}&projection=${this.projection}`)
        .then(res => res.data)
    },
    // 获取 依赖发行
    fetchDepReleases() {
      const depReleaseIDs = this.depReleases.map(dep => dep.releaseId).join(',')
      this.fetchReleases(depReleaseIDs)
        .then(res => {
          if(res.errcode === 0) {
            this.depReleasesList = res.data || []
            let tmpArr = []
            this.depReleasesList.forEach(item => {
              tmpArr = [ ...tmpArr, ...item.baseUpcastReleases.map(i => i.releaseId) ]
            })
            this.upcastDepReleasesIds = tmpArr
            if(tmpArr.length > 0) {
              this.fetchUpcastDepReleases()
            }else {
              this.upcastDepReleasesMap = {}
              this.getTargetReleases()
            }
          }
        })
        .catch(e => this.isLoading = false)
    },
    // 获取 依赖发行的上抛发行
    fetchUpcastDepReleases() {
      if(this.upcastDepReleasesIds.length) {
        this.fetchReleases(this.upcastDepReleasesIds.join(','))
          .then(res => {
            if(res.errcode === 0) {
              const arr = res.data || []
              this.upcastDepReleasesMap = {}
              for(let i = 0; i < arr.length; i++) {
                let releaseId = arr[i].releaseId
                this.upcastDepReleasesMap[releaseId] = arr[i]
              }
              this.getTargetReleases()
            }
          })
          .catch(e => this.isLoading = false)
      }

    },
    getTargetReleases() {
      if(this.upcastDepReleasesMap) {
        this.resolveReleaseScheme()
        const fReleases = []
        for(let i = 0; i < this.depReleasesList.length; i++) {
          let rItem = this.depReleasesList[i]
          rItem.isSecondLevel = false
          fReleases.push(this.formatRelease(rItem))
          rItem.baseUpcastReleases.forEach(item => {
            const tmpRelease = this.upcastDepReleasesMap[item.releaseId]
            if(tmpRelease) {
              tmpRelease.isSecondLevel = true
              fReleases.push(this.formatRelease(tmpRelease))
            }
          })
        }
        this.targetReleases = fReleases
        this.releasesTreeData && this.$emit('update:releasesTreeData', this.targetReleases)
        this.resetData()
      }
      this.isLoading = false

    },
    resolveReleaseScheme() {
      if(!this.releaseScheme ) return

      const { resolveReleases } = this.releaseScheme

      for(let i = 0; i < resolveReleases.length; i++) {
        const { contracts, releaseId } = resolveReleases[i]
        const release = this.depReleasesMap[releaseId] || this.upcastDepReleasesMap[releaseId]
        const pIds = contracts.map(c => c.policyId)

        if(release) {
          release.contracts = contracts
          release.resolveStatus = 'resolved'
          release.policies.forEach(p => {
            if(pIds.indexOf(p.policyId) > -1) {
              p.isSelected = true
              release.selectedPolicies = release.selectedPolicies || []
              release.selectedPolicies.push(p)
            }
          })
        }
      }
    },
    formatRelease(release) {
      if(this.baseUpcastReleasesIDs.indexOf(release.releaseId) !== -1) {
        release.isUpcasted = true
      }else {
        release.isUpcasted = false
      }
      this.initReleaseResolveStatus(release)
      release.selectedPolicies = release.selectedPolicies || []
      release.policies = release.policies.map(p => {
        p.isSelected = typeof p.isSelected === 'undefined' ? false : p.isSelected
        return p
      })
      return release
    },
    // 初始发行方案解决状态（已解决、未解决、上抛）
    initReleaseResolveStatus(release) {
      switch (this.type) {
        case 'create': {
          release.resolveStatus = 'no-resolve'
          break
        }
        case 'add': {}
        case 'edit': {
          release.resolveStatus = release.resolveStatus ? release.resolveStatus : release.isUpcasted ? 'upcast' : 'no-resolve'
          break
        }
        default: {}
      }
    },
    resetData() {
      this.selectedRelease = this.targetReleases[this.activeSelectedIndex]
      this.tmpSelectedPolicies = this.selectedRelease.policies
      this.isSelectedReleaesUpcast = this.selectedRelease.isUpcasted
      this.selectedRelease.resolveStatus = this.getReleaseResolveStatus()
      this.resolveSelectedAuthSchemes()
    },
    // 获取 发行方案解决状态（已解决、未解决、上抛）
    getReleaseResolveStatus() {
      if(this.selectedRelease.isUpcasted) {
        return 'upcast'
      }else {
        if(this.selectedRelease.selectedPolicies.length > 0) {
          return 'resolved'
        }else {
          return 'no-resolve'
        }
      }
    },
    resolveSelectedAuthSchemes() {
      const arr = []
      const releases = this.targetReleases
      for(let i = 0; i < releases.length; i++) {
        if(releases[i].resolveStatus === 'resolved') {
          arr.push(releases[i])
        }
      }
      this.selectedAuthSchemes = arr
      this.$emit('update-resolved-releases', this.selectedAuthSchemes)
    },
    fmtPolicyTextList(p) {
      return beautify(p.policyText)
    },
    upcastHandler() {
      this.selectedRelease.isUpcasted = !this.selectedRelease.isUpcasted
      this.resetData()
      if(this.selectedRelease.isUpcasted) {
        this.toggleBaseUpcastReleases(this.selectedRelease, 'add')
      }else {
        this.toggleBaseUpcastReleases(this.selectedRelease, 'delete')
      }
      this.$emit('update:baseUpcastReleases', this.baseUpcastReleases)
    },
    // 切换 发行
    exchangeSelectedRelease(index) {
      this.activeSelectedIndex = index
      this.resetData()
    },
    // 选择策略
    selectPolicy(policy, index) {
      policy.isSelected = !policy.isSelected
      this.tmpSelectedPolicies.splice(index, 1, policy)
      if(policy.isSelected) {
        this.togglePolicy(policy, 'add')
      }else {
        this.togglePolicy(policy, 'delete')
      }
      this.resetData()
    },
    toggleArrayItem(type, arr, target, verify) {
      var index = -1
      for(let i = 0; i < arr.length; i++) {
        if(verify(target, arr[i])) {
          index = i
          break
        }
      }
      switch (type) {
        case 'add': {
          if(index === -1) {
            arr.push(target)
          }
          break
        }
        case 'delete': {
          if(index !== -1) {
            arr.splice(index, 1)
          }
        }
      }
    },
    togglePolicy(policy, type) {
      const arr = this.selectedRelease.selectedPolicies
      this.toggleArrayItem(type, arr, policy, (i1, i2) => i1.policyId === i2.policyId)
    },
    toggleBaseUpcastReleases(release, type) {
      const arr = this.baseUpcastReleases
      this.toggleArrayItem(type, arr, release, (i1, i2) => i1.releaseId === i2.releaseId)
    },
  },
  created() {
    this.isLoading = true
    this.fetchDepReleases()
  }
}
