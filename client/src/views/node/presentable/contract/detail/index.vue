<template>
  <section>
    <el-dialog
      :title="dialogTitle"
      ref="eventDialog"
      :visible.sync="showEventExecDialog"
      :before-close="handleCloseDialog"
      width="40%">
      <component :is="eventComponent"
                 :contractDetail="contractDetail"
                 @close="closeDialogHandler"
                 :params="selectedContractEvent"></component>
    </el-dialog>

    <div v-if="contractDetail">
      <contract-detail-info :data="contractDetail" :labelWidth="120" :shouldShowSegment="false">
        <el-form-item label="合同详情">
          <contract-content :data="formatContractDetail" @execute="executeContractHandler"></contract-content>
        </el-form-item>
      </contract-detail-info>
    </div>
  </section>
</template>

<script>
  import PresentableContractDetail from './index'

  export default PresentableContractDetail
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
