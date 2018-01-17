<template>
  <el-form label-position="left" label-width="80px" class="small-el-form" v-if="data">
    <el-form-item label="createDate">
      <span>{{ data.createDate | fmtDate }}</span>
    </el-form-item>
    <el-form-item label="合同状态">
      <span>{{ data.statusInfo && data.statusInfo.desc }}</span>
    </el-form-item>
    <el-form-item label="状态机状态">
      <span>{{ data.fsmState }}</span>
    </el-form-item>
    <el-form-item label="甲方">
      <span>{{ data.partyOne }}</span>
    </el-form-item>
    <el-form-item label="乙方">
      <span>{{ data.partyTwo }}</span>
    </el-form-item>
    <el-form-item label="合同详情" v-if="data.policySegment">
      <br>
      <pre>{{ data.policySegment.segmentText }}</pre>
    </el-form-item>
    <slot></slot>
  </el-form>
</template>

<script>
  import {CONTRACT_STATUS_COLORS} from '@/config/contract'

  export default {
    name: 'contract-detail-info',
    props: {
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },

    mounted() {
      this.format(this.data)
    },

    watch: {
      data: function () {
        this.format(this.data)
      }
    },

    methods: {
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
