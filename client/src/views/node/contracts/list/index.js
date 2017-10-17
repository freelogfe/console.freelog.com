import TableView from '@/components/TableView/index.vue'

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
    loader() {
      return (param) => {
        if (typeof param === 'object') {
          Object.assign(param, {
            partyTwo: this.$route.params.nodeId
          })
          param = {
            params: param
          }
        }

        return this.$services.contract.get(param || {})
      }
    },
    handlePresentable(row) {
      if (!row.contractId) {
        this.$message.warning('无效合同，无法进行创建presentable');
      } else {
        this.$router.push({
          path: `/node/${this.$route.params.nodeId}/presentable/create`,
          query: {contractId: row.contractId}
        })
      }
    },
    previewHandler(resource) {
      this.$router.push({
        path: `/node/${this.$route.params.nodeId}/contract/detail`,
        query: {contractId: resource.contractId}
      })
    }
  }
}
