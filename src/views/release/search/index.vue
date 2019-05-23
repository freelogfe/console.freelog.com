<template>
  <div class="releases-search-wrapper">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('search.myRelease')" name="my-release">
        <lazy-list-view :list="myReleases" class="search-release-list" :height="60" :fetch="fetchData">
          <template slot-scope="scope">
            <release-item :releases="scope.data" type="search" @add="addToReleaseHandler"></release-item>
          </template>
          <div class="no-release-items" slot="empty">{{$t('search.noFavorReleases')}}</div>
        </lazy-list-view>
      </el-tab-pane>
      <el-tab-pane :label="$t('search.favorTitle')" name="favor">
        <lazy-list-view :list="favorReleases" class="search-release-list" :height="60" :fetch="fetchData">
          <template slot-scope="scope">
            <release-item :release="scope.data" type="search" @add="addToReleaseHandler"></release-item>
          </template>
          <div class="no-release-items" slot="empty">{{$t('search.noFavorReleases')}}</div>
        </lazy-list-view>
      </el-tab-pane>
      <el-tab-pane :label="$t('search.searchTitle')" name="search">
        <div class="search-input-area">
          <el-input v-model="searchInput"
                    class="search-release-input"
                    clearable
                    ref="searchInputRef"
                    @clear="clearSearchInputHandler"
                    @keyup.native.enter="searchHandler"
                    :placeholder="$t('search.placeholder')"></el-input>
        </div>
        <lazy-list-view :list="searchReleases"
                        ref="searchView"
                        class="search-release-list"
                        :height="60" :fetch="searchDataHandler">
          <template slot-scope="scope">
            <release-item :release="scope.data" type="search" @add="addToReleaseHandler"></release-item>
          </template>
        </lazy-list-view>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import LazyListView from '@/components/LazyListView/index.vue'
  import ReleaseItem from './release-item.vue'
  export default {
    name: 'releases-search',
    components: { LazyListView, ReleaseItem },
    props: {
      type: {
        type: String,
        default: 'release'
      }
    },
    data() {
      return {
        activeName: 'search',
        searchInput: '',
        myReleases: [],
        favorReleases: [],
        searchReleases: [],
      }
    },
    mounted() {
      this.$refs.searchInputRef.focus()
      this.loader = this.getFavorReleasesLoader()
    },
    methods: {
      addToReleaseHandler(release) {
        this.$emit('add', release)
      },
      clearSearchInputHandler() {
        // this.searchReleases = []
      },
      getFavorReleasesLoader() {
        return this.createReleaseLoader(param => this.$services.collections.get(param || {}).then(res => res.getData()))
      },
      createReleaseLoader(loader) {
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
      fetchData(page) {
        const pageSize = 10
        if (!this.loader) {
          return Promise.resolve({
            canLoadMore: false,
            dataList: []
          })
        }
        return this.loader({ page }).then((data) => {
          data.dataList = data.dataList.filter(r => r.policies.length > 0)
          this.favorReleases = this.favorReleases.concat(data.dataList)
          if (data.dataList.length < pageSize) {
            data.canLoadMore = false
          }
          return data
        })
      },
      searchDataHandler(page) {
        const pageSize = 10

        if (!this.searchInput) {
          return Promise.resolve({ canLoadMore: false })
        }

        return this.$services.ReleaseService.get({
          params: Object.assign({
            keywords: encodeURIComponent(this.searchInput),
            page,
            pageSize
          }, this.searchScope)
        }).then((res) => {
          const data = res.getData() || {}
          if (res.data.errcode === 0) {
            data.dataList = data.dataList.filter(r => r.policies.length > 0)
            this.searchReleases = this.searchReleases.concat(data.dataList)
            if (data.dataList.length < pageSize) {
              data.canLoadMore = false
            }
          } else {
            data.canLoadMore = false
          }
          return data
        })
      },
      searchHandler() {
        this.activeName = 'search'
        this.searchReleases = []
        this.$refs.searchView.refresh()
      }
    }
  }
</script>


<style lang="less" type="text/less">
  .no-release-items {
    font-size: 20px; text-align: center;
  }

  .releases-search-wrapper {
    .search-input-area {
      margin: 20px 0;
    }
    .el-tab-pane {
      width: 550px; margin: auto;
    }
  }

</style>
