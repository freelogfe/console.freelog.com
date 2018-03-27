<template>
  <section>
    <el-form :model="data" :rules="rules"
             class="small-el-form"
             :inline-message="true"
             label-width="150px"
             ref="ruleForm">
      <slot name="prepend"></slot>
      <el-form-item label="presentable name" required prop="name">
        <el-input v-model="data.name" style="width: 700px" placeholder="请输入presentable名"></el-input>
      </el-form-item>
      <el-form-item label="tags" prop="userDefinedTags">
        <freelog-tags v-model="data.userDefinedTags"></freelog-tags>
      </el-form-item>
      <el-form-item label="用户授权策略" required prop="policyText">
        <presentable-policy :showValidateButton="false" v-model="data.policyText"
                            @validate="validatePolicyHandler"
                            style="width: 700px"></presentable-policy>
      </el-form-item>
      <slot name="append"></slot>
    </el-form>
  </section>
</template>

<script>
  import PresentableEditor from './index'

  export default PresentableEditor
</script>

<style lang="less" scoped>

</style>
