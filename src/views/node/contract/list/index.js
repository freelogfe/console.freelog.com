import TableView from '@/components/TableView/index.vue'
import ContractUtils from '@/data/contract/utils'
import { onloadPresentableDetail } from '@/data/presentable/loader'
import { onloadResourceDetail } from '@/data/resource/loader'
import ContractDetail from '../detail/index.vue'

export default {
  name: 'node-contracts',
  data() {
    return {
      contractList: [],
      query: '',
      presentables: [],
      currentContract: {}
    }
  },
  components: {
    TableView,
    ContractDetail
  },

  mounted() {
    this.initView()
  },
  methods: {
    initView() {
      const query = this.$route.query
      Object.assign(query, this.$route.params)
      this.loadData(query)
    },
    loadData(query) {
      this.loadPresentables({ nodeId: query.nodeId, isOnline: 2 })
        .then((presentables) => {
          const presentableIds = presentables.map(p => p.presentableId)

          if (presentableIds.length) {
            this.loadContractInfos(presentableIds).then((data) => {
              data.forEach((p) => {
                const contractIds = []
                const resourceIds = []
                const contractsMap = {}
                p.contracts = p.contracts.filter((contract) => {
                  contract.resourceDetail = {}
                  resourceIds.push(contract.resourceId)
                  contractIds.push(contract.contractId)
                  contractsMap[contract.contractId] = contract
                  ContractUtils.format(contract)

                  onloadResourceDetail(contract.resourceId).then((info) => {
                    contract.resourceDetail = info
                  }).catch(this.$error.showErrorMessage)

                  if (query.contractId === contract.contractId) {
                    this.showContractDetailHandler(contract)
                  }
                  if (contract.isMasterContract) {
                    p.masterContract = contract
                    return false
                  }
                  return contract
                })
              })

              this.presentables = data
            })
          } else {
            this.presentables = []
          }
        })
    },
    loadContractInfos(presentableIds) {
      return this.$axios.get('v1/presentables/contractInfos', {
        params: {
          nodeId: this.$route.params.nodeId,
          presentableIds: presentableIds.join(',')
        }
      }).then(res => res.getData())
    },

    loadPresentables(param) {
      return onloadPresentableDetail({ params: param }).catch(this.$error.showErrorMessage)
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
      this.$router.push({ query: { contractId: contract.contractId } })
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
