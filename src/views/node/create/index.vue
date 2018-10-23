<template>
  <section class="node-creator-container">
    <el-form :model="dataForm" :rules="formRules" ref="dataForm" label-width="0" class="node-form">
      <el-form-item prop="nodeDomain" class="node-creator-input-item">
        <input type="text" v-model="dataForm.nodeDomain" class="node-creator-input" placeholder="输入节点地址">
        <span class="node-domain-postfix">{{domainPostfix}}</span>
      </el-form-item>
      <el-form-item prop="nodeName" class="node-creator-input-item">
        <input type="text" v-model="dataForm.nodeName" class="node-creator-input" placeholder="输入节点名称">
        <!--<el-input v-model="dataForm.nodeName" class="node-creator-input" placeholder="输入节点名称"></el-input>-->
      </el-form-item>
    </el-form>

    <div class="ft clearfix">
      <div class="rt-side">
        <el-button class="ft-btn gray-btn" @click="goBackHandler">取消</el-button>
        <el-button class="ft-btn deep-color-btn" type="primary" @click="submitForm('dataForm')">创建节点</el-button>
      </div>
    </div>
  </section>
</template>

<script>
import NodeCreator from './index'

export default NodeCreator
</script>

<style lang="less" scoped>
  @import "../../../styles/footer.less";
  @import "index.less";
</style>

<style>
  .node-creator-container .node-form .node-creator-input-item > .el-form-item__content {
    display: flex;
    height: 30px;
    line-height: 30px;
    padding-bottom: 10px;
  }
</style>
