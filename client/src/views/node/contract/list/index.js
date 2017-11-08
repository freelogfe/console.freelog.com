import TableView from '@/components/TableView/index.vue'
import contract from "../../../../services/contract";

export default {
  name: 'node-contracts',
  data() {
    return {
      resourceList: [],
      query: ''
    }
  },
  components: {
    TableView
  },

  mounted() {
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
      var promiseList = resIds.map((resId) => {
        return this.$services.resource.get(resId).then((res) => {
          return res.getData()
        })
      })

      return Promise.all(promiseList)
    },
    loadContracts(param) {
      return this.$services.contract.get(param || {}).then((res) => {
        return res
      }).catch((err) => {
        this.$message.error(err.response.errorMsg || err)
      })
    },
    loadPresentables(param) {
      return this.$services.presentables.get({params: param}).then((res) => {
        return res.getData()
      }).catch((err) => {
        this.$message.error(err.response.errorMsg || err)
      })
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
            partyTwo: nodeId
          })
          param = {
            params: param
          }
        }
        return self.loadContracts(param).then((res) => {
          var contracts = res.data.data.dataList
          var contractIds = contracts.map((c) => {
            return c.contractId
          })

          var resourceIds = contracts.map((c) => {
            return c.resourceId
          })

          return Promise.all([this.loadResourceData(resourceIds), self.loadPresentables({
            contractIds: contractIds.join(','),
            nodeId: nodeId
          })]).then((responses) => {
            var resourcesData = responses[0]
            var presentables = responses[1]
            self.mergeDataByResourceId(contracts, resourcesData)
            self.mergeDataByResourceId(contracts, presentables)
            return res
          })
        })
      }
    },
    handlePresentable(row) {
      console.log('row',row);
      var nodeId = this.$route.params.nodeId
      if (!row.presentableDetail) {
        this.$router.push({
          path: `/node/${nodeId}/presentable/create`,
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
      this.$router.push({
        path: `/node/${this.$route.params.nodeId}/contract/detail`,
        query: {contractId: row.contractId}
      })
    }
  }
}
