import TableView from '@/components/TableView/index.vue'

export default {
  name: 'node-page-build-list',
  data() {
    return {
      resourceList: []
    }
  },
  components: {
    TableView
  },

  mounted() {
  },
  methods: {
    loader() {
      return () => {
        var param = {
          nodeId: this.$route.params.nodeId
        };
        return this.$services.pagebuild.get({
          params: param
        })
      }
    },
    setDefaultPageBuildHandler(presentable) {
      this.$services.pagebuild.post({
        nodeId: this.$route.params.nodeId,
        status: 1,
        presentableId: presentableId
      }).then((res) => {
        this.$message.success('设置成功')
      }).catch((res) => {
        this.$message.error(res.response.errorMsg)
      })
    },
    handlePreview(presentable) {
      this.$router.push({
        path: `/node/${this.$route.params.nodeId}/resource/detail`,
        query: {presentableId: presentable.presentableId}
      })
    }
  }
}
