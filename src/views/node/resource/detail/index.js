import { mapGetters } from 'vuex'
import ResourceDetailInfo from '@/components/detail-info/resource.vue'
import { RESOURCE_TYPES } from '@/config/resource'

export default {
  name: 'resource-detail',
  data() {
    return {
      detail: {},
    }
  },

  components: { ResourceDetailInfo },
  mounted() {
    const resourceId = this.$route.params.resourceId
    if (resourceId) {
      this.load(resourceId)
        .then(this.format.bind(this))
        .then((detail) => {
          this.detail = detail
        })
    } else {
      this.$message.error('缺少参数resourceId')
    }
  },
  methods: {
    format(detail) {
      if (detail.systemMeta.widgets) {
        detail.systemMeta.widgets.forEach((widget) => {
          widget.detailUrl = `/resources/detail/${widget.resourceId}`
        })
      }

      return detail
    },
    load(param) {
      return this.$services.resource.get(param || {})
        .then((res) => {
          const detail = res.getData()
          return detail
        }).catch(this.$error.showErrorMessage)
    },
    bakcToList() {
      this.$router.push({
        path: '/resources/market',
      })
    },
    gotoCreateContract(resource) {

    },
  }
}
