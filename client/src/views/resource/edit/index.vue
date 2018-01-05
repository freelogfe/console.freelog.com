<template>
  <section class="resource-detail">
    <el-tabs type="border-card" v-model="activeTabName" @tab-click="tabChange">
      <el-tab-pane label="资源基础属性">
        <el-form :model="detail" :rules="rules" ref="detail" label-width="120px">
          <el-form-item label="resourceName"
                        class="input-item"
                        prop="resourceName" required>
            <el-input v-model="detail.resourceName"></el-input>
          </el-form-item>
          <el-form-item :label="key"
                        class="input-item"
                        :key="key"
                        v-for="key in showKeys">
            <el-input v-model="detail[key]" disabled></el-input>
          </el-form-item>
          <el-form-item label="file"
                        class="input-item"
                        required>
            <el-upload
              class="upload-container"
              drag
              :headers="uploader.headers"
              ref="upload"
              :data="uploader.data"
              :action="'/v1/resources/updateResourceContext/'+detail.resourceId"
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
      <el-tab-pane label="resource policy" name="policy">
        <!--<el-tooltip class="item" effect="dark" content="更新policy后，已签约的policy不变，新签约的policy以更新后的为准" placement="top">-->
          <!--<i class="el-icon-question"></i>-->
        <!--</el-tooltip>-->
        <policy-editor ref="policyEditor"
                       v-model="policyText"
                       :resourceId="detail.resourceId"></policy-editor>
      </el-tab-pane>
    </el-tabs>
    <div class="btns">
      <el-button type="primary" @click="saveHandler('detail')" :loading="submitLoading">保存</el-button>
      <el-button type="primary" @click="updatePageBuildHandler('detail')">更新资源</el-button>
      <el-button @click="backToList()">返回</el-button>
    </div>
  </section>
</template>

<script>
  import ResourceDetail from './index'

  export default ResourceDetail
</script>

<style lang="less" scoped>
  .input-item {
    width: 500px;
  }

  .btns {
    text-align: center;
    margin-top: 15px;
  }

</style>
