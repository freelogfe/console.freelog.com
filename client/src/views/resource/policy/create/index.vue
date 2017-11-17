<template>
  <div>
    <div class="resource-detail" v-if="resource">
      <h3>{{resource.resourceName}}</h3>
    </div>
    <el-input class="gap"
              spellcheck="false"
              type="textarea"
              :rows="15"
              placeholder="请输入policy"
              v-model="policyText">
    </el-input>
    <el-button type="primary" v-on:click="validate" v-bind:loading="validateLoading">格式校验</el-button>
    <el-button type="primary" v-on:click="submit" v-bind:loading="submitLoading">提交</el-button>
  </div>
</template>

<script>
  import Creator from './index'

  export default Creator
</script>

<style lang="less" scoped>
  .resource-detail {
    margin-bottom: 15px;
    text-align: center;
  }
  .gap {
    margin-bottom: 12px;
  }
</style>
