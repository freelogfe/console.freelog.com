<template>
  <div class="resource-items">
    <lazy-list-view :list="resources" :height="90" :fetch="fetchData">
      <template slot-scope="scope">
        <resource-item :resource="scope.data" :type="type" :navTo="gotoEditHandler"></resource-item>
      </template>
      <div slot="empty" class="empty-resource-tip">
        {{type==='self'?'没有自制资源' :'未收藏资源'}}
      </div>
    </lazy-list-view>
  </div>
</template>

<script>
import LazyListView from '@/components/LazyListView/index.vue'
import ResourceItem from '../list-item/index.vue'

export default {
  name: 'resource-items',

  data() {
    return {
      search: '',
      resources: [],
      loader: null
    }
  },

  props: {
    type: {
      type: String,
      default() {
        return 'all'
      }
    },
    query: String
  },

  watch: {
    type() {
      this.initView()
    },
    query() {
      this.initView()
    }
  },
  components: { ResourceItem, LazyListView },
  mounted() {
    this.initView()
  },

  methods: {
    gotoEditHandler(resource) {
      if (this.type === 'all') {
        this.$router.push({ path: `/resource/edit/${resource.resourceId}` })
      } else {
        this.$router.push({ path: `/resource/detail/${resource.resourceId}` })
      }
    },
    initView() {
      switch (this.type) {
        case 'favor':
          this.loader = this.getFavorResourcesLoader()
          break
        case 'self':
          this.loader = this.getSelfResourcesLoader()
          break
        case 'all':
        default:
          break
      }
    },
    fetchData(page) {
      const pageSize = 10

      if (!this.loader) {
        return Promise.resolve({
          canLoadMore: false,
          dataList: []
        })
      }
      return this.loader({ page }).then((data) => {
        this.resources = this.resources.concat(data.dataList)
        if (data.dataList.length < pageSize) {
          data.canLoadMore = false
        }
        return data
      })
    },
    getSelfResourcesLoader() {
      return this.createResourceLoader(param => this.$services.resource.get(param || {}).then(res => res.getData()))
    },
    getFavorResourcesLoader() {
      return this.createResourceLoader(param => this.$services.collections.get(param || {}).then(res => res.getData()))
    },
    createResourceLoader(loader) {
      return (param) => {
        param = param || {
          pageSize: 10,
          page: 1
        }
        if (typeof param === 'object') {
          param = {
            params: Object.assign({
              pageSize: 10,
              page: 1
            }, param)
          }
        }
        return loader(param)
      }
    },
    getAllResourcesLoader(param) {
      param = {
        pageSize: 1e2
      }
      if (typeof param === 'object') {
        param = {
          params: param
        }
      }
      return this.$services.resource.get(param || {}).then(res => res.getData())
    }
  }
}
</script>

<style lang="less" scoped>
  .empty-resource-tip {
    font-size: 20px;
    color: #999;
  }
</style>
