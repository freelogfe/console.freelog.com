import LazyListView from '@/components/LazyListView/index.vue'
import { loadAuthSchemes } from '@/data/scheme/loader'
import ListItem from './resource.vue'

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
        const resources = data.dataList
        if (resources && resources.length) {
          data.canLoadMore = !(resources.length < data.pageSize)
          const resourcesMap = {}
          const rids = resources.map((r) => {
            resourcesMap[r.resourceId] = r
            return r.resourceId
          })

          return loadAuthSchemes({ resourceIds: rids }).then((schemes) => {
            schemes.forEach((scheme) => {
              const rid = scheme.resourceId
              resourcesMap[rid].schemes = resourcesMap[rid].schemes || []
              resourcesMap[rid].schemes.push(scheme)
            })
            data.dataList = Object.values(resourcesMap)
            return data
          })
        }

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
      return this.$services.allResources.get(param || {}).then(res => res.getData())
    }
  }
}
