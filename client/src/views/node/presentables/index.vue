<template>
  <section class="presentables-wrapper">
    <div class="presentable-list-container">
      <h4><i class="el-icon-question"></i>节点资源</h4>
      <ul class="presentable-list">
        <li class="presentable-item" :class="{active: currentPresentable.index===index}"
            @click="changePresentableHandler(presentable, index)"
            v-for="(presentable, index) in presentableList">
          <i class="dot"></i><span class="p-title">{{presentable.presentableName}}</span>
        </li>
      </ul>
    </div>
    <div class="presentable-detail-container">
      <component is="presentable-detail" :detail="currentPresentable.detail"></component>
    </div>
  </section>
</template>

<script>
  import Presentables from './index'

  export default Presentables
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
