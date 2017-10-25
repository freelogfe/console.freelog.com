<template>
  <div class="grid-content bg-purple">
    <el-input class="gap"
              spellcheck="false"
              type="textarea"
              :rows="15"
              placeholder="请输入policy"
              v-model="policyText">
    </el-input>
    <el-button type="primary" v-on:click="validate" v-bind:loading="validateLoading">校验</el-button>
    <el-button type="primary" v-on:click="submit" v-bind:loading="submitLoading">提交</el-button>
  </div>
</template>

<script>
  import Creator from './index'

  export default Creator
</script>

<style lang="less" scoped>
  .gap {
    margin-bottom: 12px;
  }
</style>
