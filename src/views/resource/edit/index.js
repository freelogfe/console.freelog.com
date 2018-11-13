/*
policy更新后，后续签订的policy按新的来，已签约过的按更新前的
 */
import {mapGetters} from 'vuex'
import ResourceInputs from '../input/index.vue'

import ResourceLoader from '@/data/resource/loader'

export default {
  name: 'resource-detail-edit',
  data() {
    return {
      isDev: process.env.NODE_ENV === 'development',
      resourceDetail: {}
    }
  },
  computed: {
    ...mapGetters({
      session: 'session'
    }),
    actionUrl() {
      const origin = location.origin.replace('console', 'qi')
      return origin + '/v1/resources/updateResourceContext/' + this.resourceDetail.resourceId
    }
  },
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
        }).catch((err)=>{
          this.$nextTick(()=>{
            var $error = this.$el.querySelector('.el-form-item__error')
            if ($error) {
              $error.parentElement.scrollIntoView()
              window.scrollBy(0, -80) //填补fixed占位的高度
            } else {
              this.$error.showErrorMessage(err)
            }
          })
        })
      } else {
        callback(detail)
      }
    },
    updateResourceHandler() {
      this.executeNext((detail) => {
        this.$message.success('更新成功')
      })
    },
    gotoResourceSchemeDetailHandler() {
      this.$router.push(`/resource/edit/${this.$route.params.resourceId}/auth_schemes`)
    }
  }
}
