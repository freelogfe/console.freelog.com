<template>
  <section>
    <el-form :model="detail" ref="detail" label-width="100px">
      <el-form-item label="name" prop="name">
        <el-input v-model="detail.name"></el-input>
      </el-form-item>
      <el-form-item label="contractId" prop="contractId">
        <el-input v-model="detail.contractId" disabled></el-input>
      </el-form-item>
      <el-form-item label="presentableId" prop="presentableId">
        <el-input v-model="detail.presentableId" disabled></el-input>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="primary" @click="updateDetail('detail')">保存</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
  import PresentableDetail from './index'
  export default PresentableDetail
</script>

<style lang="less" scoped>

</style>
