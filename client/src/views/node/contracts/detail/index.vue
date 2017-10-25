<template>
  <section>
    <el-form :model="detail"class="node-detail" ref="detail" label-width="100px">
      <el-form-item label="contractId" prop="contractId">
        <el-input v-model="detail.contractId" disabled></el-input>
      </el-form-item>

      <el-form-item label="current status" prop="status">
        <el-input v-model="detail.fsmState" disabled></el-input>
      </el-form-item>

      <el-form-item label="请选择事件" prop="contractId">
        <el-select v-model="selectValue" placeholder="请选择" @change="selectEvent">
          <el-option
            v-for="html in eventHtml"
            v-html="html.html"
            :key="html.params"
            :label="html.html"
            :value="html.params"
            >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="btns">
        <el-button type="primary" @click="updateNodeDetail('detail')">确定</el-button>
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
