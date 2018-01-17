<template>
  <div>
    <el-input class="gap"
              spellcheck="false"
              type="textarea"
              :rows="15"
              placeholder="请输入policy"
              @change="textChange"
              v-model="policyText">
    </el-input>
    <el-button v-show="showValidateButton" @click="validate">格式校验</el-button>
  </div>
</template>

<script>
  import PresentablePolicy from './index'

  export default PresentablePolicy
</script>

<style lang="less" scoped>
  .gap {
    margin-bottom: 12px;
  }
</style>
