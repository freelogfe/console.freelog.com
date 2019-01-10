<template>
  <div class="resource-input-wrap" :class="['resource-edit-mode-'+editMode]">
    <el-form :model="formData" class="input-list" label-width="0" :rules="rules" ref="createForm">
      <div class="input-item-wrap">
        <h4>资源信息</h4>
        <div class="input-area res-info-input-wrap">
          <div class="input-lf-side">
            <div class="resource-file-input input-item" v-if="showCreatorInputItem">
              <div class="resource-file-uploader-wrap require-input" v-show="shouldShowResourceUploader === true">
                <el-upload
                        v-if="showCreatorInputItem"
                        class="resource-file-uploader"
                        drag
                        ref="resourceUploader"
                        :action="uploadResourceFileAction"
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
              </div>
              <div class="resource-upload-state clearfix" v-show="shouldShowResourceUploader === false">
                <!--<div class="resource-type-desc">资源文件类型：{{formData.resourceType}}</div>-->
                <div class="upload-state-wrap">
                  <i class="el-icon-document">
                    <span v-if="!shouldShowResourceUploader && uploaderStates.resource.percentage < 100">{{uploaderStates.resource.percentage}}</span>
                    <i v-else class="el-icon-circle-check"></i>
                  </i>
                </div>
                <div>
                  <p class="upload-file-name">{{formData.filename}}
                    <el-button type="text"
                               style="color: #C3C3C3;font-size: 12px;padding: 0;"
                               size="mini"
                               @click="reuploadHandler('resource')">重新上传
                    </el-button>
                  <p class="resource-file-size"> {{humanizeSize(formData.filesize)}}</p>
                </div>
              </div>
            </div>
            <div class="require-input input-item">
              <el-form-item prop="resourceName">
                <input type="text" class="input-rect" v-model="formData.resourceName" placeholder="资源标题">
              </el-form-item>
            </div>
            <div class="require-input input-item">
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
            </div>

            <template v-if="formData.resourceType === ResourceTypes.widget">
              <div class="require-input input-item">
                <el-form-item prop="widgetName">
                  <input type="text" v-model="formData.widgetName"
                         class="input-rect"
                         :disabled="!showCreatorInputItem"
                         placeholder="widget名称">
                </el-form-item>
              </div>
              <div class="require-input input-item">
                <el-form-item prop="widgetName">
                  <input type="text" v-model="formData.widgetVersion"
                         class="input-rect"
                         :disabled="!showCreatorInputItem"
                         placeholder="widget版本号">
                </el-form-item>
              </div>
            </template>
          </div>
          <div class="resource-thumbnail-input input-item">
            <el-upload
                    v-show="!uploaderStates.thumbnail.isUploading"
                    class="resource-thumbnail-uploader"
                    drag
                    ref="thumbnailUploader"
                    :action="uploadPreviewImageAction"
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
                <div>
                  <i class="el-icon-plus"></i>
                  <p class="thumbnail-tip">上传封面</p>
                </div>
              </template>
            </el-upload>
            <div class="thumbnail-upload-state" v-show="uploaderStates.thumbnail.isUploading">
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
        </div>
      </div>

      <div class="input-item-wrap">
        <h4>依赖资源</h4>
        <div class="input-area" :class="{'edit-disabled': !canEditDependencies}">
          <div>
            <el-popover
                    ref="depsPopTip"
                    placement="top"
                    title=""
                    width="200"
                    trigger="hover"
                    :disabled="canEditDependencies"
                    content="已发布的资源不能修改依赖">
            </el-popover>
            <el-button class="add-dep-btn"
                       @click="showSearchDialogHandler"
                       type="text"
                       v-popover:depsPopTip
                       size="mini"><i class="el-icon-plus"></i>添加依赖资源
            </el-button>
          </div>
          <ul class="res-deps-wrap" v-if="deps.length">
            <li class="res-dep-item" :key="index"
                v-for="(dep,index) in deps">
              <el-button class="del-dep-btn"
                         @click="removeDepResourceHandler(dep, index)"
                         size="mini" type="text">
                <i class="el-icon-remove"></i>
              </el-button>
              <i class="dot"></i>{{dep.resourceName}}
            </li>
          </ul>
        </div>
      </div>

      <div class="input-item-wrap">
        <h4>资源介绍</h4>
        <div class="input-area">
          <rich-editor class="res-desc-editor"
                       ref="editor"
                       width="100%"
                       v-model="formData.description"
                       :config="editorConfig"
                       @load="imgUploadSuccessHandler"
                       placeholder="请输入资源描述"></rich-editor>
        </div>
      </div>

      <div class="input-item-wrap">
        <h4>meta信息</h4>
        <div class="input-area">
          <resource-meta-info v-model="meta" @validate="checkMetaValid" placeholder="资源meta信息"></resource-meta-info>
        </div>
      </div>
    </el-form>

    <slot></slot>

    <el-dialog
            :visible.sync="showSearchResourceDialog"
            width="640px"
            :close-on-click-modal="true"
            :before-close="beforeCloseDialogHandler"
            top="10vh"
            center>
      <p slot="title" class="dialog-title">添加资源</p>
      <SearchResource class="add-resource-input" @add="addDepResourceHandler"></SearchResource>
    </el-dialog>
  </div>
</template>


<script>
  import ResourceInput from './index'

  export default ResourceInput
</script>

<style lang="less" scoped>
  @import "index.less";
</style>

<style lang="less">
  @import "reset-el.less";
</style>
