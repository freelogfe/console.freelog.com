import { Message } from 'element-ui'
export default {
  name: 'fl-sidebar',
  data() {
    return {
      isMini: true,
      nodes: [],
    }
  },
  computed: {
    targetHostname() {
      return window.location.hostname.replace(/^console/, 'www')
    },
  },
  methods: {
    loadNodeList() {
      return this.$axios.get(`/v1/nodes?ownerUserId=50003&pageSize=100`)
        .then(res => res.getData())
        .then(res => {
          this.nodes = res.dataList
        })
    }
  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.loadNodeList()
  }
}
