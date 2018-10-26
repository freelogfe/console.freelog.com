import ResourceInput from '../input/index.vue'
import ResourceLoader from '@/data/resource/loader'
import { storage } from '@/lib'

export default {
  name: 'resource-creator',
  components: {
    ResourceInput
  },
  data() {
    return {
      resourceDetail: {}
    }
  },
  mounted() {
    const params = this.$route.params
    if (params.resourceId) {
      ResourceLoader.loadDetail(params.resourceId)
        .then((data) => {
          this.resourceDetail = data
        }).catch(this.$error.showErrorMessage)
    }
  },
  methods: {
    executeNext(callback) {
      if (this.$refs.inputArea.nextHandler) {
        this.$refs.inputArea.nextHandler(this.data).then((detail) => {
          if (detail && detail.resourceId) {
            Object.assign(this.resourceDetail, detail)
          }
          callback()
        }).catch(this.$error.showErrorMessage)
      } else {
        callback()
      }
    },
    create2QuitHandler() {
      this.executeNext(() => {
        const detail = this.resourceDetail
        if (this.$route.params.resourceId) {
          this.$message.success('资源更新成功')
        } else {
          this.$message.success('资源创建成功')
        }
        setTimeout(() => {
          this.$router.push(`/resource/detail/${detail.resourceId}`)
        }, 5e2)
      })
    },
    create2AddHandler() {
      const detail = this.resourceDetail
      this.executeNext(() => {
        detail.resourceId && this.$router.push(`/resource/detail/${detail.resourceId}/auth_schemes`)
      })
    },
    cancelHandler(){
      this.$confirm('确定取消创建资源？')
        .then(()=>{
          this.$router.push(`/resource/list`)
        }).catch(()=>{})
    }
  }
}
