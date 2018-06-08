import ListItem from '@/views/resource/list-item/index.vue'

export default {
  name: 'index-main-view',
  data() {
    return {
      resourceList: [],
      query: ''
    }
  },
  components: {
    ListItem
  },

  mounted() {
    this.loader().then(data => {
      this.resourceList = data.dataList
    })
  },
  methods: {
    autoQueryHandler() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.queryHandler()
      }, 8e2)
    },
    queryHandler() {
      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.$refs.resourceList.$emit('reload', {
        keyWords: encodeURIComponent(this.query)
      })
    },
    loader(param) {
      if (typeof param === 'object') {
        if (param.keyWords) {
          this.query = param.keyWords
        }
        param = {
          params: param
        }
      }

      return this.$services.g_Resources.get(param || {}).then(res => {
        return res.getData()
      })
    }
  }
}
