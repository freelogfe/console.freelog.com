<template>
  <section>
    <el-alert
      :title="errorMsg"
      show-icon
      v-show="errorMsg"
      @close="clearErrorMsg"
      style="margin-bottom: 15px"
      type="error">
    </el-alert>
    <codemirror :code="data"
                :options="editorOptions"
                ref="codeMirror"
                placeholder="描述资源meta信息的JSON数据"
                @change="onCodeChange">
    </codemirror>

    <el-button type="primary" @click="validateJSON" style="margin-top:12px">格式校验</el-button>
  </section>
</template>

<script>
  import ResourceMetaInfo from './index'

  export default ResourceMetaInfo
</script>

<style lang="less">
  .CodeMirror {
    border: 1px solid #eee;
    height: auto;
    min-height: 400px;
  }

  .CodeMirror-empty {
    outline: 1px solid #c22;
  }

  .CodeMirror-empty.CodeMirror-focused {
    outline: none;
  }

  .CodeMirror pre.CodeMirror-placeholder {
    color: #999;
  }
</style>

