import ResourceItem from '../list-item/index'
import ResourceList from '../list/list.vue'
import LazyListView from '@/components/LazyListView/index.vue'

export default {
  name: 'search-resource',
  data() {
    return {
      searchInput: '',
      activeName: 'favor',
      favorResources: [],
      searchResources: []
    }
  },
  components: {
    ResourceItem,
    ResourceList,
    LazyListView
  },
  props: {},

  watch: {},
  mounted() {
    this.loader = this.getFavorResourcesLoader()
  },
  methods: {
    addResourceHandler(resource) {
      this.$emit('add', resource)
    },
    clearSearchInputHandler() {
      // this.searchResources = []
    },
    getFavorResourcesLoader() {
      return this.createResourceLoader((param) => {
        return this.$services.collections.get(param || {}).then((res) => {
          return res.getData()
        })
      });
    },
    createResourceLoader(loader) {
      return (param) => {
        param = param || {
          pageSize: 10,
          page: 1
        };
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
    fetchData(page) {
      var pageSize = 10;
      if (!this.loader) {
        return Promise.resolve({
          canLoadMore: false,
          dataList: []
        })
      }
      return this.loader({page: page}).then((data) => {
        this.favorResources = this.favorResources.concat(data.dataList)
        data.dataList = data.dataList.concat(data.dataList).concat(data.dataList)
        if (data.dataList.length < pageSize) {
          data.canLoadMore = false
        }
        return data
      });
    },
    searchDataHandler(page) {
      var pageSize = 10;

      if (!this.searchInput) {
        return Promise.resolve({canLoadMore: false})
      }

      return this.$services.g_Resources.get({
        params: {
          keyWords: encodeURIComponent(this.searchInput)
        }
      }).then(res => {
        var data = res.getData() || {}
        console.log(res.data)
        if (res.errcode === 0) {
          // this.searchResources = res.data.dataList
          this.searchResources = this.searchResources.concat(data.dataList)
          if (data.dataList.length < pageSize) {
            data.canLoadMore = false
          }
        } else {
          data.canLoadMore = false
        }
        return data
      });
    },
    searchHandler() {
      this.activeName = 'search';
      this.searchResources = []
    }
  }
}
