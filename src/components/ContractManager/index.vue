<template>
  <div class="fl-contracts-manager-wrap clearfix" v-loading="loading">
    <div class="contract-list-wrapper">
      <h4 class="label-title">资源列表</h4>

      <div class="contract-list-panel">
        <div v-if="masterContract.contractId">
          <p class="sub-label-title">主资源</p>
          <div class="contract-item"
              :class="['contract-status-'+masterContract.status,
               {'current':currentContract.contractId===masterContract.contractId}]"
              @click="showContractDetailHandler(masterContract)">
            <div v-if="masterContract.resourceDetail">
              <i class="dot"></i>
              <span v-if="masterContract.resourceDetail.resourceName">{{masterContract.resourceDetail.resourceName}}</span>
              <span v-else>子资源合同ID： {{masterContract.contractId}}</span>
            </div>
          </div>
        </div>
        <div v-if="contractList.length">
          <p class="sub-label-title">上抛资源 <span class="contracts-num">{{contractList.length}}</span></p>
          <ul class="contract-list">
            <li class="contract-item"
                v-for="contract in contractList"
                :key="contract.contractId"
                :class="['contract-status-'+contract.status, {'current':currentContract.contractId===contract.contractId}]"
                @click="showContractDetailHandler(contract)">
              <div>
                <i class="dot"></i>
                <span v-if="contract.resourceDetail.resourceName">{{contract.resourceDetail.resourceName}}</span>
                <span v-else>子资源合同ID： {{contract.contractId}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="contract-exec-container" v-if="currentContract.contractId">
      <contract-detail :contract="currentContract" @update="updateContractHandler"></contract-detail>
    </div>
  </div>
</template>

<script>
  import ResourceList from './index'

  export default ResourceList
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
