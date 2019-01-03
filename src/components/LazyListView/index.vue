<template>
  <div class="fl-lazy-list-view" ref="listView">
    <ul v-if="previewList.length" :style="{
      paddingTop: lineTopHeight +'px',
      paddingBottom: lineBottomHeight +'px'
    }">
      <li :class="[itemClass]"
          v-for="(item, index) in previewList"
          :key="index"
          class="show-up"
          :style="{height: height + 'px'}">
        <slot :data="item"></slot>
      </li>
      <slot name="append"></slot>
    </ul>
    <slot name="empty" v-if="!isLoading && previewList.length === 0">
      <div style="font-size: 20px; text-align: center;">暂无查询结果</div>
    </slot>
    <slot name="loading">
      <div class="load-more-gif" ref="loading"
           element-loading-text="拼命加载中"
           element-loading-background="rgba(0,0,0,0)"
           v-loading="isLoading > 0"></div>
    </slot>
  </div>
</template>

<script>
import LazyListView from './index'

export default LazyListView
</script>

<style lang="less" scoped>
  @import "index.less";
</style>

