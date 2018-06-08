<template>
  <div class="base-resource-wrap" :class="['resource-edit-mode-'+editMode]">
    <div class="step-title">资源基础信息</div>

    <el-form :model="formData" label-width="0" :rules="rules" ref="createForm">
      <el-form-item prop="resourceName">
        <el-input v-model="formData.resourceName" class="resource-name"></el-input>
        <el-select
          :disabled="!showCreatorInputItem"
          v-model="formData.resourceType"
          allow-create
          filterable
          @change="resourceTypeChange"
          class="resource-type"
          placeholder="资源类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="widgetName" v-show="formData.resourceType === ResourceTypes.widget">
        <el-input v-model="formData.widgetName"
                  style="width: 95%"
                  clearable
                  :disabled="!showCreatorInputItem"
                  placeholder="widget名称">
        </el-input>
      </el-form-item>
      <el-form-item v-if="showCreatorInputItem">
        <el-upload
          class="upload-container"
          drag
          ref="upload"
          action="/api/v1/resources"
          :data="uploader.data"
          :headers="uploader.headers"
          :on-error="errorHandler"
          :on-change="fileChangeHandler"
          :on-success="successHandler"
          :auto-upload="false">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip" style="color:#DE3A3A">上传后不可更改，文件大小不得超过50MB</div>
        </el-upload>
      </el-form-item>
      <el-form-item prop="previewImage">
        <h4>资源预览图</h4>
        <el-input v-model="formData.previewImage" style="margin-bottom: 9px;" placeholder="资源预览图"></el-input>
        <el-upload
          class="upload-container"
          drag
          ref="upload"
          action="/api/v1/resources/upoladPreviewImage"
          :headers="uploader.headers"
          :on-error="errorHandler"
          :on-change="previewImageChangeHandler"
          :on-success="imageUploadSuccessHandler"
          :before-upload="validateImageHandler"
          :auto-upload="true">
          <img v-if="formData.previewImage" :src="formData.previewImage" style="height: 100%;" alt="">
          <i v-else class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip" style="color:#DE3A3A">图片不超过3MB,宽高不超过4096px,只支持jpg、png、gif、webp格式</div>
        </el-upload>
      </el-form-item>
      <!--<el-form-item prop="description">-->
      <!--<h4>资源描述</h4>-->
      <!--<description-editor  id="editor" class="res-desc-editor"-->
      <!--ref="editor"-->
      <!--width="100%"-->
      <!--@load="imgUploadSuccessHandler"-->
      <!--placeholder="资源描述"></description-editor>-->
      <!--</el-form-item>-->
      <el-form-item prop="description">
        <h4>资源描述</h4>
        <rich-editor class="res-desc-editor"
                     ref="editor"
                     width="100%"
                     v-model="formData.description"
                     :config="editorConfig"
                     @load="imgUploadSuccessHandler"
                     placeholder="资源描述"></rich-editor>
      </el-form-item>
    </el-form>

    <div class="resource-meta">
      <div class="step-title">资源meta信息</div>
      <resource-meta-info v-model="meta" @validate="checkMetaValid"></resource-meta-info>
    </div>
  </div>
</template>

<script>
  import BaseResourceCreator from './index'

  export default BaseResourceCreator
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
