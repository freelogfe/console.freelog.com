import TableView from '@/components/TableView/index.vue'
import ContractUtils from '@/data/contract/utils'
import {loadResources} from '@/data/resource/loader'
import ContractDetail from '@/components/ContractDetail/index.vue'

export default {
  name: 'fl-contract-manager',
  data() {
    return {
      // contracts: [],
      query: '',
      currentContract: {},
      contractList: [],
      masterContract: {}
    }
  },
  components: {
    TableView,
    ContractDetail
  },

  props: {
    contracts: Array
  },

  watch: {
    contracts() {
      this.initView()
    }
  },

  mounted() {
    if (this.contracts) {
      this.initView()
    }
  },
  methods: {
    initView() {
      if (!this.contracts.length) return

      this.masterContract = {}

      const query = this.$route.query
      Object.assign(query, this.$route.params)
      this.loadData(query)
        .then(this.formatContracts.bind(this))
        .then((contractList) => {
          this.contractList = contractList
          this.showContractDetailHandler(this.masterContract)
        })
    },
    formatContracts({contracts, resources}) {
      var resourcesMap = {}
      var contractList = []

      resources.forEach(resource => {
        resourcesMap[resource.resourceId] = resource
      })

      contracts.forEach((contract) => {
        contract.resourceDetail = resourcesMap[contract.resourceId]
        if (contract.contractId === this.masterContract.contractId) {
          Object.assign(this.masterContract, contract)
          ContractUtils.format(this.masterContract)
        } else {
          ContractUtils.format(contract)
          contractList.push(contract)
        }
      })
      return contractList
    },
    loadData() {
      var contractIds = []
      var resourceIds = []

      this.contracts.map(contract => {
        contractIds.push(contract.contractId)
        resourceIds.push(contract.resourceId)
        if (contract.isMasterContract) {
          this.masterContract = contract
        }
      })

      resourceIds = Array.from(new Set(resourceIds))
      return Promise.all([this.loadContractInfos(contractIds), this.loadResourcesInfo(resourceIds)])
        .then(res => {
          var [contracts, resources] = res
          return {
            contracts,
            resources
          }
        })
    },
    loadResourcesInfo(resourceIds) {
      return loadResources(resourceIds)
    },
    loadContractInfos(contractIds) {
      return this.$services.contractRecords.get({
        params: {
          contractIds: contractIds.join(',')
        }
      }).then(res => res.getData())
    },
    previewHandler(row) {
      const query = {}
      if (row.presentableDetail) {
        query.presentableId = row.presentableDetail.presentableId
      } else {
        query.contractId = row.contractId
      }
      this.$router.push({
        path: `/node/${this.$route.params.nodeId}/presentable/detail#contract`,
        query
      })
    },
    showContractDetailHandler(contract) {
      if (!contract || !contract.contractId) {
        // this.$message.warning('未创建合同')
        return
      }
      // this.$router.push({query: {contractId: contract.contractId}})
      this.currentContract = contract
    },
    resolveContractCreatorLink(presentable) {
      return `/node/${this.$route.params.nodeId}/presentable/${presentable.presentableId}/scheme_detail`
    },
    updateContractHandler(contract) {
      Object.assign(this.currentContract, contract)
    },
    isActiveTab(presentable) {
      const curContractId = this.currentContract.contractId

      return curContractId && (presentable.masterContract ?
        (curContractId === presentable.masterContract.contractId) :
        (curContractId === presentable.contractId))
    }
  }
}
