<template>
  <div class="base-resource-wrap" :class="['resource-edit-mode-'+editMode]">
    <el-form :model="formData" label-width="0" :rules="rules" ref="createForm">
      <el-form-item>
        <div class="uploader-wrapper">
          <div class="resource-thumbnail-input" v-if="shouldShowThumbnailInput">
            <el-upload
              v-show="!uploaderStates.thumbnail.isUploading"
              class="resource-thumbnail-uploader"
              drag
              ref="thumbnailUploader"
              action="//qi.testfreelog.com/v1/resources/upoladPreviewImage"
              :with-credentials="true"
              :data="uploader.data"
              :headers="uploader.headers"
              :on-error="errorHandler"
              :on-change="previewImageChangeHandler"
              :on-success="imageUploadSuccessHandler"
              :before-upload="validateImageHandler"
              :on-progress="uploadProgressHandler"
              :show-file-list="false"
              :auto-upload="true">
              <img v-if="formData.previewImage" :src="formData.previewImage" style="height: 100%;" alt="">
              <template v-else>
                <i class="el-icon-plus"></i>
                <div class="resource-file-tip">
                  <p>资源预览图</p>
                  <p class="resource-file-sub-tip">800X600</p>
                </div>
              </template>
            </el-upload>
            <div class="thumbnail-upload-state" v-show="uploaderStates.thumbnail.isUploading">
              <p>资源预览图</p>
              <div>
                <i class="el-icon-circle-close" @click="clearUploaderHandler('thumbnail')"></i>
                <el-progress
                  style="margin-right: 20px;"
                  :stroke-width="10"
                  :percentage="uploaderStates.thumbnail.percentage"
                  color="#333333"></el-progress>
              </div>
            </div>
          </div>

          <div class="resource-file-input">
            <div class="resource-file-uploader-wrap" v-show="shouldShowResourceUploader === true">
              <el-upload
                v-if="showCreatorInputItem"
                class="resource-file-uploader"
                drag
                ref="resourceUploader"
                action="//qi.testfreelog.com/v1/resources/uploadResourceFile"
                :with-credentials="true"
                :multiple="false"
                :data="{resourceType: formData.resourceType}"
                :headers="uploader.headers"
                :before-upload="beforeUploadHandler"
                :on-error="errorHandler"
                :on-change="fileChangeHandler"
                :on-success="successHandler"
                :show-file-list="false"
                :on-progress="uploadProgressHandler"
                :auto-upload="true">
                <i class="el-icon-plus"></i>
                <div class="resource-file-tip">
                  <p>资源文件</p>
                  <p class="resource-file-sub-tip">拖拽或点击上传，最大不超过50M</p>
                </div>
              </el-upload>
              <el-select
                v-if="!uploaderStates.resource.isUploading"
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
            </div>
            <div class="resource-upload-state" v-show="shouldShowResourceUploader === false">
              <div class="resource-type-desc">资源文件类型：{{formData.resourceType}}</div>
              <div>
                <i class="el-icon-circle-close"  @click="clearUploaderHandler('resource')"></i>
                <el-progress
                  v-if="!shouldShowResourceUploader"
                  class="resource-file-progress"
                  :stroke-width="10"
                  :percentage="uploaderStates.resource.percentage"
                  color="#333333"></el-progress>
              </div>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item prop="resourceName">
        <input type="text" v-model="formData.resourceName" class="input-item resource-name" placeholder="资源标题">
      </el-form-item>
      <el-form-item prop="widgetName" v-show="formData.resourceType === ResourceTypes.widget">
        <input type="text" v-model="formData.widgetName"
               class="input-item widget-name"
               :disabled="!showCreatorInputItem"
               placeholder="widget名称">
      </el-form-item>
      <el-form-item prop="description">
        <rich-editor class="res-desc-editor"
                     ref="editor"
                     width="100%"
                     v-model="formData.description"
                     :config="editorConfig"
                     @load="imgUploadSuccessHandler"
                     placeholder="请输入资源描述"></rich-editor>
      </el-form-item>
      <el-form-item>
        <h4 class="step-title">资源meta信息</h4>
        <resource-meta-info v-model="meta" @validate="checkMetaValid" placeholder="资源meta信息"></resource-meta-info>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import BaseResourceCreator from './index'

export default BaseResourceCreator
</script>

<style lang="less" scoped>
  @import "index.less";
</style>

<style lang="less">
  @import "reset-el.less";
</style>
