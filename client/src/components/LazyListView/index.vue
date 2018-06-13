<template>
  <div class="fl-lazy-list-view" ref="listView">
    <ul :style="{
      paddingTop: lineTopHeight +'px',
      paddingBottom: lineBottomHeight +'px'
    }">
      <li v-for="(item, index) in previewList" :key="index" :style="{height: height + 'px'}">
        <slot :data="item"></slot>
      </li>
    </ul>

    <slot name="loading">
      <div class="load-more-gif" ref="loading">loading...</div>
    </slot>
  </div>
</template>

<script>
  import LazyListView from './index.js'

  export default LazyListView
</script>

<style lang="less" scoped>
@import "index.less";
</style>

