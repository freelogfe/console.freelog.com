import { NodeCreationRule } from '@/views/node/create/index'
import { NODE_STATUS } from '@/config/node'
import { onloadNodeDetail } from '@/data/node/loader'
import ClipBoard from '@/components/clipboard/index.vue'
import { mapGetters } from 'vuex'
import NodeContracts from '../contract/list/index.vue'
import NodePresentables from '../presentables/index.vue'
import NodePageBuilds from '../page-build/list/index.vue'
import NodePreview from '../preview/index.vue'


export default {
  name: 'node-detail',
  data() {
    const paths = this.$route.path.split('/')
    return {
      detail: {},
      rules: {
        nodeName: NodeCreationRule.nodeName
      },
      currentTab: paths[paths.length - 1],
      domainSuffix: /\.testfreelog\.com$/.test(window.location.host) ? '.testfreelog.com' : '.freelog.com',
      NAV_TABS: [
        { name: 'pagebuilds', title: '页面样式' },
        { name: 'presentables', title: '节点资源授权管理' },
        { name: 'contracts', title: '合约执行管理' },
        { name: 'preview', title: '预览' }
      ]
    }
  },
  components: {
    ClipBoard,
    NodeContracts,
    NodePresentables,
    NodePageBuilds,
    NodePreview
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
    ...mapGetters({
      nodes: 'nodes'
    }),
    key() {
      return `node-detail-${this.$route.path}`
    }
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
    },
    updateNodeDetail(formName) {
      const self = this
      self.$refs[formName].validate((valid) => {
        if (valid) {
          self.$services.nodes.patch(self.detail.nodeId, self.detail)
            .then((res) => {
              if (res.data.errcode === 0) {
                self.$message.success('节点修改成功')
              } else {
                self.$message.error(res.data.msg)
              }
            }).catch((err) => {
              self.$message.error(err.response.errorMsg || err)
            })
        } else {
          console.error('error submit!!')
        }
      })
    },
    backToList() {
      this.$router.push({
        path: '/node/list',
      })
    },
    changePanelHandler(content) {
      this.currentTab = content
      this.$router.push(`/node/${this.$route.params.nodeId}/${content}`)
    }
  }
}
