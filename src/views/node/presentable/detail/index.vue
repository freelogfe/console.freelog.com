<template>
  <section class="presentable-detail-wrapper">
    <resource-intro-info class="res-intro-info" :resource="presentableData.resourceInfo">
      <div class="presentable-auth-intro"
           :class="{'active-status-2':presentableData.scheme}"
           @click="gotoSchemeDetailHandler">
        <i class="dot"></i>
        <span v-if="presentableData.scheme && presentableData.scheme.selectedPolicy">
          {{presentableData.scheme.authSchemeName}}/{{presentableData.scheme.selectedPolicy.policyName}}
        </span>
        <span v-else>未选择授权方案及授权策略</span>
        <i class="el-icon-edit"></i>
      </div>
    </resource-intro-info>

    <presentable-editor :data="presentableData" @onSaveEnd="savePresentableEnd"></presentable-editor>
  </section>
</template>

<script>
  import PresentableDetail from './index'

  export default PresentableDetail
</script>

<style lang="less" scoped>
  @import "index.less";
</style>

<style>
  .presentable-detail-wrapper .presentable-input-info .presentable-name-input > input {
    border: none;
    background-color: transparent;
    padding: 0;
    height: 25px;
    line-height: 25px;
  }
</style>
