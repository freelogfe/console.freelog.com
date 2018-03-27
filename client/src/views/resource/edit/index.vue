<template>
  <section class="resource-detail">
    <el-tabs type="border-card" v-model="activeTabName" @tab-click="tabChange">
      <el-tab-pane label="资源基础属性">
        <el-form :model="detail" class="small-el-form" :rules="rules" ref="detail" label-width="120px">
          <el-form-item label="资源描述"
                        class="flex-grid"
                        :inline-message="true"
                        prop="resourceName" required>
            <el-input v-model="detail.resourceName" style="width: 500px"></el-input>
          </el-form-item>
          <template v-if="detail.resourceType === 'widget'">
            <el-form-item label="widget name">
              {{detail.systemMeta.widgetName}}
            </el-form-item>
            <el-form-item label="widget版本">
              {{detail.systemMeta.version}}
            </el-form-item>
          </template>
          <el-form-item label="资源ID">
            {{detail.resourceId}}
          </el-form-item>
          <el-form-item label="类型">
            {{detail.resourceType}}
          </el-form-item>
          <el-form-item label="资源URL">
            {{detail.resourceUrl}}
          </el-form-item>
          <el-form-item label="mimeType">
            {{detail.mimeType}}
          </el-form-item>
          <el-form-item label="创建日期">
            {{detail.createDate | fmtDate}}
          </el-form-item>
          <el-form-item label="资源文件"
                        v-if="isDev"
                        required>
            <el-upload
              class="upload-container"
              drag
              :headers="uploader.headers"
              ref="upload"
              :data="uploader.data"
              :action="'/api/v1/resources/updateResourceContext/'+detail.resourceId"
              :on-success="successHandler"
              :on-change="fileLimitHandler"
              :auto-upload="false">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">上传文件不超过50MB，只能上传一个文件</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="资源meta信息" name="metaInfo">
        <resource-meta-info v-model="detail.meta"></resource-meta-info>
      </el-tab-pane>
      <el-tab-pane label="资源策略" name="policy">
        <policy-editor ref="policyEditor"
                       class="policy-editor"
                       v-model="policyText"
                       @validate="validatePolicyHandler"></policy-editor>
      </el-tab-pane>
    </el-tabs>
    <div class="btns">
      <el-button type="primary" @click="saveHandler('detail')" :loading="submitLoading" :disabled="!send">保存</el-button>
      <el-button type="primary" v-if="isDev" @click="updatePageBuildHandler('detail')" :disabled="!canUpdate">更新资源
      </el-button>
      <el-button @click="backToList()">返回</el-button>
    </div>
  </section>
</template>

<script>
  import ResourceDetail from './index'

  export default ResourceDetail
</script>

<style lang="less" scoped>
  .btns {
    text-align: center;
    margin-top: 15px;
  }

  .policy-editor {
    width: 80%;
  }

</style>
