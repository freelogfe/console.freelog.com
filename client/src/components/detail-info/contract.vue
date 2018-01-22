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
      <span v-if="detail.partyOneInfo">{{ detail.partyOneInfo.nickname }}</span>
      <span v-else>{{ detail.partyOne }}</span>
    </el-form-item>
    <el-form-item label="乙方">
      <span v-if="detail.partyTwoInfo">{{ detail.partyTwoInfo.nodeName }}</span>
      <span v-else>{{ detail.partyTwo }}</span>
    </el-form-item>
    <!--<el-form-item label="合同详情" v-if="detail.policySegment">-->
      <!--<br>-->
      <!--<pre style="overflow: auto">{{ detail.policySegment.segmentText }}</pre>-->
    <!--</el-form-item>-->
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
      loadUserInfo(userId) {

        return this.$services.user.get(userId).then((res) => {
          return res.getData()
        })
      },
      loadNodeInfo(nodeId) {
        return this.$services.nodes.get(nodeId).then((res) => {
          return res.getData()
        })
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

        if (contract.partyOne) {
          this.loadUserInfo(contract.partyOne).then((userInfo) => {
            this.$set(contract, 'partyOneInfo', userInfo)
          })
        }

        if (contract.partyTwo) {
          this.loadNodeInfo(contract.partyTwo).then((nodeInfo) => {
            this.$set(contract, 'partyTwoInfo', nodeInfo)
          })
        }
        return contract
      }
    }
  }
</script>
