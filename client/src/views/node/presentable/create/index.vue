<template>
  <section>
    <h3 style="margin-bottom: 20px;" v-if="formData.resource">> {{formData.resource.resourceName}}</h3>

    <presentable-creator :formData.sync="formData"></presentable-creator>

    <div class="form-ft">
      <el-button @click="submit">提交</el-button>
    </div>
  </section>
</template>

<script>
  import NodePresentableCreator from './index'

  export default NodePresentableCreator
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
