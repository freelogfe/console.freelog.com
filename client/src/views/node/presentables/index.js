import TableView from '@/components/TableView/index.vue'
import CONFIG from '@/config/index'

const STATUS_TIPS = CONFIG.PRESENTABLE_STATUS_TIPS
export default {
  name: 'presentables',
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
    queryHandler() {
      this.$message.warning('待开发')
    },
    formatHandler(list) {
      list.forEach((item) => {
        item._statusInfo = STATUS_TIPS[item.status]
      })
      return list
    },
    mergeResourceData(contracts, data) {
      var dataMap = {}
      data.forEach((p) => {
        dataMap[p.resourceId] = p
      })

      contracts.forEach((contract) => {
        var item = dataMap[contract.resourceId] || null;
        if (item) {
          Object.assign(contract, {
            resourceDetail: item
          })
        }
      })
    },
    mergePersentableData(contracts, data) {
      var dataMap = {}
      data.forEach((p) => {
        dataMap[p.contractId] = p
      })
      contracts.forEach((contract) => {
        var item = dataMap[contract.contractId] || null;
        if (item && item.presentableId) {
          Object.assign(contract, {
            presentableDetail: item
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

          if (!contracts.length) {
            return res
          }

          var resourceIds = contracts.map((c) => {
            return c.resourceId
          })

          return Promise.all([this.loadResourceData(resourceIds), self.loadPresentables({
            contractIds: contractIds.join(','),
            nodeId: nodeId
          })]).then((responses) => {
            var resourcesData = responses[0]
            var presentables = responses[1]
            self.mergeResourceData(contracts, resourcesData)
            self.mergePersentableData(contracts, presentables)
            return res
          })
        })
      }
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
    handlePresentable(row, type, hash) {
      var query = {
        presentableId: row.presentableDetail && row.presentableDetail.presentableId,
        contractId: row.contractId
      }
      type = type || 'detail'
      hash = (hash && (`#${hash}`)) || ''

      if (!hash && !row.presentableDetail) {
        hash = '#presentable'
      }
      var path = `/node/${this.$route.params.nodeId}/presentable/${type}${hash}`
      this.$router.push({
        path: path,
        query: query
      })
    }
  }
}
