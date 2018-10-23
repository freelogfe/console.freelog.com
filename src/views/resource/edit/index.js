/*
policy更新后，后续签订的policy按新的来，已签约过的按更新前的
 */
import { mapGetters } from 'vuex'
import ResourceInputs from '../create/resource/index.vue'

import ResourceLoader from '@/data/resource/loader'

export default {
  name: 'resource-detail-edit',
  data() {
    return {
      isDev: process.env.NODE_ENV === 'development',
      resourceDetail: {}
    }
  },
  computed: mapGetters({
    session: 'session'
  }),
  components: {
    ResourceInputs
  },
  mounted() {
    const params = this.$route.params
    if (params.resourceId) {
      ResourceLoader.loadDetail(params.resourceId)
        .then((data) => {
          if (data.userId !== this.session.user.userId) {
            return this.$router.push('/')
          }
          this.resourceDetail = data
        }).catch(this.$error.showErrorMessage)
    }
  },
  methods: {
    executeNext(callback) {
      if (this.$refs.inputArea.nextHandler) {
        this.$refs.inputArea.nextHandler().then((detail) => {
          if (detail) {
            Object.assign(this.resourceDetail, detail)
          }
          callback(detail)
        }).catch(this.$error.showErrorMessage)
      } else {
        callback(detail)
      }
    },
    updateResourceHandler() {
      this.executeNext((detail) => {
        // console.log(detail)
        this.$message.success('更新成功')
      })
    }
  }
}
