export default {
  name: 'auth-node-list',
  data() {
    return {
      data: {},
      list: []
    }
  },
  props: {
    isShow: Boolean,
    refresh: Function
  },
  mounted() {
    this.init()
  },
  watch: {
    isShow() {
      if (this.isShow) {
        this.init()
        // this.refresh((item) => {
        //   if (item && item.authSchemeId) {
        //     this.list.push(item)
        //   }
        // })
      }
    }
  },
  methods: {
    editAuthNode(data) {
      this.$emit('openTab', {
        name: 'editAuthNode',
        data: data
      })
    },
    init() {
      this.loader().then((data) => {
        this.list = data
      }).catch(this.$error.showErrorMessage)
    },
    loader() {
      return this.$services.authSchemes.get({
        params: {
          resourceIds: this.$route.query.resourceId
        }
      }).then((res) => {
        return res.getData()
      })
    }
  }
}
