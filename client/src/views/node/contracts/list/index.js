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
    loadContracts(param) {
      return this.$services.contract.get(param || {}).then((res) => {
        var data = res.data;

        if (data.ret === 0) {
          return res
        } else {
          Promise.reject(new Error(data.msg))
        }
      })
    },
    loadPresentables(param) {
      return this.$services.presentables.get({params: param}).then((res) => {
        var data = res.data;

        if (data.ret === 0) {
          return res
        } else {
          Promise.reject(new Error(data.msg))
        }
      })
    },
    mergeData(contracts, presentables) {
      var presentableMap = {}
      presentables.forEach((p) => {
        presentableMap[p.contractId] = p
      })
      contracts.forEach((contract) => {
        Object.assign(contract, {
          presentableDetail: presentableMap[contract.contractId] || null
        })
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
          return self.loadPresentables({
            contractIds: contractIds.join(','),
            nodeId: nodeId
          }).then((res2) => {
            var presentables = res2.data.data;
            self.mergeData(contracts, presentables)
            return res
          })
        })
      }
    },
    handlePresentable(row) {
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
