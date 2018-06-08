import CONFIG from '@/config/index'
import PresentableDetail from '../presentable/detail/index.vue'

const STATUS_TIPS = CONFIG.PRESENTABLE_STATUS_TIPS
export default {
  name: 'presentables',
  data() {
    return {
      query: '',
      presentableList: [],
      currentPresentable: {
        index: 0,
        detail: {}
      },
    }
  },
  components: {
    PresentableDetail
  },

  mounted() {
    if (this.$route.params.nodeId) {
      this.loadPresentables({nodeId: this.$route.params.nodeId})
        .then((list) => {
          this.presentableList = list
          if (list.length) {
            this.currentPresentable.detail = this.presentableList[0]
          }
          console.log(list)
        })
    } else {
      this.$message.error('缺失节点ID参数');
    }
  },
  methods: {
    queryHandler() {
      this.$message.warning('待开发')
    },
    formatHandler(list) {
      list.forEach((item) => {
        item._statusInfo = STATUS_TIPS[item.status]
      })
      return list
    },
    loadPresentables(param) {
      return this.$services.presentables.get({params: param}).then((res) => {
        return res.getData()
      }).catch(this.$error.showErrorMessage)
    },
    changePresentableHandler(presentable, index) {
      this.currentPresentable.index = index
      this.currentPresentable.detail = presentable
    }
  }
}
