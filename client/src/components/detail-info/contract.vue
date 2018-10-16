<template>
  <el-form label-position="right" :label-width="labelWidth+'px'" class="small-el-form" v-if="detail">
    <el-form-item label="合同ID">
      {{detail.contractId }}
    </el-form-item>
    <el-form-item label="创建日期">
      <span>{{ detail.createDate | fmtDate }}</span>
    </el-form-item>
    <el-form-item label="合同状态" v-if="detail.statusInfo">
      <el-tag :type="detail.statusInfo.type">
        {{detail.statusInfo.desc }}
      </el-tag>
      <i class="el-icon-refresh"
         :class="{'el-icon-loading': refreshing}"
         @click="refreshHandler"
         v-if="showRefreshing && detail.status < 4"></i>
    </el-form-item>
    <el-form-item label="状态机状态">
      <el-tag :type="detail.status===4?'success':'warning'">
        {{detail.contractClause.currentFsmState}}
      </el-tag>
    </el-form-item>
    <el-form-item label="甲方">
      <span v-if="detail.partyOneInfo">{{ detail.partyOneInfo.nickname }}</span>
      <span v-else>{{ detail.partyOne }}</span>
    </el-form-item>
    <el-form-item label="乙方">
      <span v-if="detail.partyTwoInfo">{{ detail.partyTwoInfo.nodeName }}</span>
      <span v-else>{{ detail.partyTwo }}</span>
    </el-form-item>
    <el-form-item label="合同详情" v-if="detail.policySegment && shouldShowSegment">
      <br>
      <pre style="overflow: auto">{{ detail._segmentText }}</pre>
    </el-form-item>
    <slot></slot>
  </el-form>
</template>

<script>
  import {CONTRACT_STATUS_COLORS} from '@/config/contract'
  import ContractUtils from '@/data/contract/utils'
  export default {
    name: 'contract-detail-info',
    data() {
      return {
        detail: null,
        refreshing: false
      }
    },
    props: {
      data: {
        type: Object,
        default() {
          return {statusInfo: {}}
        }
      },
      shouldShowSegment: {
        type: Boolean,
        default() {
          return true
        }
      },
      labelWidth: {
        type: Number,
        default() {
          return 100
        }
      },
      showRefreshing: {
        type: Boolean,
        default() {
          return false
        }
      }
    },

    mounted() {
      this.render()
    },

    watch: {
      data: 'render'
    },

    methods: {
      refreshHandler() {
        this.refreshing = true
        this.$emit('refresh', {
          done: () => {
            this.refreshing = false
          }
        })
      },
      render() {
        this.detail = ContractUtils.format(this.data)
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
