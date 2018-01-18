import ResourceDetailInfo from '@/components/detail-info/resource.vue'
import {RESOURCE_TYPES} from '@/config/resource'

export default {
  name: 'resource-detail',
  data() {
    return {
      detail: {},
    }
  },

  components: {ResourceDetailInfo},

  mounted() {
    if (this.$route.query.resourceId) {
      this.load(this.$route.query.resourceId)
        .then(this.format.bind(this))
        .then((detail) => {
          this.detail = detail
        })
    } else {
      this.$message.error('缺少参数resourceId');
    }
  },
  methods: {
    format(detail) {
      if (detail.systemMeta.widgets) {
        detail.systemMeta.widgets.forEach((widget) => {
          widget.detailUrl = `/node/${this.$route.params.nodeId}/resource/detail?resourceId=${widget.resourceId}`
        })
      }

      return detail
    },
    load(param) {
      return this.$services.resource.get(param || {})
        .then((res) => {
          var detail = res.getData()
          return detail
        }).catch((err) => {
          this.$message.error(err.response.errorMsg || err)
        })
    },
    bakcToList() {
      this.$router.push({
        path: `/node/${this.$route.params.nodeId}/resources`,
      })
    },
    gotoCreateContract(resource) {
      var query = {
        resourceName: resource.resourceName,
        resourceType: resource.resourceType,
        resourceId: resource.resourceId
      }

      this.$router.push({
        path: `/node/${this.$route.params.nodeId}/presentable/create`,
        query: query
      })
    },
  }
}
