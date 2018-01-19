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
      <contract-detail-info :data="contractDetail" :labelWidth="120">
        <el-form-item label="合同详情">
          <div v-html="contractDetail._segmentDetail"></div>
        </el-form-item>
        <el-form-item label="合同事件" v-if="formatContractDetail.events.length" class="flex-grid">
          <el-select v-model="selectedContractEvent"
                     class="item-detail"
                     placeholder="请选择">
            <el-option
              v-for="(event, index) in formatContractDetail.events"
              v-html="event.desc"
              :key="Math.random()"
              :label="event.desc"
              :value="index">
            </el-option>
          </el-select>
          <el-button :disabled="selectedContractEvent === ''" @click="executeContractHandler">执行</el-button>
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
