<template>
  <div class="base-resource-wrap">
    <div class="step-title">资源基础信息</div>

    <el-form :model="formData" label-width="0" :rules="rules" ref="createForm">
      <el-form-item prop="resourceName">
        <el-input v-model="formData.resourceName" class="resource-name"></el-input>
        <el-select
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
                  placeholder="widget名称">
        </el-input>
      </el-form-item>
      <el-form-item v-show="formData.resourceType !== ResourceTypes.pageBuild && !data.resourceId">
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
  .base-resource-wrap {
    width: 720px;
  }

  .resource-name {
    width: 64.5%;
  }

  .resource-type {
    width: 30%;
  }

  .step-title {
    margin-bottom: 20px;
    font-weight: 600;
    font-size: 20px;
  }
</style>
