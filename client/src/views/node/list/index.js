import TableView from '@/components/TableView/index.vue'
import ClipBoard from '@/components/clipboard/index.vue'
import {NODE_STATUS} from '@/config/node'
import {mapGetters} from 'vuex'

export default {
  name: 'my-nodes',
  data() {
    return {
      resourceList: [],
      NODE_STATUS: NODE_STATUS
    }
  },
  components: {
    TableView,
    ClipBoard
  },
  computed: mapGetters({
    session: 'session'
  }),
  mounted() {
  },
  methods: {
    resolveDomain(row) {
      var post = /\.test/.test(location.host) ? '.testfreelog.com' : '.freelog.com'

      return `${location.protocol}//${row.nodeDomain}${post}`
    },
    loader() {
      var self = this;
      return () => {
        return this.$services.nodes.get({
          params: {
            ownerUserId: self.session.user.userId
          }
        })
      }
    },
    copyDoneHandler() {
      this.$message.success('已复制节点地址')
    },
    handleEdit(nodeDetail) {
      this.$router.push({path: `/node/detail/${nodeDetail.nodeId}`})
    },
    gotoNodeHandler(nodeDetail) {
      this.$store.dispatch('changeNode', nodeDetail)
        .then(() => {
          this.$router.push({path: `/node/${nodeDetail.nodeId}`})
        })
    }
  }
}
