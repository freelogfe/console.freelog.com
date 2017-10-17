<template>
  <section>
    <el-row>
      <el-form :model="formData" :rules="rules" label-width="200px" ref="ruleForm">
        <el-form-item label="presentable名" prop="presentableName">
          <el-input v-model="formData.presentableName" placeholder="请输入presentable名"></el-input>
        </el-form-item>

        <el-form-item label="presentable_policy" prop="presentable_policy">
          <el-input class="gap"
          spellcheck="false"
            type="textarea"
            :rows="8"
            placeholder="请输入policy"
            v-model="formData.textarea"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="validate('ruleForm')" v-bind:loading="validateLoading">校验</el-button>
          <el-button type="primary" v-on:click="submit" v-bind:loading="submitLoading">提交</el-button>
        </el-form-item>

      </el-form>
    </el-row>
  </section>
</template>

<script>
  import PresentableCreator from './index'
  export default PresentableCreator
</script>

<style lang="less" scoped>
  .upload-container {
    width: 20%;
    margin: auto;
  }
  .gap {
        margin-bottom: 12px;
  }
</style>
