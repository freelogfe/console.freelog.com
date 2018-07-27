import {NodeCreationRule} from '@/views/node/create/index'
import NodeContracts from '../contract/list/index.vue'
import NodePresentables from '../presentables/index.vue'
import NodePageBuilds from '../page-build/list/index.vue'
import NodePreview from '../preview/index.vue'
import {NODE_STATUS} from '@/config/node'
import nodeLoader from '@/data/node/loader'
import ClipBoard from '@/components/clipboard/index.vue'
import {mapGetters} from 'vuex'


export default {
  name: 'node-detail',
  data() {
    return {
      detail: {},
      rules: {
        nodeName: NodeCreationRule.nodeName
      },
      nav: {
        content: 'node-presentables'
      },
      domainSuffix: /\.testfreelog\.com$/.test(location.host) ? '.testfreelog.com' : '.freelog.com',
      NAV_TABS: [
        {name: 'node-page-builds', title: '页面样式'},
        {name: 'node-presentables', title: '节点资源授权管理'},
        {name: 'node-contracts', title: '合约执行管理'},
        {name: 'node-preview', title: '预览'}
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
    next(vm => {
      vm.$store.dispatch('loadNodes')
        .then(nodes => {
          var isValid = nodes.some(node => {
            return node.nodeId == vm.$route.params.nodeId;
          });

          if (!isValid) {
            vm.$router.push('/')
          }
        })
    })
  },
  computed: {
    ...mapGetters({
      nodes: 'nodes'
    })
  },
  watch: {
    $route() {
      this.init(this.$route.params.nodeId)
    }
  },
  mounted() {
    var nodeId = this.$route.params.nodeId
    if (nodeId) {
      this.init(nodeId)
    } else {
      this.$message.error('缺少参数nodeId');
    }
  },
  methods: {
    init(nodeId) {
      var query = this.$route.query;
      if (query.tab && (this.NAV_TABS.some(tab => tab.name === query.tab))) {
        this.nav.content = query.tab
      }
      this.load(nodeId)
        .then((detail) => {
          detail.statusInfo = NODE_STATUS[detail.status]
          this.detail = detail
        })
    },
    load(param) {
      return nodeLoader.loadDetail(param || {}).catch(this.$error.showErrorMessage)
    },
    copyDoneHandler() {
      this.$message.success('已复制节点地址')
    },
    resolveDomain(node) {
      return `${location.protocol}//${node.nodeDomain}${this.domainSuffix}`
    },
    updateNodeDetail(formName) {
      const self = this;
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
          console.error('error submit!!');
          return false;
        }
      });
    },
    backToList() {
      this.$router.push({
        path: `/node/list`,
      })
    },
    changePanelHandler(content) {
      this.nav.content = content
    }
  }
}
