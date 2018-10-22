import TableView from '@/components/TableView/index.vue'

export default {
  name: 'node-resource-list',
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
    handleCommand(cmd) {
      if (this[cmd.fn]) {
        this[cmd.fn](cmd.data)
      }
    },
    viewSrcDetail(resource) {
      this.$router.push({
        path: `/resources/detail/${resource.resourceId}`
      })
    },
    autoQueryHandler() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.queryHandler()
      }, 8e2)
    },
    queryHandler() {
      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.$refs.resourceList.$emit('reload', {
        keyWords: encodeURIComponent(this.query)
      })
    },
    loader() {
      return (param) => {
        if (typeof param === 'object') {
          if (param.keyWords) {
            this.query = param.keyWords
          }
          param = {
            params: param
          }
        }

        return this.$services.g_Resources.get(param || {})
      }
    },
    gotoCreateContract(resource) {
      var query = {
        resourceName: resource.resourceName,
        resourceType: resource.resourceType,
        resourceId: resource.resourceId
      }

      this.$router.push({
        path: `/node/:nodeId/presentable/create`,
        query: query
      })
    },
    handleContact(resource) {
      switch (resource.status) {
        case 1:
          this.$message.warning('该资源还没创建policy，无法创建合同');
          break;
        case 2:
          this.gotoCreateContract(resource)
          break;
        case 3:
          this.$message.warning('该资源已被冻结');
          break;
        default:
          this.$message.warning('未知资源状态');
      }
    }
  }
}