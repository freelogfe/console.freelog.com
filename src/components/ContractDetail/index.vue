<template>
  <div class="fl-contract-detail-wrap" v-if="contractDetail.contractId">
    <h4 class="label-title">合约详情</h4>

    <contract-detail-info :detail="contractDetail"
                          :showRefreshing="true"
                          :labelWidth="85">
      <template slot="prepend">
        <el-form-item label="资源名称">{{resourceDetail.resourceName}}</el-form-item>
        <el-form-item label="资源类型">{{resourceDetail.resourceType}}</el-form-item>
      </template>
      <el-form-item label="激活合同" v-if="contractDetail.status === 1" class="flex-grid">
        <el-button @click="activateContractHandler(contractDetail)"
                   size="small">立即激活
        </el-button>
      </el-form-item>
    </contract-detail-info>

    <div class="contract-policy-content-wrap">
      <div class="contract-policy-title">授权策略1<label>授权状态：{{contractDetail.statusInfo.desc }}</label></div>
      <contract-content
              class="contract-policy-content"
              :contract.sync="contractDetail"
              :policyText="contractDetail.contractClause.policyText"
              @update-contract="updateContractAfterEvent">
      </contract-content>
    </div>
  </div>
</template>

<script>
  import {ContractDetail} from '@freelog/freelog-ui-contract'
  import ContractDetailInfo from '@/components/detail-info/contract.vue'
  import ContractUtils from '@/data/contract/utils'
  import {onloadResourceDetail} from '@/data/resource/loader'

  export default {
    name: 'fl-contract-detail-wrap',
    data() {
      return {
        eventComponent: '',
        dialogTitle: '',
        showEventExecDialog: false,
        contractDetail: {},
        resourceDetail: {},
        account: '',
        options: [],
        password: '',
        selectedContractEvent: ''
      }
    },
    components: {
      ContractDetailInfo,
      'contract-content': ContractDetail,
    },
    props: {
      contract: Object
    },
    watch: {
      contract: 'initContractDetail'
    },
    mounted() {
      this.initContractDetail()
    },
    methods: {
      initContractDetail() {
        var contract = this.contract

        if (contract && contract.contractId) {
          if (contract.partyOneInfo) {
            this.contractDetail = contract
          } else {
            this.contractDetail = ContractUtils.format(contract)
          }

          if (contract.resourceDetail) {
            this.resourceDetail = contract.resourceDetail
          } else {
            onloadResourceDetail(contract.resourceId)
              .then((resInfo) => {
                this.resourceDetail = resInfo
              })
          }
        }
      },
      updateContractAfterEvent(detail) {
        if (detail && detail.shouldUpdate) {
          setTimeout(() => {
            this.updateContractDetail() // 由于后端支付存在延迟，临时延迟update，后续根据订单支付状态进行优化展示
          }, 5e2)
        }
      },
      formatData() {
        let detail = Object.assign({}, this.contractDetail)
        detail = ContractUtils.format(detail)
        return detail
      },
      // 获取合同详情
      loadContractDetail(param) {
        return this.$services.contract.get(param || {})
          .then(res => res.getData()).catch(this.$error.showErrorMessage)
      },
      // 更新合同
      updateContractDetail(detail) {
        this.loadContractDetail(this.contractDetail.contractId).then((contract) => {
          Object.assign(this.contractDetail, contract)
          this.formatData()
          if (detail && detail.done) {
            detail.done()
          }
        })
      },
      // 激活合同
      activateContractHandler(contract) {
        this.$axios.get('/v1/contracts/initial', {
          params: {
            contractIds: contract.contractId
          }
        }).then((res) => {
          if (res.data.errcode === 0) {
            this.$message.success('成功激活合同')
            this.loadContractDetail(contract.contractId).then((contractDetail) => {
              Object.assign(contract, contractDetail)
              this.$emit('update', ContractUtils.format(contract))
            })
          } else {
            this.$error.showErrorMessage(res.data.msg)
          }
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .fl-contract-detail-wrap {
    .label-title {
      margin-bottom: 30px;
    }

    .contract-policy-content-wrap {
      margin-top: 50px;
    }

    .contract-policy-content {
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .2);
      padding: 20px;
    }
    .contract-policy-title {
      font-size: 14px;
      color: #222222;
      font-weight: bold;
      margin-bottom: 10px;
      label {
        float: right;
      }
    }
  }
</style>

<style lang="less">
  .fl-contract-detail-wrap {
    .small-el-form {
      display: flex;
      flex-flow: wrap;
      .el-form-item {
        flex-basis: 50%;
        color: #222222;
      }

      .el-form-item__label {
        color: #999999;
      }

      .el-icon-document {
        font-size: 16px;
        padding-right: 8px;
        padding-left: 5px;
      }
    }
  }
</style>