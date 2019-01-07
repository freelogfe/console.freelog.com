<template>
  <section class="resource-detail-edit-wrap">
    <div class="update-res-file" v-if="isDev && viewMode === 'edit'">
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
    <resource-inputs class="res-base-info-inputs" :data="resourceDetail" :class="[viewMode+'-mode-info']" ref="inputArea">
      <div class="btm-wrap clearfix">
        <div class="rt-side">
          <el-button class="ft-btn" type="primary" round
                     @click="updateResourceHandler">更新资源</el-button>
          <el-button class="ft-btn" type="primary" round
                     @click="gotoResourceSchemeDetailHandler">编辑授权方案</el-button>
        </div>
      </div>
    </resource-inputs>
    <ResourceDetailIntro class="res-detail-intro-area" :resource="resourceDetail" :class="[viewMode+'-mode-intro']" @switch="switchModeHandler"></ResourceDetailIntro>
    <!--授权管理-->
    <div class="schemes-manager-container">
      <SchemesManager :resourceDetail="resourceDetail"></SchemesManager>
    </div>
  </section>
</template>

<script>
import ResourceDetail from './index'

export default ResourceDetail
</script>

<style lang="less" scoped>
  @import "index.less";
  @import "../../../styles/footer.less";

  .schemes-manager-container {
    background-color: white;
    min-height: 100vh;
  }
</style>
