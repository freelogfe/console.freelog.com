<template>
  <div class="node-contracts-container">
    <div class="contract-list-wrapper">
      <h4 class="contract-list-title"><i class="el-icon-question"></i>合约列表</h4>
      <ul class="contract-list">
        <li class="contract-item" v-for="contract in contractList">
          <div>合同ID： {{contract.contractId}}</div>
          <div v-if="contract.resourceDetail">
            <div>{{contract.resourceDetail.resourceName}}</div>
            <div>资源ID: {{contract.resourceDetail.resourceId}}</div>
          </div>
          <div v-if="contract.statusInfo">
            <el-tag :type="contract.statusInfo.type">{{contract.statusInfo.desc}}</el-tag>
            <el-button @click="activateContractHandler(contract)" type="text">激活</el-button>
          </div>
          <pre class="policy-text">{{contract._segmentText}}</pre>
        </li>
      </ul>
    </div>

    <div class="contract-exec-container">

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
