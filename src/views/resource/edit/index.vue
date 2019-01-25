<template>
  <section class="resource-detail-edit-wrap" :class="[`resource-${viewMode}-mode`]">
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

    <div class="res-info-inputs-content">
      <resource-inputs :data="resourceDetail" ref="inputArea">
        <div class="btm-wrap clearfix">
          <div class="rt-side">
            <el-button class="ft-btn" type="primary" round
                       @click="updateResourceHandler">更新资源</el-button>
          </div>
        </div>
      </resource-inputs>
    </div>

    <ResourceDetailIntro class="res-detail-intro-content"
                         :viewMode="viewMode"
                         :resource="resourceDetail" :class="[viewMode+'-mode-intro']" @switch="switchModeHandler"></ResourceDetailIntro>

    <div class="schemes-manager-content">
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
</style>
