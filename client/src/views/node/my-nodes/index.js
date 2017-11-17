import TableView from '@/components/TableView/index.vue'
import {mapGetters} from 'vuex'

export default {
  name: 'my-nodes',
  data() {
    return {
      resourceList: [],
      NODE_STATUS: ['正常','未审核','冻结']
    }
  },
  components: {
    TableView
  },
  computed: mapGetters({
    session: 'session'
  }),
  mounted() {
  },
  methods: {
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
    handleEdit(nodeDetail) {
      this.$router.push({path: '/node/detail', query: {nodeId: nodeDetail.nodeId}})
    },
    gotoNodeHandler(nodeDetail) {
      this.$router.push({path: `/node/${nodeDetail.nodeId}`})
    }
  }
}
