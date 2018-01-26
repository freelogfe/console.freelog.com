import TableView from '@/components/TableView/index.vue'
import ClipBoard from '@/components/clipboard/index.vue'

import {mapGetters} from 'vuex'

export default {
  name: 'node-login',
  data() {
    return {
      resourceList: [],
      NODE_STATUS: [{
        text: '正常',
        type: 'success'
      }, {
        text: '未审核',
        type: 'warning'
      }, {
        text: '冻结',
        type: 'danger'
      }]
    }
  },
  components: {
    TableView,
    ClipBoard
  },
  computed: mapGetters({
    session: 'session',
    nodeSession: 'nodeSession'
  }),
  mounted() {
    if (this.nodeSession.nodeName) {
      this.gotoNodeHandler(this.nodeSession)
    }
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
    gotoNodeHandler(nodeDetail) {
      var redirect = this.$route.query.redirect
      var path

      if (redirect) {
        path = redirect.replace(':nodeId', nodeDetail.nodeId)
      } else {
        path = `/node/${nodeDetail.nodeId}`
      }

      this.$store.dispatch('changeNode', nodeDetail)
        .then(() => {
          this.$router.push({path: path})
        })
    }
  }
}
