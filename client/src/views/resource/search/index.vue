<template>
  <section class="search-resource-wrap">
    <div class="search-input-area">
      <el-input v-model="searchInput"
                class="search-resource-input"
                clearable
                @clear="clearSearchInputHandler"
                @keyup.native.enter="searchHandler"
                placeholder="Search or ID"></el-input>
    </div>

    <div class="search-resource-bd">
      <el-tabs v-model="activeName">
        <el-tab-pane label="收藏资源" name="favor">
          <lazy-list-view :list="favorResources" class="search-resource-list" :height="90" :fetch="fetchData">
            <template slot-scope="scope">
              <el-button class="add-resource-btn" @click="addResourceHandler(scope.data)">添加</el-button>
              <resource-item :resource="scope.data" type="search" style="margin-right: 80px;"></resource-item>
            </template>
          </lazy-list-view>
        </el-tab-pane>
        <el-tab-pane label="搜索资源" name="search">
          <lazy-list-view :list="searchResources" class="search-resource-list" :height="90" :fetch="searchDataHandler">
            <template slot-scope="scope">
              <el-button class="add-resource-btn" @click="addResourceHandler(scope.data)">添加</el-button>
              <resource-item :resource="scope.data" type="search" style="margin-right: 80px;"></resource-item>
            </template>
          </lazy-list-view>
        </el-tab-pane>
      </el-tabs>
    </div>
  </section>
</template>

<script>
  import SearchResource from './index'

  export default SearchResource
</script>

<style lang="less" scoped>
  @import "index.less";
</style>

<style lang="less">
  @import "reset-el.less";
</style>
