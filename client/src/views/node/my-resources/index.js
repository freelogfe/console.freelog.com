import TableView from '@/components/TableView/index.vue'

export default {
  name: 'node-my-resource-list',
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
          nodeId: 1
        };
        return this.$services.presentables.get({
          params: param
        })
      }
    },
    handleEdit(presentable) {
      this.$router.push({path: '/node/presentable/edit', query: {presentableId: presentable.presentableId}})
    },
    handlePreview(presentable) {
      this.$router.push({path: '/node/presentable/detail', query: {presentableId: presentable.presentableId}})
    }
  }
}
