<template>
  <section class="presentable-detail-wrapper">
    <presentable-detail-header :resource="resourceInfo" :presentable="presentableInfo"></presentable-detail-header>
    <div class="presentable-content-panels">
      <el-tabs v-model="activeTabName" @tab-click="handleClick" :stretch="true">
        <el-tab-pane name="policy-manager">
          <span slot="label" class="panel-tab-name">策略管理</span>
          <div class="panel-content policy-manager-wrap">
            <policy-list :list="presentableInfo.policy"></policy-list>
          </div>
        </el-tab-pane>
        <el-tab-pane name="contract-manager" :lazy="true">
          <span slot="label" class="panel-tab-name">合约管理</span>
          <div class="panel-content">
            <lazy-component></lazy-component>
          </div>
        </el-tab-pane>
        <el-tab-pane name="schema-manager" :lazy="true">
          <span slot="label" class="panel-tab-name">授权方案管理</span>
          <div class="panel-content">
            <lazy-component></lazy-component>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </section>
</template>

<script>
import PresentableDetail from './index'

export default PresentableDetail
</script>

<style lang="less" scoped>
  @import "index.less";
</style>

<style lang="less">
  .presentable-detail-wrapper  {
    .el-tabs__nav-scroll {
      padding: 0 168px;
    }
  }
</style>
