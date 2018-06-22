<template>
  <div class="node-contracts-container">
    <div class="contract-list-wrapper">
      <h4 class="contract-list-title"><i class="el-icon-question"></i>合约列表</h4>

      <ul class="presentable-list">
        <li class="presentable-item" v-for="presentable in presentables">
          <div class="presentable-name" @click="showContractDetailHandler(presentable.masterContract)">
            {{presentable.presentableName}}
            <span v-if="presentable.masterContract">
              合同ID： {{presentable.masterContract.contractId}}
            <el-button @click="activateContractHandler(contract)" type="text">激活</el-button>
            </span>
            <span v-else><router-link :to="resolveContractCreatorLink(presentable)">未创建合同</router-link></span></div>
          <ul class="contract-list">
            <li class="contract-item" v-for="contract in presentable.contracts"
                @click="showContractDetailHandler(contract)">
              <div>合同ID： {{contract.contractId}}<el-button @click="activateContractHandler(contract)" type="text">激活</el-button></div>
              <div v-if="contract.resourceDetail">
                <div>{{contract.resourceDetail.resourceName}}</div>
                <div>资源ID: {{contract.resourceDetail.resourceId}}</div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="contract-exec-container" v-show="currentContract.contractId">
      <contract-detail :contract-detail="currentContract"></contract-detail>
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
