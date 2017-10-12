<template>
  <section>
    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple">
        <el-input class="gap"
          type="textarea"
          :rows="8"
          placeholder="请输入policy"
          v-model="textarea">
        </el-input>
        <el-button type="primary" v-on:click="validate" v-bind:loading="validateLoading">校验</el-button>
        <el-button type="primary" v-on:click="submit" v-bind:loading="submitLoading">提交</el-button>
      </div></el-col>

      <el-col :span="12"><div class="grid-content bg-purple-light">
        <el-upload
          class="upload-container"
          drag
          action="//freelog.com/api/file"
          :headers="headers"
          :on-error="errorHandler"
          :on-success="nextAction"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">上传文件不超过256MB</div>
        </el-upload>
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
