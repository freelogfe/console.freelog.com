<template>
  <section class="node-form-container">
    <el-form :model="detail" :rules="rules" class="node-form" ref="detail" label-width="100px">
      <el-form-item label="nodeName" prop="nodeName">
        <el-input v-model="detail.nodeName"></el-input>
      </el-form-item>
      <el-form-item label="nodeDomain" prop="nodeDomain">
        <el-input v-model="detail.nodeDomain" disabled></el-input>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="primary" @click="updateNodeDetail('detail')">保存</el-button>
        <el-button @click="backToList()">返回</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
  import NodeDetail from './index'

  export default NodeDetail
</script>

<style lang="less" scoped>
  .node-form-container {
    padding-top: 10%;
  }
  .node-form {
    width: 600px;
    margin: auto;
  }

</style>
