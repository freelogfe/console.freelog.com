<template>
  <section class="resource-detail-edit-wrap">
    <div class="update-res-file" v-if="isDev">
      <el-upload
        class="upload-container"
        drag
        ref="upload"
        :data="{meta: '{}'}"
        :with-credentials="true"
        :action="actionUrl"
        :auto-upload="true">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">上传文件不超过50MB，只能上传一个文件</div>
      </el-upload>
    </div>
    <resource-inputs :data="resourceDetail" ref="inputArea">
      <div class="btm-wrap clearfix">
        <div class="rt-side">
          <el-button class="ft-btn" type="primary" @click="updateResourceHandler">更新资源</el-button>
          <el-button class="ft-btn" type="primary" @click="gotoResourceSchemeDetailHandler">进入授权</el-button>
        </div>
      </div>
    </resource-inputs>
  </section>
</template>

<script>
import ResourceDetail from './index'

export default ResourceDetail
</script>

<style lang="less" scoped>
  @import "index.less";
  @import "../../../styles/footer.less";
</style>
