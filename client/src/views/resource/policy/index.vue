<template>
  <div>
    <el-input class="gap"
              spellcheck="false"
              type="textarea"
              :rows="15"
              placeholder="请输入policy"
              v-model="policyText">
    </el-input>
    <el-button type="primary" @click="validate" v-bind:loading="validateLoading">格式校验</el-button>
  </div>
</template>

<script>
  import PolicyEditor from './index'

  export default PolicyEditor
</script>

<style lang="less" scoped>
  .gap {
    margin-bottom: 12px;
  }
</style>
