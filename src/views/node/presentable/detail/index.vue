<template>
  <section class="presentable-detail-wrapper">
    <presentable-detail-header :resource="resourceInfo"
                               :presentable="presentableInfo"
                               @save="savePresentableHandler"></presentable-detail-header>

    <div class="presentable-content-panels">
      <el-tabs v-model="activeTabName" @tab-click="handleClick" :stretch="true">
        <el-tab-pane :name="TAB_NAMES.policy">
          <span slot="label" class="panel-tab-name">策略管理</span>
          <div class="panel-content policy-manager-wrap">
            <policy-list :list="presentableInfo.policy"></policy-list>
          </div>
        </el-tab-pane>
        <el-tab-pane :name="TAB_NAMES.contract" :lazy="true">
          <span slot="label" class="panel-tab-name">合约管理</span>
          <div class="panel-content contract-manager-wrap">
            <lazy-component>
              <ContractManager :contracts="presentableInfo.contracts"
                               v-if="presentableInfo.contracts&&presentableInfo.contracts.length"></ContractManager>
              <div class="empty-contract-tip" v-else>
                未创建合约
                <router-link :to="$route.path + '?tab=schema'">
                  <el-button type="text">去创建合约</el-button>
                </router-link>
              </div>
            </lazy-component>
          </div>
        </el-tab-pane>
        <el-tab-pane :name="TAB_NAMES.schema" :lazy="true">
          <span slot="label" class="panel-tab-name">授权签约管理</span>
          <div class="panel-content">
            <lazy-component>
              <authorization-scheme-manage
                      v-if="resourceInfo.resourceId"
                      :contracts.sync="presentableInfo.contracts"
                      :resourceInfo="resourceInfo"
                      :presentableInfo="presentableInfo"
              ></authorization-scheme-manage>
            </lazy-component>
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
    .el-tabs__header {
      margin-bottom: 0;
    }

    .el-tabs__nav-scroll {
      padding: 0 168px;
    }

    .el-tabs__content {
      overflow: inherit;
    }
  }
</style>
