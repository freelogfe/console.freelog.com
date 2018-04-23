<template>
  <section>
    <div>
      <div class="step-1 op-step">
        <div class="step-header">
          <div class="step-circle">1</div>
          <div class="step-title">授权点名称<span class="required-dot">*</span></div>
        </div>
        <el-input placeholder="请输入授权点名称" v-model="authSchemeName"></el-input>
      </div>
      <div class="step-2 op-step">
        <div class="step-header">
          <div class="step-circle">2</div>
          <div class="step-title">创建授权点策略<span class="required-dot">*</span></div>
        </div>
        <policy-editor v-model="policyText"></policy-editor>
      </div>
      <div class="step-3 op-step">
        <div class="step-header">
          <div class="step-circle">3</div>
          <div class="step-title">依赖关系</div>
        </div>

        <dependency-tree v-model="deps" :resourceId="resourceId"></dependency-tree>
      </div>
    </div>
    <el-button type="primary" @click="createAuthNode">创建</el-button>
  </section>
</template>

<script>
  import CreateAuthNode from './index.js'

  export default CreateAuthNode
</script>
<style lang="less" scoped>
  @import "index.less";
</style>
