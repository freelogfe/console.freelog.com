<template>
  <section>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple">
        <el-input class="gap"
          type="textarea"
          :rows="8"
          placeholder="请输入policy"
          v-model="textarea">
        </el-input>
        <el-button type="primary" v-on:click="validate" v-bind:loading="validateLoading">校验</el-button>
        <el-button type="primary" v-on:click="submit" v-bind:loading="submitLoading">提交</el-button>
      </div></el-col>

    </el-row>

  </section>
</template>

<script>
  import Creator from './index'
  export default Creator
</script>

<style lang="less" scoped>
  .upload-container {
    width: 20%;
    margin: auto;
  }
  .gap {
        margin-bottom: 12px;
  }
</style>
