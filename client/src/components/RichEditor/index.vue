<template>
  <div class="rich-editor-wrapper">
    <quill-rich-editor v-model="content"
                       class="rich-text-editor"
                       ref="richEditor"
                       :options="editorOption"
                       @blur="onEditorBlur($event)"
                       @focus="onEditorFocus($event)"
                       @ready="onEditorReady($event)"
                       @change="onEditorChange($event)">
    </quill-rich-editor>

    <el-dialog
      :visible.sync="showImgUploader"
      center
      width="500px">
      <el-upload
        class="rich-editor-upload-img"
        drag
        action="/api/v1/resources/upoladPreviewImage"
        ref="imgUploader"
        :on-success="uploadImageSuccessHandler"
        :on-error="uploadImageErrorHandler"
        :auto-upload="true">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">点击上传或将图片拖到此处</div>
        <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
      </el-upload>
    </el-dialog>

  </div>

</template>

<script>
  import RichEditor from './index.js'

  export default RichEditor
</script>

<style lang="less">
  @import "index.less";
</style>
