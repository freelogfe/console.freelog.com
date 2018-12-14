import {NODE_STATUS} from '@/config/node'
import {onloadNodeDetail} from '@/data/node/loader'
import ClipBoard from '@/components/clipboard/index.vue'
// import {mapGetters} from 'vuex'
import NodePresentables from '../presentables/index.vue'
// import NodePreview from '../preview/index.vue'

export default {
  name: 'node-detail',
  data() {
    return {
      detail: {},
      domainSuffix: /\.testfreelog\.com$/.test(window.location.host) ? '.testfreelog.com' : '.freelog.com'
    }
  },
  components: {
    ClipBoard,
    NodePresentables,
    // NodePreview
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.dispatch('loadNodes')
        .then((nodes) => {
          const isValid = nodes.some(node => node.nodeId.toString() === vm.$route.params.nodeId)

          if (!isValid) {
            vm.$router.push('/')
          }
        })
    })
  },
  computed: {

  },
  mounted() {
    const nodeId = this.$route.params.nodeId
    if (nodeId) {
      this.init(nodeId)
    } else {
      this.$message.error('缺少参数nodeId')
    }
  },
  methods: {
    init(nodeId) {
      this.load(nodeId)
        .then((detail) => {
          detail.statusInfo = NODE_STATUS[detail.status]
          this.detail = detail
        })
    },
    load(param) {
      return onloadNodeDetail(param || {}).catch(this.$error.showErrorMessage)
    },
    copyDoneHandler() {
      this.$message.success('已复制节点地址')
    },
    resolveDomain(node) {
      return `${window.location.protocol}//${node.nodeDomain}${this.domainSuffix}`
    }
  }
}
