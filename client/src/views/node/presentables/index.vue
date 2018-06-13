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
          <!--<el-switch-->
          <!--class="node-res-status-switch"-->
          <!--v-model="presentable.isOnlineChecked"-->
          <!--@change="changePresentableOnlineHandler(presentable)"-->
          <!--active-text="上线"-->
          <!--inactive-text="下线"-->
          <!--active-color="#13ce66"-->
          <!--inactive-color="#E6E6E6">-->
          <!--</el-switch>-->
          <span class="p-title">{{presentable.presentableName}}</span>
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
