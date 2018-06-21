<template>
  <section class="pb-list-container">
    <header class="nav-title">节点样式</header>
    <ul class="pb-list">
      <li class="pb-item" v-for="item in pagebuildList" :class="{selected: item.index === currentIndex}">
        <div class="pb-item-wrap">
          <div class="pb-thumbnail-wrap" @click="changePageBuildHandler(item)">
            <img :src="item.resourceDetail._previewImage" alt="">
          </div>
          <div class="pb-item-content"  @click="gotoResourceDetailHandler(item)">
            <h4 class="pb-title">{{item.presentableName}}</h4>
            <div class="pb-desc">
              <!--<i class="el-icon-circle-check-outline pb-select-btn" @click="changePageBuildHandler(item)"></i>-->
              <p v-html="item.resourceDetail.intro+item.resourceDetail.intro+item.resourceDetail.intro+item.resourceDetail.intro+item.resourceDetail.intro+item.resourceDetail.intro+item.resourceDetail.intro+item.resourceDetail.intro" @click="gotoResourceDetailHandler(item)"></p>
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
  </section>
</template>

<script>
  import PageBuildList from './index'

  export default PageBuildList
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
