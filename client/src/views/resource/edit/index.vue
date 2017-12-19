<template>
  <section>
    <el-form :model="detail" :rules="rules" class="resource-detail" ref="detail" label-width="120px">
      <el-form-item label="resourceId" prop="resourceId">
        <el-input v-model="detail.resourceId" disabled></el-input>
      </el-form-item>
      <el-form-item label="resourceType" prop="resourceType">
        <el-input v-model="detail.resourceId" disabled></el-input>
      </el-form-item>
      <el-form-item label="resourceUrl" prop="resourceUrl">
        <el-input v-model="detail.resourceUrl" disabled></el-input>
      </el-form-item>
      <el-form-item label="resourceType" prop="resourceType">
        <el-input v-model="detail.resourceType" disabled></el-input>
      </el-form-item>
      <el-form-item label="resourceName" prop="resourceName" required>
        <el-input v-model="detail.resourceName"></el-input>
      </el-form-item>
      <el-form-item label="mimeType" prop="mimeType">
        <el-input v-model="detail.mimeType" disabled></el-input>
      </el-form-item>
      <el-form-item label="createDate" prop="createDate">
        <el-input v-model="detail.createDate" disabled></el-input>
      </el-form-item>
      <el-form-item label="meta信息" prop="meta">
        <template v-for="(val, key) in detail.systemMeta">
          <el-form-item :label="key" class="meta-detail-item">
            <el-input :value="typeof val === 'string'?val:JSON.stringify(val)" disabled></el-input>
          </el-form-item>
        </template>
        <template v-for="(item, index) in metas">
          <el-row class="meta-item" :gutter="5">
            <el-col :span="5">
              <el-input v-model="item.key" placeholder="key只能由字母和_组成"></el-input>
            </el-col>
            <el-col :span="15">
              <el-input v-model="item.value" placeholder="value"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button @click="deleteMetaHandler(index)">delete</el-button>
            </el-col>
          </el-row>
        </template>
        <el-button @click="addMetaHandler()">add meta</el-button>
      </el-form-item>

      <el-form-item label="file">
        <div class="upload-wrapper">
          <el-upload
            class="upload-container"
            drag
            :headers="uploader.headers"
            ref="upload"
            :data="uploader.data"
            :action="'/v1/resources/updateResourceContext/'+detail.resourceId"
            :on-success="successHandler"
            :auto-upload="false">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">上传文件不超过256MB</div>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="primary" @click="saveHandler('detail')">保存</el-button>
        <el-button type="primary" @click="updatePageBuildHandler('detail')">更新资源文件</el-button>
        <el-button type="primary" @click="backToList()">返回</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
  import ResourceDetail from './index'

  export default ResourceDetail
</script>

<style lang="less" scoped>
  .meta-item {
    margin-bottom: 6px;
  }
  .resource-detail {
    width: 80%;
    margin: auto;
    .btns {
      text-align: center;
    }
  }
.meta-detail-item {
  margin-bottom: 9px;
}
</style>
