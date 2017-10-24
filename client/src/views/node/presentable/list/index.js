import TableView from '@/components/TableView/index.vue'

export default {
  name: 'node-presentables',
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
        return this.$services.presentables.get({
          params: param
        })
      }
    },
    handleEdit(presentable) {
      this.$router.push({path: `/node/${this.$route.params.nodeId}/presentable/edit`, query: {presentableId: presentable.presentableId}})
    },
    handlePreview(presentable) {
      this.$router.push({path: `/node/${this.$route.params.nodeId}/presentable/detail`, query: {presentableId: presentable.presentableId}})
    }
  }
}
