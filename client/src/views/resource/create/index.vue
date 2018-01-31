<template>
  <section class="create-resource-wrapper">
    <el-tabs type="border-card" v-model="activeTabName" @tab-click="tabChange">
      <el-tab-pane label="资源基础属性" name="resourceInfo">
        <el-form :model="formData" label-width="100px" :rules="rules" ref="createForm">
          <el-form-item label="资源名称" prop="resourceName"
                        :inline-message="true"
                        required class="input-item">
            <el-input v-model="formData.resourceName" clearable></el-input>
          </el-form-item>
          <el-form-item label="资源类型" prop="resourceType" required class="input-item">
            <el-select
              v-model="formData.resourceType"
              allow-create
              filterable
              @change="resourceTypeChange"
              style="width: 100%"
              placeholder="只能包含大小写字母、_和-，长度4~40">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="widget名称"
                        prop="widgetName"
                        class="input-item"
                        :required="formData.resourceType === ResourceTypes.widget"
                        v-show="formData.resourceType === ResourceTypes.widget">
            <el-input v-model="formData.widgetName"
                      style="width: 95%"
                      clearable
                      placeholder="保持与web component中自定义标签名一致">
            </el-input>
            <el-tooltip class="item" effect="dark" content="必须以freelog-开头，仅支持[a-z0-9._-]" placement="top">
              <i class="el-icon-info"></i>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="文件"
                        class="input-item"
                        required
                        v-show="formData.resourceType !== ResourceTypes.pageBuild">
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
              <div class="el-upload__tip" slot="tip">上传文件不超过50MB，只能上传一个文件</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="资源meta信息" name="metaInfo">
        <resource-meta-info v-model="formData.meta"></resource-meta-info>
      </el-tab-pane>
      <el-tab-pane label="资源策略" name="policy">
        <policy-editor ref="policyEditor" v-model="formData.policyText" @validate="validatePolicyHandler"></policy-editor>
      </el-tab-pane>
      <el-tab-pane
        :key="item.name"
        v-for="(item, index) in tabs"
        :label="item.title"
        :name="item.name">
        <component :is="item.content" :ref="item.ref" :tab-name="item.name" :data="item.data"></component>
      </el-tab-pane>
    </el-tabs>
    <div style="text-align: center;margin-top: 15px">
      <el-button type="primary"
                 :loading="loading"
                 @click="submitResourceHandler('createForm')" :disabled="!valid">创建</el-button>
    </div>
  </section>
</template>

<script>
  import Creator from './index'

  export default Creator
</script>

<style lang="less" scoped>
  .create-resource-wrapper {
    margin: auto;
  }

  .input-item {
    width: 500px;
  }

</style>
