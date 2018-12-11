<template>
  <el-form label-position="left" :label-width="labelWidth+'px'" class="small-el-form" v-if="detail.contractId">
    <slot name="prepend"></slot>
    <el-form-item label="创建日期">
      <span>{{ detail.createDate | fmtDate }}</span>
    </el-form-item>
    <el-form-item label="合约ID">
      {{detail.contractId }}
    </el-form-item>
    <el-form-item label="甲方">
      <span v-if="detail.partyOneInfo && detail.partyOneInfo.nickname">{{ detail.partyOneInfo.nickname }}</span>
      <span v-else>{{ detail.partyOne }}</span>
    </el-form-item>
    <el-form-item label="乙方">
      <span v-if="detail.partyTwoInfo && detail.partyTwoInfo.nodeName">{{ detail.partyTwoInfo.nodeName }}</span>
      <span v-else>{{ detail.partyTwo }}</span>
    </el-form-item>
    <slot></slot>
  </el-form>
</template>

<script>
  export default {
    name: 'contract-detail-info',
    data() {
      return {}
    },
    props: {
      detail: {
        type: Object,
        default() {
          return {statusInfo: {}}
        }
      },
      labelWidth: {
        type: Number,
        default() {
          return 100
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-icon-refresh {
    cursor: pointer;
    color: #409EFF
  }
</style>
