<template>
  <section class="presentable-input-info">
    <div class="presentable-input-item">
      <p class="p-input-item-title active-status-0"><i class="dot" style="visibility: hidden"></i>节点资源名称</p>
      <div class="p-input-item-content">
        <el-input placeholder="输入节点资源名称" v-model="inputData.presentableName" class="presentable-name-input"></el-input>
      </div>
    </div>

    <div class="presentable-input-item">
      <p class="p-input-item-title"><i class="dot" style="visibility: hidden"></i>节点资源标签</p>
      <div class="p-input-item-content">
        <tags-editor v-model="userDefinedTags" actionText="新标签"></tags-editor>
      </div>
    </div>


    <div class="presentable-input-item">
      <p class="p-input-item-title"
         :class="[isValidPolicy? 'active-status-2': 'active-status-0']"><i class="dot"></i>节点资源授权策略</p>
      <presentable-policy v-model="inputData"
                          :showValidate="false"
                          ref="editor"
                          @change="changePolicyHandler"></presentable-policy>
    </div>

    <div class="presentable-input-ft">
      <el-button class="p-input-btn" @click="savePresentableHandler">保存</el-button>
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
