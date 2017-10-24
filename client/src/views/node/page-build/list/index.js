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
    defaultHandler(presentable) {
      this.$message.warning('待开发')
    },
    handlePreview(presentable) {
      this.$router.push({path: `/node/${this.$route.params.nodeId}/resource/detail`, query: {presentableId: presentable.presentableId}})
    }
  }
}
