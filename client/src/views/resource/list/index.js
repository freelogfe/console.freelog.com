import TableView from '@/components/TableView/index.vue'

export default {
  name: 'resource-list',
  data() {
    return {
      resourceList: [],
      RESOURCE_STATUS: [{
        text: '未知状态',
        type: 'info'
      }, {
        text: '正常',
        type: 'info'
      }, {
        text: '发布',
        type: 'success'
      }, {
        text: '冻结',
        type: 'danger'
      }]
    }
  },
  components: {
    TableView
  },

  mounted() {
  },
  methods: {
    loader() {
      return (param) => {
        if (typeof param === 'object') {
          param = {
            params: param
          }
        }
        return this.$services.resource.get(param || {})
      }
    },
    handlePolicy(resource) {
      this.$router.push({path: '/resource/policy/create', query: {resourceId: resource.resourceId}})
    },
    handleEdit(resource) {
      this.$router.push({path: '/resource/detail/edit', query: {resourceId: resource.resourceId}})
    }
  }
}
