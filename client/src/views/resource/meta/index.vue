<template>
  <section>
    <el-alert
      title="错误提示的文案"
      show-icon
      type="error">
    </el-alert>
    <codemirror :code="data"
                :options="editorOptions"
                ref="codeMirror"
                placeholder="描述资源meta信息的JSON数据"
                style="height: 500px"
                @change="onCodeChange">
    </codemirror>

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

