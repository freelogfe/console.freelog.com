<template>
  <section>
    <el-form :model="data" label-width="120px" :rules="rules" class="input-form" ref="createForm">
      <el-form-item label="策略模板描述" prop="name" required>
        <el-input v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item label="策略模板描述" prop="template" required>
        <el-input type="textarea"
                  :rows="15"
                  placeholder="请输入策略"
                  v-model="data.template">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="validatePolicy">校验策略</el-button>
        <el-button type="primary" @click="submitHandler">创建</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import PolicyTplCreator from './index'

export default PolicyTplCreator
</script>

<style lang="less" scoped>
  .input-form {
    width: 50%;
  }
</style>
