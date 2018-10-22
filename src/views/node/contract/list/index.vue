<template>
  <div class="node-contracts-container">
    <div class="contract-list-wrapper">
      <h4 class="contract-list-title"><i class="el-icon-question"></i>合约列表</h4>

      <ul class="presentable-list">
        <li class="presentable-item" v-for="presentable in presentables">
          <div class="presentable-name"
               :class="[presentable.masterContract?('contract-status-'+presentable.masterContract.status):'',
               {'current': isActiveTab(presentable)}]"
               @click="showContractDetailHandler(presentable.masterContract)">
            <i class="dot"></i>{{presentable.presentableName}}
            <span v-if="presentable.masterContract">
              <!--合同ID： {{presentable.masterContract.contractId}}-->
              <!--<el-button @click="activateContractHandler(presentable.masterContract)" type="text">激活</el-button>-->
            </span>
            <span v-else><router-link :to="resolveContractCreatorLink(presentable)">未创建合同</router-link></span></div>
          <ul class="contract-list" v-if="presentable.contracts.length">
            <li class="contract-item" v-for="contract in presentable.contracts"
                :class="['contract-status-'+contract.status, {'current':currentContract.contractId===contract.contractId}]"
                @click="showContractDetailHandler(contract)">
              <div>
                <i class="dot"></i>
                <span v-if="contract.resourceDetail.resourceName">{{contract.resourceDetail.resourceName}}</span>
                <span v-else>子资源合同ID： {{contract.contractId}}</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="contract-exec-container" v-if="currentContract.contractId">
      <contract-detail :contractId="currentContract.contractId" @update="updateContractHandler"></contract-detail>
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
