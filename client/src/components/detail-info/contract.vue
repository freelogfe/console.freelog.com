<template>
  <el-form label-position="right" :label-width="labelWidth+'px'" class="small-el-form" v-if="detail">
    <el-form-item label="创建日期">
      <span>{{ detail.createDate | fmtDate }}</span>
    </el-form-item>
    <el-form-item label="合同状态" v-if="detail.statusInfo">
      <el-tag :type="detail.statusInfo.type">
        {{detail.statusInfo.desc }}
      </el-tag>
    </el-form-item>
    <el-form-item label="状态机状态">
      <el-tag :type="detail.status===3?'success':'warning'">
        {{detail.fsmState}}
      </el-tag>
    </el-form-item>
    <el-form-item label="甲方">
      <span>{{ detail.partyOne }}</span>
    </el-form-item>
    <el-form-item label="乙方">
      <span>{{ detail.partyTwo }}</span>
    </el-form-item>
    <el-form-item label="合同详情" v-if="detail.policySegment">
      <br>
      <pre>{{ detail.policySegment.segmentText }}</pre>
    </el-form-item>
    <slot></slot>
  </el-form>
</template>

<script>
  import {CONTRACT_STATUS_COLORS} from '@/config/contract'

  export default {
    name: 'contract-detail-info',
    data() {
      return {
        detail: null
      }
    },
    props: {
      data: {
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
    },

    mounted() {
      this.render()
    },

    watch: {
      data: 'render'
    },

    methods: {
      render() {
        this.detail = this.format(this.data)
      },
      format(contract) {
        if (!contract) return

        contract.statusInfo = CONTRACT_STATUS_COLORS[contract.status]
        contract.forUsers = contract.policySegment.users.map((user) => {
          return {
            users: user.users.join('、'),
            type: user.userType
          }
        })
        return contract
      }
    }
  }
</script>
