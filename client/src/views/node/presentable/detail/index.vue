<template>
  <section class="presentable-detail-wrapper">
    <resource-intro-info class="res-intro-info" :resource="presentableData.resourceInfo">
      <div class="presentable-auth-intro">
        <i class="dot"></i> 授权方案A/授权策略1 <i class="el-icon-edit"></i>
      </div>
    </resource-intro-info>

    <div class="presentable-input-info">
      <div class="presentable-input-item">
        <p class="p-input-item-title"><i class="el-icon-question"></i>节点资源名称</p>
        <el-input placeholder="输入节点资源名称" class="presentable-name-input"></el-input>
      </div>

      <div class="presentable-input-item">
        <p class="p-input-item-title"><i class="el-icon-question"></i>节点资源授权策略</p>
        <presentable-policy v-model="presentableDetail"
                            :showValidate="false"
                            @change="changePolicyHandler"></presentable-policy>
      </div>
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
