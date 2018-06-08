<template>
  <section class="presentable-detail-wrapper">
    <resource-intro-info class="res-intro-info" :resource="presentableData.resourceInfo">
      <div class="presentable-auth-intro" @click="gotoSchemeDetailHandler">
        <i class="dot"></i> 授权方案A/授权策略1 <i class="el-icon-edit"></i>
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
    margin-left: 29px;
    border: none;
    background-color: transparent;
    padding: 0;
    height: 25px;
    line-height: 25px;
  }
</style>
