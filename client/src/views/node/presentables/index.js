import CONFIG from '@/config/index'
import PresentableDetail from '../presentable/detail/index.vue'
import FreelogSwitch from '@/components/Switch/index.vue'
import SearchResource from '../../resource/search/index.vue'
import {presentable} from "../../../components/policyEditor/defaultPolicyTpls";

const STATUS_TIPS = CONFIG.PRESENTABLE_STATUS_TIPS
export default {
  name: 'presentables',
  data() {
    return {
      showSearchResource: false,
      presentableList: [],
      currentPresentable: {
        index: -1,
        detail: {}
      },
    }
  },
  components: {
    PresentableDetail,
    FreelogSwitch,
    SearchResource
  },
  watch: {
    $route() {
      this.initView(this.$route.params.nodeId)
    }
  },

  mounted() {
    this.initView(this.$route.params.nodeId)
  },
  methods: {
    queryHandler() {
      this.$message.warning('待开发')
    },
    initView(nodeId) {
      if (nodeId) {
        Object.assign(this.currentPresentable, {
          index: -1,
          detail: {}
        })
        this.loadPresentables({nodeId: nodeId})
          .then(this.formatHandler.bind(this))
          .then((list) => {
            this.presentableList = list
          })
      } else {
        this.$message.error('缺失节点ID参数');
      }
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
    },
    showSearchResourceHandler() {
      this.showSearchResource = true
    },
    beforeCloseDialogHandler() {
      this.showSearchResource = false
    },
    addResourceHandler(resource) {
      this.createPresentable({
        nodeId: this.$route.params.nodeId,
        presentableName: resource.resourceName,
        resourceId: resource.resourceId
      }).then(presentable => {
        this.presentableList.push(presentable)
        this.showSearchResource = false
      }).catch(this.$error.showErrorMessage);
    },
    createPresentable(data) {
      return this.$services.presentables.post(data).then(res => {
        if (res.data.errcode !== 0) {
          return Promise.reject(res.data.msg)
        } else {
          return res.getData()
        }
      })
    },
  }
}
