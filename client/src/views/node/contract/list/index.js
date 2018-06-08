import TableView from '@/components/TableView/index.vue'
import ContractUtils from '@/data/contract/utils'
import DataLoader from '@/data'

export default {
  name: 'node-contracts',
  data() {
    return {
      contractList: [],
      query: ''
    }
  },
  components: {
    TableView
  },

  mounted() {
    var self = this;
    var loader = this.loader()

    return loader({}).then(list => {
      this.contractList = list
      console.log('contracts', list)
    })
  },
  methods: {
    querySearchAsync() {

    },
    handleSelectSearchItem() {

    },
    queryHandler() {
      this.$message.warning('待开发')
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

        if (item && item.presentableId) {
          Object.assign(contract, {
            presentableDetail: item
          })
        } else if (item) {
          Object.assign(contract, {
            resourceDetail: item
          })
        }
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
