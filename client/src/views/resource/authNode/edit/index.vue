<template>
  <section class="auth-node-editor-wrap">
    <el-form label-position="right" label-width="120px">
      <el-form-item label="授权点描述" required>
        <el-input v-model="authSchemeName"></el-input>
      </el-form-item>
      <el-form-item label="授权点策略" required>
        <policy-editor v-model="policyText" @validate="validatePolicyHandler"></policy-editor>
      </el-form-item>
      <el-form-item label="授权点依赖关系">
        <dependency-tree v-model="deps" :resourceId="resourceId"></dependency-tree>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveAuthNode">更新授权点</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
  import EditAuthNode from './index.js'

  export default EditAuthNode
</script>


<style scoped lang="less">

</style>
