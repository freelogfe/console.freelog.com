<template>
  <section class="presentable-input-info">
    <div class="presentable-input-item">
      <p class="p-input-item-title"><i class="el-icon-question"></i>节点资源名称</p>
      <el-input placeholder="输入节点资源名称" v-model="inputData.presentableName" class="presentable-name-input"></el-input>
    </div>

    <div class="presentable-input-item">
      <p class="p-input-item-title"><i class="el-icon-question"></i>节点资源授权策略</p>
      <presentable-policy v-model="inputData"
                          :showValidate="false"
                          ref="editor"
                          @change="changePolicyHandler"></presentable-policy>
    </div>

    <div class="presentable-input-ft">
      <el-button @click="savePresentableHandler">保存</el-button>
    </div>
  </section>
</template>

<script>
  import PresentableEditor from './index'

  export default PresentableEditor
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
