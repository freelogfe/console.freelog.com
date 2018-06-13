import CONFIG from '@/config/index'
import PresentableDetail from '../presentable/detail/index.vue'
import FreelogSwitch  from '@/components/Switch/index.vue'

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
    PresentableDetail,
    FreelogSwitch
  },

  mounted() {
    if (this.$route.params.nodeId) {
      this.loadPresentables({nodeId: this.$route.params.nodeId})
        .then(this.formatHandler.bind(this))
        .then((list) => {
          this.presentableList = list
          if (list.length) {
            this.currentPresentable.detail = this.presentableList[0]
          }
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
        item.isOnlineChecked = !!item.isOnline
        item._statusInfo = STATUS_TIPS[item.status]
        item.isReady = (item.status & 3) === 3
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
    },
    changePresentableOnlineHandler(presentable) {
      if (presentable.isOnlineChecked) {
        presentable.isOnline = 1
      } else {
        presentable.isOnline = 0
      }
      this.$services.presentables.put(presentable.presentableId, {
        isOnline: presentable.isOnline
      }).then((res) => {
        if (res.data.errcode === 0) {
          // this.$message.success('上线成功')
        } else {
          presentable.isOnline = 0
          presentable.isOnlineChecked = false
          this.$message.error(res.data.msg || '更新失败')
        }
      }).catch(err => {
        presentable.isOnline = 0
        presentable.isOnlineChecked = false
        this.$error.showErrorMessage(err)
      })
    }
  }
}
