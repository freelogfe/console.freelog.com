export default {
  name: 'fl-sidebar',
  data() {
    return {
      isMini: true,
      nodes: [],
      isShowSidebar: true
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
    },
    showMiniSidebar() {
      this.isMini= true
    },

  },
  watch: {
    '$route.fullPath'() {
      const { meta: { hideSidebar } } = this.$route
      this.isShowSidebar = !hideSidebar
    }
  },
  created() {

  },
  mounted() {
    const { meta: { hideSidebar } } = this.$route
    this.isShowSidebar = !hideSidebar
    this.loadNodeList()
    document.addEventListener('click', this.showMiniSidebar)
  }
}
