import TableView from '@/components/TableView/index.vue'
import ContractUtils from '@/data/contract/utils'
import DataLoader from '@/data'

export default {
  name: 'node-contracts',
  data() {
    return {
      contractList: [],
      query: '',
      presentables: []
    }
  },
  components: {
    TableView
  },

  mounted() {
    var self = this;
    // var loader = this.loader()
    this.loadPresentables({nodeId: this.$route.params.nodeId})
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
                resourceIds.push(contract.resourceId)
                contractIds.push(contract.contractId)
                contractsMap[contract.contractId] = contract
                ContractUtils.format(contract)
                if (contract.isMasterContract) {
                  p.masterContract = contract
                } else {
                  return contract
                }
              });
            })
            this.presentables = data
          })
        }
      })
  },
  methods: {
    loadContractsDetail(contractIds) {
      return this.$axios.get(`v1/contracts/contractRecords`, {
        params: {
          contractIds: contractIds.join(',')
        }
      }).then(res => {
        return res.getData()
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
    loadResourceData(resIds) {
      return this.$axios.get('/v1/resources/list', {
        params: {
          resourceIds: resIds.join(',')
        }
      }).then(res => {
        return res.getData()
      })
    },
    loadContracts(param) {
      return this.$services.contract.get(param || {}).then((res) => {
        return res
      }).catch(this.$error.showErrorMessage)
    },
    loadPresentables(param) {
      return DataLoader.presentable.loadDetail({params: param}).catch(this.$error.showErrorMessage)
    },
    mergeDataByResourceId(contracts, data) {
      var dataMap = {}
      data.forEach((p) => {
        dataMap[p.resourceId] = p
      })
      contracts.forEach((contract) => {
        var item = dataMap[contract.resourceId] || null;

        this.$set(contract, 'resourceDetail', item)
      })
    },
    loader() {
      const self = this;
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
          var contracts = res.data.data.dataList

          var contractIds = contracts.map((c) => {
            ContractUtils.format(c)
            return c.contractId
          })

          if (!contracts.length) {
            return res
          }
          var resourceIds = contracts.map((c) => {
            return c.resourceId
          })


          return Promise.all([this.loadResourceData(resourceIds)]).then((responses) => {
            var resourcesData = responses[0]
            self.mergeDataByResourceId(contracts, resourcesData)
            // self.mergeDataByResourceId(contracts, presentables)
            console.log(contracts)
            return contracts
          })
        })
      }
    },
    handlePresentable(row) {
      var nodeId = this.$route.params.nodeId
      if (!row.presentableDetail) {
        this.$router.push({
          path: `/node/${nodeId}/presentable/detail#presentable`,
          query: {contractId: row.contractId}
        })
      } else {
        this.$router.push({
          path: `/node/${nodeId}/presentable/detail`,
          query: {presentableId: row.presentableDetail.presentableId}
        })
      }
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
    activateContractHandler(contract) {
      this.$axios.get(`/v1/contracts/initial`, {
        params: {
          contractIds: contract.contractId
        }
      }).then(res => {
        if (res.data.errcode === 0) {
          this.$message.success('成功激活合同')
          this.loadContracts(contract.contractId).then(res => {
            Object.assign(contract, res.getData());
            ContractUtils.format(contract)
            this.$forceUpdate()
          })
        } else {
          this.$error.showErrorMessage(res.data.msg)
        }
      })
    }
  }
}
