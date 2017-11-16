<template>
  <section class="node-form-container">
    <el-form :model="dataForm" :rules="formRules" ref="dataForm" label-width="100px" class="node-form">
      <el-form-item label="节点描述" prop="nodeName" required>
        <el-input v-model="dataForm.nodeName" placeholder="长度为4-20字符"></el-input>
      </el-form-item>
      <el-form-item label="节点域名" prop="nodeDomain" required>
        <el-input v-model="dataForm.nodeDomain" placeholder="只能输入数字字母和-,长度为4-20字符">
          <template slot="append"><span class="node-domain-postfix">.freelog.com</span></template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button  type="primary" @click="submitForm('dataForm')">创建节点</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
  import NodeCreator from './index'
  export default NodeCreator
</script>

<style lang="less" scoped>
.node-form-container {
  padding-top: 10%;
}
.node-form {
  width: 600px;
  margin: auto;
  .node-domain-postfix {
    color: #333333;
    font-size: 16px;
  }
}
</style>
