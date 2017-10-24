<template>
  <section>
    <el-form :model="detail"class="node-detail" ref="detail" label-width="100px">
      <el-form-item label="contractId" prop="contractId">
        <el-input v-model="detail.contractId" disabled></el-input>
      </el-form-item>
      <el-form-item label="status" prop="status">
        <el-input v-model="detail.status" disabled></el-input>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="primary" @click="updateNodeDetail('detail')">保存</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
  import PresentableDetail from './index'

  export default PresentableDetail
</script>

<style lang="less" scoped>
  .resource-detail {
    width: 80%;
    margin: auto;
    .btns {
      text-align: center;
    }
  }
.meta-detail-item {
  margin-bottom: 9px;
}
</style>
