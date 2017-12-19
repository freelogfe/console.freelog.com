<template>
  <section class="create-resource-wrapper">
    <el-form :model="formData" label-width="100px" :rules="rules" ref="createForm">
      <el-form-item label="资源类型"  prop="resourceType" required>
        <el-select
          v-model="formData.resourceType"
          style="width: 300px"
          allow-create
          filterable
          placeholder="只能包含大小写字母、_和-，长度4~40">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资源名称" prop="resourceName" required>
        <el-input v-model="formData.resourceName"></el-input>
      </el-form-item>
      <el-form-item label="widgetName" prop="widgetName" v-show="formData.resourceType === ResourceTypes.widget">
        <el-input v-model="formData.widgetName" placeholder="保持与web component中的自定义标签名一致"></el-input>
      </el-form-item>

      <el-form-item label="meta信息" prop="metas">
        <template v-for="(item, index) in formData.metas">
          <el-row class="meta-item" :gutter="5">
            <el-col :span="10">
              <el-input v-model="item.key" placeholder="key只能由字母和_组成"></el-input>
            </el-col>
            <el-col :span="10">
              <el-input v-model="item.value" placeholder="value"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button @click="deleteMetaHandler(index)"><i class="el-icon-delete"></i></el-button>
            </el-col>
          </el-row>
        </template>
        <el-button @click="addMetaHandler">
          <i class="el-icon-plus"></i>
        </el-button>
      </el-form-item>
      <el-form-item label="file" required v-show="formData.resourceType !== ResourceTypes.pageBuild">
        <div class="upload-wrapper" style="width:400px">
          <el-upload
            class="upload-container"
            drag
            ref="upload"
            action="/v1/resources"
            :data="uploader.data"
            :headers="uploader.headers"
            :on-error="errorHandler"
            :on-success="successHandler"
            :auto-upload="false">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">上传文件不超过256MB</div>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="" required v-show="formData.resourceType === ResourceTypes.pageBuild">
        <page-builder ref="pageBuilder"></page-builder>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitResourceHandler('createForm')">创建</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
  import Creator from './index'

  export default Creator
</script>

<style lang="less" scoped>
  .create-resource-wrapper {
    /*width: 800px;*/
    margin: auto;
  }

  .meta-item {
    width: 400px;
    margin-bottom: 6px;
  }
</style>
