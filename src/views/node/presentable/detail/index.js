import PolicyList from '@/components/PolicyList/index.vue'
import ContractManager from '@/components/ContractManager/index.vue'
import AuthorizationSchemeManage from "@/components/Authorization-scheme/index.vue"

import {onloadSchemeDetail} from '@/data/scheme/loader'
import {onloadPresentableDetail} from '@/data/presentable/loader'

import PresentableDetailHeader from './header.vue'


const TAB_NAMES = {
  policy: 'policy-manager',
  contract: 'contract-manager',
  schema: 'schema-manager'
}

export default {
  name: 'presentable-detail',
  data() {
    return {
      params: {},
      loading: false,
      TAB_NAMES,
      activeTabName: TAB_NAMES.policy, //contract-manager, schema-manager
      resourceInfo: {},
      presentableInfo: {
        policy: [],
        contracts: []
      }
    }
  },

  props: {
    detail: {
      type: Object
    }
  },
  components: {
    AuthorizationSchemeManage,
    PresentableDetailHeader,
    PolicyList,
    ContractManager
  },

  computed: {},

  watch: {
    '$route': function () {
      this.initView()
    }
  },
  mounted() {
    this.initView()
  },
  methods: {
    initView() {
      this.params = this.$route.params
      if (!this.params.presentableId) {
        return this.$error.showErrorMessage('缺乏presentable参数')
      }

      const tab = this.$route.query.tab

      if (Object.keys(TAB_NAMES).includes(tab)) {
        this.activeTabName = TAB_NAMES[tab]
      }

      this.loadPresentableData(this.params)
        .then(this.loadPresentableScheme.bind(this))
    },
    loadPresentableData(params) {
      return onloadPresentableDetail(params.presentableId)
        .then(presentable => {

          presentable.contracts.some(contract => {
            if (contract.contractId === presentable.masterContractId) {
              contract.isMasterContract = true
              return true
            }
          })

          this.presentableInfo = {...presentable}

          this.resourceInfo = Object.assign(presentable.resourceInfo, {resourceId: presentable.resourceId})
        })
    },
    loadPresentableScheme() {
      const contract = this.getPresentableContract()
      if (contract) {
        onloadSchemeDetail(contract.authSchemeId).then((scheme) => {
          if (scheme) {
            for (let i = 0; i < scheme.policy.length; i += 1) {
              const policy = scheme.policy[i]
              if (policy.segmentId === contract.policySegmentId) {
                scheme.selectedPolicy = policy
                break
              }
            }

            this.$set(this.presentableInfo, 'scheme', scheme)
          }
        })
      }
    },
    getPresentableContract() {
      const contracts = this.presentableInfo.contracts || []
      if (contracts.length) {
        let contract
        for (let i = 0; i < contracts.length; i += 1) {
          contract = contracts[i]
          if (contract.resourceId === this.presentableInfo.resourceId) {
            return contract
          }
        }
      }

      return null
    },
    gotoSchemeDetailHandler() {
      this.$router.push({
        path: `/node/${this.$route.params.nodeId}/presentable/${this.presentableInfo.presentableId}/scheme_detail`,
        query: {resourceId: this.presentableInfo.resourceId}
      })
    },
    handleClick() {
      this.$router.push({
        path: `/node/${this.$route.params.nodeId}/presentable/${this.presentableInfo.presentableId}`,
        query: {tab: this.activeTabName}
      })
    },
    savePresentableHandler(payload) {
      this.$services.presentables.put(this.$route.params.presentableId, payload)
        .then(res => {
          const {errcode, ret, msg} = res.data
          if (errcode === 0 && ret === 0) {

          } else {
            this.$error.showErrorMessage(msg)
          }
        })
    },
    savePoliciesHandler({data}) {
      this.$services.presentables.put(this.$route.params.presentableId, data)
        .then(res => {
          const {errcode, ret, msg, data} = res.data
          if (errcode === 0 && ret === 0) {
            this.presentableInfo.policy = data.policy
          } else {
            this.$error.showErrorMessage(msg)
          }
        })
    }
  }
}
