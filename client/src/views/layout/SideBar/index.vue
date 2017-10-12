<template>
  <div :class="['sidebar', sidebar.openSidebar?'': 'collapse']">
    <fl-nav-menu :nav-list="navList" :should-show-title="sidebar.openSidebar" :route-path="'/'+routeType+'/'">
    </fl-nav-menu>
  </div>
</template>

<script>
  import SideBar from './index'
  export default SideBar
</script>

<style scoped lang="less">
@import "index.less";
</style>
