import SchemeLoader from '@/data/scheme/loader'
import resourceCompiler from '@freelog/resource-policy-compiler'
import ContractDetail from '../../../node/contract/detail/index.vue'
import {SCHEME_PUBLISH_STATUS} from '@/config/scheme'

function generateAlpha(num) {
  num = num || 26;
  var alphas = []
  for (var i = 0; i < num; i++) {
    alphas.push(String.fromCharCode(65 + i))
  }

  return alphas
}

const ContractStates = [{
  status: 0,
  desc: '未完成'
}, {
  status: 1,
  desc: '已发布'
}, {
  status: 2,
  desc: '合约待执行'
}, {
  status: 3,
  desc: '发布'
},]

export default {
  name: 'auth-scheme-detail',
  data() {
    return {
      curChoice: 0,
      choices: [],
      selectedPolicy: '',
      schemes: [],
      inited: false,
      showDialog: false,
      currentScheme: {}
    }
  },
  components: {ContractDetail},
  props: {
    selectedCallback: {
      type: Function
    },
    resource: {
      type: Object
    }
  },
  watch: {
    resource() {
      if (this.resource && this.resource.resourceId && !this.inited) {
        this.init()
        this.inited = true
      }
    }
  },
  mounted() {

  },
  methods: {
    init() {
      SchemeLoader.onloadSchemesForResource(this.resource.resourceId)
        .then((data) => {
          if (data.length) {
            this.schemes = this.formatSchemes(data);
          }
        }).catch(this.$error.showErrorMessage)
    },
    changePolicy(scheme, policy) {
      this.selectedCallback && this.selectedCallback(scheme, policy)
    },
    formatSchemes(schemes) {
      schemes = schemes.filter((scheme, i) => {
        if (!this.resource.isOwner && SCHEME_PUBLISH_STATUS.DELETE === scheme.status) {
          return false
        }
        scheme.dependencies = scheme.bubbleResources
        scheme.showContracts = scheme.dutyStatements.length > 0
        scheme._contractStatusInfo = ContractStates[i]
        scheme.policy.forEach(p => {
          try {
            p._fmtSegmentText = resourceCompiler.beautify(p.segmentText)
          } catch (e) {
            p._fmtSegmentText = p.segmentText
          }
        });
        return scheme
      });
      this.choices = generateAlpha(schemes.length).map((alpha, index) => {
        return {
          index: index,
          label: alpha
        }
      });
      return schemes;
    },
    loadPolicies() {
      return this.$services.authSchemes.get({
        params: {
          resourceIds: this.resource.resourceId
        }
      }).then((res) => {
        if (res.data.errcode === 0) {
          return res.getData()
        } else {
          throw new Error(res)
        }
      })
    },
    gotoResourceSchemeDetailHandler() {
      this.$router.push(`/resource/detail/${this.resource.resourceId}/auth_schemes`);
    },
    hideAuthSchemeHandler() {
      this.$emit('close')
    },
    updateContractHandler(contract) {
      var contracts = this.currentScheme.dutyStatements
      for (let i = 0; i < contracts.length; i++) {
        if (contracts[i].contractId === contract.contractId) {
          Object.assign(contracts[i], contract);
          break;
        }
      }
    },
    showContractsHandler(scheme) {
      this.currentScheme = scheme
      this.showDialog = true;
    },
    expandChangeHandler(row, expandedRows) {
      var expanded = expandedRows.length > 0
      if (expanded && !row.inited) {
        row.inited = true
      }
    },
    expandRowHandler(row) {
      this.$refs.contractsTable.toggleRowExpansion(row)
    }
  }
}
