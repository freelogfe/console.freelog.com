import { format } from 'date-fns'
import { mapGetters } from 'vuex'
import RichEditor from '@/components/RichEditor/index.vue'
export default {
  name: "release-detail",
  components: { RichEditor },
  data() {
    return {
      isShowContentLoading: false,
      isCollectedRelease: false,
      releaseId: this.$route.params.releaseId,
      activeReleaseVersion: '',
      release: null,
      activePolicy: null,
      selectedPolicyId: '',
      comparePolices: [
        { activeIndex: 0 },
        { activeIndex: 1 },
      ],
      resourceDetail: {
        resourceInfo: {
          description: ''
        }
      },
      releases: [{
        releaseName: '发行1234',
        policyList: [{
          "signAuth": 0,
          "authorizedObjects": [{
            "userType": "GROUP",
            "users": ["PUBLIC"]
          }],
          "policyId": "8cefe2f1dcc6dd0bdaadac946cb63dbc",
          "policyName": "免费策略",
          "status": 1,
          "policyText": "for public:\n  initial:\n    active\n    recontractable\n    presentable\n    terminate"
        }, {
          "signAuth": 0,
          "authorizedObjects": [{"userType": "GROUP", "users": ["PUBLIC"]}],
          "policyId": "8cefe2f1dcc6dd0bdaadac946cb63dbc",
          "policyName": "策略123",
          "status": 1,
          "policyText": "for public:\n  escrow account acct\n  custom event acceptor.customEvent\n\n  initial:\n    proceed to auth on acct exceed 1 feather\n  auth:\n    presentable\n    active\n    proceed to refund on acct.confiscated\n  refund:\n    proceed to finish on acct.refunded\n  finish:\n    terminate",
          "policySegmentId": "8cefe2f1dcc6dd0bdaadac946cb63dbc",
          "disabled": false
        }],
      }, {
        releaseName: '发行4321',
        policyList: [{
          "signAuth": 0,
          "authorizedObjects": [{
            "userType": "GROUP",
            "users": ["PUBLIC"]
          }],
          "policyId": "8cefe2f1dcc6dd0bdaadac946cb63dbc",
          "policyName": "免费策略",
          "status": 1,
          "policyText": "for public:\n  initial:\n    active\n    recontractable\n    presentable\n    terminate"
        }, {
          "signAuth": 0,
          "authorizedObjects": [{"userType": "GROUP", "users": ["PUBLIC"]}],
          "policyId": "8cefe2f1dcc6dd0bdaadac946cb63dbc",
          "policyName": "策略123",
          "status": 1,
          "policyText": "for public:\n  escrow account acct\n  custom event acceptor.customEvent\n\n  initial:\n    proceed to auth on acct exceed 1 feather\n  auth:\n    presentable\n    active\n    proceed to refund on acct.confiscated\n  refund:\n    proceed to finish on acct.refunded\n  finish:\n    terminate",
          "policySegmentId": "8cefe2f1dcc6dd0bdaadac946cb63dbc",
          "disabled": false
        }],
      }, {
        releaseName: '发行4321',
        policyList: [{
          "signAuth": 0,
          "authorizedObjects": [{
            "userType": "GROUP",
            "users": ["PUBLIC"]
          }],
          "policyId": "8cefe2f1dcc6dd0bdaadac946cb63dbc",
          "policyName": "免费策略",
          "status": 1,
          "policyText": "for public:\n  initial:\n    active\n    recontractable\n    presentable\n    terminate"
        }, {
          "signAuth": 0,
          "authorizedObjects": [{"userType": "GROUP", "users": ["PUBLIC"]}],
          "policyId": "8cefe2f1dcc6dd0bdaadac946cb63dbc",
          "policyName": "策略123",
          "status": 1,
          "policyText": "for public:\n  escrow account acct\n  custom event acceptor.customEvent\n\n  initial:\n    proceed to auth on acct exceed 1 feather\n  auth:\n    presentable\n    active\n    proceed to refund on acct.confiscated\n  refund:\n    proceed to finish on acct.refunded\n  finish:\n    terminate",
          "policySegmentId": "8cefe2f1dcc6dd0bdaadac946cb63dbc",
          "disabled": false
        }],
      }],
      // nodes: [{ nodeName: '节点121' }, { nodeName: '节点321' }],
      compareDialogVisible: false,
      signDialogVisible: false,
    }
  },
  computed: Object.assign({

  }, mapGetters({
    nodes: 'nodes'
  })),
  methods: {
    fetchReleaseDetail() {
      this.$services.ReleaseService.get(this.releaseId)
        .then(res => res.data)
        .then(res => {
          if(res.errcode === 0) {
            this.release = res.data
            this.formatReleaseData()
            this.fetchResourceDetail()
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
    getColleactedStatus(){
      this.$services.collections.get(this.releaseId)
        .then(res => res.data)
        .then(res => {
          this.isCollectedRelease = true
        })
    },
    formatReleaseData() {
      this.activeReleaseVersion = this.release.latestVersion.version
      this.activePolicy = this.release.policies[0]
      this.release.resourceVersions = this.release.resourceVersions.map(i => {
        i.createDate = format(i.createDate, 'YYYY-MM-DD')
        return i
      })
    },
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

  },
  watch: {
    activeReleaseVersion() {
      this.isShowContentLoading = true
      this.fetchResourceDetail()
    }
  },
  created() {
    this.isShowContentLoading = true
    this.fetchReleaseDetail()
    this.getColleactedStatus()
  }
}
