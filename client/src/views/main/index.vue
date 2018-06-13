<template>
  <section class="index-main-container">
    <!--<el-input placeholder="请输入搜索内容" v-model="query" class="query-input" @keyup.enter.native="queryHandler"-->
              <!--@keydown.native="autoQueryHandler">-->
      <!--<el-button slot="append" icon="el-icon-search" type="primary" @click="queryHandler"></el-button>-->
    <!--</el-input>-->

    <div class="main-content-wrap">
      <lazy-list-view  class="resource-list" :list="resourceList" :height="90" :fetch="fetchData">
        <template slot-scope="scope">
          <!--<resource-item class="res-item" :resource="scope.data"></resource-item>-->
          <list-item class="res-item" :resource="scope.data"></list-item>
        </template>
      </lazy-list-view>
      <!---->
      <!--<ul class="resource-list">-->
        <!--<li class="res-item" v-for="resource in resourceList">-->
          <!--<list-item :resource="resource"></list-item>-->
        <!--</li>-->
      <!--</ul>-->
    </div>
  </section>
</template>

<script>
  import IndexMainView from './index'

  export default IndexMainView
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
