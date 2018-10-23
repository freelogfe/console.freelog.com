import TableView from '@/components/TableView/index.vue'
import ContractUtils from '@/data/contract/utils'
import DataLoader from '@/data'
import ContractDetail from '../detail/index.vue'
import contract from '../../../../services/contract'

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
    const query = this.$route.query

    this.loadPresentables({ nodeId: this.$route.params.nodeId, isOnline: 2 })
      .then((presentables) => {
        const presentableIds = presentables.map(p => p.presentableId)

        if (presentableIds.length) {
          this.loadContractInfos(presentableIds).then((data) => {
            data.forEach((p) => {
              const contractIds = []
              const resourceIds = []
              const contractsMap = {}
              p.contracts = p.contracts.filter((contract) => {
                resourceIds.push(contract.resourceId)
                contractIds.push(contract.contractId)
                contractsMap[contract.contractId] = contract
                ContractUtils.format(contract)
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

            console.log(data)
            this.presentables = data
          })
        }
      })
  },
  methods: {
    loadContractsDetail(contractIds) {
      return this.$axios.get('v1/contracts/contractRecords', {
        params: {
          contractIds: contractIds.join(',')
        }
      }).then(res => res.getData())
    },
    loadContractInfos(presentableIds) {
      return this.$axios.get('v1/presentables/contractInfos', {
        params: {
          nodeId: this.$route.params.nodeId,
          presentableIds: presentableIds.join(',')
        }
      }).then(res => res.getData())
    },
    loadResourceData(resIds) {
      return this.$axios.get('/v1/resources/list', {
        params: {
          resourceIds: resIds.join(',')
        }
      }).then(res => res.getData())
    },
    loadContracts(param) {
      return this.$services.contract.get(param || {}).then(res => res).catch(this.$error.showErrorMessage)
    },
    loadPresentables(param) {
      return DataLoader.presentable.loadDetail({ params: param }).catch(this.$error.showErrorMessage)
    },
    mergeDataByResourceId(contracts, data) {
      const dataMap = {}
      data.forEach((p) => {
        dataMap[p.resourceId] = p
      })
      contracts.forEach((contract) => {
        const item = dataMap[contract.resourceId] || null

        this.$set(contract, 'resourceDetail', item)
      })
    },
    loader() {
      const self = this
      return (param) => {
        const nodeId = self.$route.params.nodeId
        if (typeof param === 'object') {
          Object.assign(param, {
            partyTwo: nodeId,
            contractType: 2
          })
          param = {
            params: param
          }
        }
        return self.loadContracts(param).then((res) => {
          if (!res.data.data) {
            return []
          }
          const contracts = res.data.data.dataList

          contracts.forEach((c) => {
            ContractUtils.format(c)
          })

          if (!contracts.length) {
            return res
          }
          const resourceIds = contracts.map(c => c.resourceId)


          return Promise.all([this.loadResourceData(resourceIds)]).then((responses) => {
            const resourcesData = responses[0]
            self.mergeDataByResourceId(contracts, resourcesData)
            console.log(contracts)
            return contracts
          })
        })
      }
    },
    handlePresentable(row) {
      const nodeId = this.$route.params.nodeId
      if (!row.presentableDetail) {
        this.$router.push({
          path: `/node/${nodeId}/presentable/detail#presentable`,
          query: { contractId: row.contractId }
        })
      } else {
        this.$router.push({
          path: `/node/${nodeId}/presentable/detail`,
          query: { presentableId: row.presentableDetail.presentableId }
        })
      }
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
      console.log(curContractId, presentable.masterContract ?
        (curContractId === presentable.masterContract.contractId) :
        (curContractId === presentable.contractId))
      return curContractId && (presentable.masterContract ?
        (curContractId === presentable.masterContract.contractId) :
        (curContractId === presentable.contractId))
    }
  }
}
