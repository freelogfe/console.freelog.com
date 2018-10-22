import TableView from '@/components/TableView/index.vue'
import ContractUtils from '@/data/contract/utils'
import DataLoader from '@/data'
import ContractDetail from '../detail/index.vue'
import {loadDetail, loadResources} from '@/data/resource/loader'

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
    var query = this.$route.query;
    Object.assign(query, this.$route.params)
    this.loadData(query)
  },
  methods: {
    loadData(query) {
      this.loadPresentables({nodeId: query.nodeId, isOnline: 2})
        .then(presentables => {
          var presentableIds = presentables.map(p => {
            return p.presentableId
          })

          if (presentableIds.length) {
            this.loadContractInfos(presentableIds).then(data => {
              data.forEach(p => {
                var contractIds = [];
                var resourceIds = [];
                var contractsMap = {}
                p.contracts = p.contracts.filter(contract => {
                  contract.resourceDetail = {}
                  resourceIds.push(contract.resourceId)
                  contractIds.push(contract.contractId)
                  contractsMap[contract.contractId] = contract
                  ContractUtils.format(contract)

                  loadDetail(contract.resourceId).then(info => {
                    contract.resourceDetail = info
                  }).catch(this.$error.showErrorMessage)

                  if (query.contractId === contract.contractId) {
                    this.showContractDetailHandler(contract)
                  }
                  if (contract.isMasterContract) {
                    p.masterContract = contract
                  } else {
                    return contract
                  }
                })
              })

              setTimeout(function () {
                console.log(data)
              }, 1e3)
              this.presentables = data
            })
          }
        })
    },
    loadContractInfos(presentableIds) {
      return this.$axios.get(`v1/presentables/contractInfos`, {
        params: {
          nodeId: this.$route.params.nodeId,
          presentableIds: presentableIds.join(',')
        }
      }).then(res => {
        return res.getData()
      })
    },
    loadPresentables(param) {
      return DataLoader.presentable.loadDetail({params: param}).catch(this.$error.showErrorMessage)
    },
    previewHandler(row) {
      var query = {}
      if (row.presentableDetail) {
        query.presentableId = row.presentableDetail.presentableId
      } else {
        query.contractId = row.contractId
      }
      this.$router.push({
        path: `/node/${this.$route.params.nodeId}/presentable/detail#contract`,
        query: query
      })
    },
    showContractDetailHandler(contract) {
      if (!contract || !contract.contractId) {
        // this.$message.warning('未创建合同')
        return
      }
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
