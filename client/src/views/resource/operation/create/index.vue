<template>
  <section>
    <div class="upload-wrapper">
      <el-select v-model="uploader.data.resourceType" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-upload
        class="upload-container"
        drag
        ref="upload"
        action="/v1/resources"
        :data="uploader.data"
        :headers="uploader.headers"
        :on-error="errorHandler"
        :on-success="successHandler"
        :auto-upload="false">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">上传文件不超过256MB</div>
      </el-upload>
      <el-button size="small" type="success" @click="submitUpload">上传</el-button>
    </div>
  </section>
</template>

<script>
  import Creator from './index'
  export default Creator
</script>

<style lang="less" scoped>
  .upload-wrapper {
    text-align: center;
  }
  .upload-container {
    width: 20%;
    margin: auto;
  }
</style>
