import ListItem from './resource.vue'
import LazyListView from '@/components/LazyListView/index.vue'

export default {
  name: 'index-main-view',
  data() {
    return {
      resourceList: [],
      query: ''
    }
  },
  components: {
    ListItem,
    LazyListView
  },

  watch: {
    '$route.query': function () {
      this.query = this.$route.query.q || ''
      this.queryHandler()
    }
  },

  mounted() {
    const qs = this.$route.query
    if (qs.q) {
      this.query = qs.q
    }
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
    fetchData(page) {
      const query = {
        page
      }
      if (this.query) {
        query.keyWords = this.query
      }
      return this.loader(query).then((data) => {
        data.canLoadMore = !(data.dataList.length < data.pageSize)
        return data
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
      return this.$services.g_Resources.get(param || {}).then(res => res.getData())
    }
  }
}
