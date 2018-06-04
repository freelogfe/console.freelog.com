<template>
  <section class="pb-list-container">
    <header class="nav-title">节点样式</header>
    <ul class="pb-list">
      <li class="pb-item" v-for="item in pagebuildList" :class="{selected: item.index === currentIndex}">
        <div class="pb-item-wrap" @click="changePageBuildHandler(item)">
          <div class="pb-thumbnail-wrap">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527660657079&di=44f93c3efc9bf6e81a4996ae1e10b886&imgtype=0&src=http%3A%2F%2Fgb.cri.cn%2Fmmsource%2Fimages%2F2014%2F04%2F08%2F90%2F13642159619414055870.jpg" alt="">
          </div>
          <div class="pb-item-content">
            <h4 class="pb-title">页面布局名称</h4>
            <div class="pb-desc">
              <i class="el-icon-circle-check-outline"></i>
              <p>sjdlfksjdlfjsldfkjsjdlfksjdlfjsldfkjsjdlfksjdlfjsldfkjsjdlfksjdlfjsldfkjsjdlfksjdlfjsldfkjsjdlfksjdlfjsldfkj
                sjdlfksjdlfjsldfkjsjdlfksjdlfjsldfkjsjdlfksjdlfjsldfkjsjdlfksjdlfjsldfkjsjdlfksjdlfjsldfkjsjdlfksjdlfjsldfkj
                sjdlfksjdlfjsldfkjsjdlfksjdlfjsldfkjsjdlfksjdlfjsldfkjsjdlfksjdlfjsldfkjsjdlfksjdlfjsldfkjsjdlfksjdlfjsldfkj
                sjdlfksjdlfjsldfkjsjdlfksjdlfjsldfkjsjdlfksjdlfjsldfkjsjdlfksjdlfjsldfkjsjdlfksjdlfjsldfkjsjdlfksjdlfjsldfkj</p>
            </div>
          </div>
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
