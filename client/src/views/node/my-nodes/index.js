import TableView from '@/components/TableView/index.vue'

export default {
  name: 'my-nodes',
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
        return this.$services.nodes.get()
      }
    },
    handleEdit(nodeDetail) {
      this.$router.push({path: '/node/edit', query: {nodeId: nodeDetail.nodeId}})
    },
    gotoNodeHandler(nodeDetail) {
      this.$router.push({path: `/node/${nodeDetail.nodeId}`})
    }
  }
}
