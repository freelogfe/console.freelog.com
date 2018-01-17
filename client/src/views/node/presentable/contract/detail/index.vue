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
      <el-form label-position="right" class="small-el-form" label-width="120px">
        <el-form-item label="合同ID">
          {{contractDetail.contractId}}
        </el-form-item>
        <el-form-item label="合同状态">
          {{formatContractDetail.statusTip}}
        </el-form-item>
        <el-form-item label="合同甲方">
          {{contractDetail.partyOne}}
        </el-form-item>
        <el-form-item label="合同乙方">
          {{contractDetail.partyTwo}}
        </el-form-item>
        <el-form-item label="合同创建时间">
          {{contractDetail.createDate|fmtDate}}
        </el-form-item>
        <el-form-item label="合同当前状态">
          <el-tag :type="contractDetail.status===3?'success':'warning'">
            {{contractDetail.fsmState}}
          </el-tag>
        </el-form-item>
        <el-form-item label="合同详情" class="flex-grid">
          <el-collapse accordion>
            <el-collapse-item title="一致性 Consistency" name="1" class="acc-header">
              <template slot="title">
                <i class="el-icon-document"></i>
              </template>
              <pre class="item-detail">{{contractDetail.policySegment.segmentText}}</pre>
            </el-collapse-item>
          </el-collapse>
        </el-form-item>
        <el-form-item label="合同事件" v-if="formatContractDetail.events.length" class=" flex-grid">
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
      </el-form>
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
