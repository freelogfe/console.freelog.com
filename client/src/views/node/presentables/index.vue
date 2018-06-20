<template>
  <section class="presentables-wrapper">
    <div class="presentable-list-container">
      <h4><i class="el-icon-question"></i>节点资源</h4>
      <ul class="presentable-list">
        <li class="presentable-item"
            :class="[presentable.isReady?'active-status-2':'active-status-0',
            {active: currentPresentable.index===index, 'is-presentable-online':presentable.isOnlineChecked}]"
            @click="changePresentableHandler(presentable, index)"
            v-for="(presentable, index) in presentableList">
          <i class="dot"></i>
          <freelog-switch class="node-res-status-switch"
                          v-model="presentable.isOnlineChecked"
                          @change="changePresentableOnlineHandler(presentable)"
                          active-text="上线"
                          inactive-text="下线"></freelog-switch>
          <span class="p-title">{{presentable.presentableName}}</span>
        </li>
        <li class="presentable-item add-presentable-btn"><i class="el-icon-plus"></i>添加节点资源</li>
      </ul>
    </div>
    <div class="presentable-detail-container" v-show="currentPresentable.detail.presentableId">
      <component class="presentable-detail-content" is="presentable-detail" :detail="currentPresentable.detail"></component>
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
