<template>
  <section class="meta-editor-wrap">
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
  </section>
</template>

<script>
  import ResourceMetaInfo from './index'

  export default ResourceMetaInfo
</script>

<style lang="less">

</style>

