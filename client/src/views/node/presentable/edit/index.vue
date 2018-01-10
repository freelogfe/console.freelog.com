<template>
  <section>
    <presentable-steps :active="step.active"></presentable-steps>

    <h3>{{presentableDetail.resource.resourceName}}</h3>
    <el-row>
      <el-form :model="formData" :rules="rules" label-width="200px" ref="ruleForm">
        <el-form-item label="presentable名" required prop="presentableName">
          <el-input v-model="formData.presentableName" placeholder="请输入presentable名"></el-input>
        </el-form-item>
        <el-form-item label="presentable tags" prop="presentableTags">
          <presentable-tags v-model="formData.presentableTags"></presentable-tags>
        </el-form-item>

        <el-form-item label="presentable_policy" required prop="userPolicy">
          <el-input class="gap"
                    spellcheck="false"
                    type="textarea"
                    :rows="8"
                    placeholder="请输入policy"
                    v-model="formData.userPolicy">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="validate('ruleForm')" :loading="validateLoading">校验</el-button>
          <el-button type="primary" @click="submit" :loading="submitLoading">提交</el-button>
        </el-form-item>

      </el-form>
    </el-row>
  </section>
</template>

<script>
  import PresentableEditor from './index'

  export default PresentableEditor
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
