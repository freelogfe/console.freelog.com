<template>
  <section class="pb-list-container">
    <header class="nav-title">节点样式</header>
    <ul class="pb-list">
      <li class="pb-item" v-for="item in pagebuildList" :class="{selected: item.index === currentIndex}">
        <div class="pb-item-wrap">
          <div class="pb-thumbnail-wrap" @click="changePageBuildHandler(item)">
            <img class="resource-default-preview" :src="item.resourceDetail._previewImage" alt="">
          </div>
          <div class="pb-item-content"  @click="gotoResourceDetailHandler(item)">
            <h4 class="pb-title">{{item.presentableName}}</h4>
            <div class="pb-desc">
              <p v-html="item.resourceDetail.intro" @click="gotoResourceDetailHandler(item)"></p>
            </div>
          </div>
        </div>
      </li>
      <li class="pb-item">
        <div class="add-pb-area" @click="addNewPageBuildHandler">
          <i class="el-icon-plus"></i>
        </div>
      </li>
    </ul>

    <el-dialog
      :visible.sync="showSearchResource"
      width="840px"
      :close-on-click-modal="false"
      top="10vh"
      center>
      <p slot="title" class="dialog-title">添加资源</p>
      <search-resource class="add-resource-input" @add="addResourceHandler" :searchScope="{resourceType:'page_build'}"></search-resource>
    </el-dialog>
  </section>
</template>

<script>
import PageBuildList from './index'

export default PageBuildList
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
