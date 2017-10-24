<template>
  <section>
    <el-form ref="form" :model="form" label-width="80px" class="user-setting-info">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <image-crop-upload field="file"
                           @crop-success="cropSuccess"
                           @crop-upload-success="cropUploadSuccess"
                           @crop-upload-fail="cropUploadFail"
                           v-model="showImageCropUploader"
                           :width="300"
                           :height="300"
                           url="/api/profile"
                           :params="params"
                           :headers="headers"
                           img-format="png"
        ></image-crop-upload>
        <el-button type="primary" @click="showAvatarSettingHandler" size="small">上传图像</el-button>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveSettingHandler">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
  import AccountSettings from './index'

  export default AccountSettings
</script>

<style lang="less" scoped>
  .user-setting-info {
    width: 50%;
    margin: auto;
  }
</style>
