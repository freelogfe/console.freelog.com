<template>
  <section v-if="contractDetail.contractId">
    <div v-loading="loading">
      <el-form label-width="120px">
        <el-form-item label="资源名称" style="margin-bottom: 0">
          {{resourceDetail.resourceName}}
        </el-form-item>
        <el-form-item label="资源类型" style="margin-bottom: 0">
          {{resourceDetail.resourceType}}
        </el-form-item>
      </el-form>

      <contract-detail-info :data="contractDetail" :showRefreshing="true" :labelWidth="120" :shouldShowSegment="false"
                            @refresh="updateContractDetail">
        <el-form-item label="合同详情">
          <contract-content
                  :contract.sync="contractDetail"
                  :policyText="contractDetail.contractClause.policyText"
                  @update-contract="updateContractAfterEvent">
          </contract-content>
        </el-form-item>
        <el-form-item label="激活合同"
                      v-if="contractDetail.status === 1" class="flex-grid">
          <el-button @click="activateContractHandler(contractDetail)"
                     size="small">立即激活
          </el-button>
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
