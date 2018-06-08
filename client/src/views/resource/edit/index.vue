<template>
  <section class="resource-detail-edit-wrap">
    <resource-inputs :data="resourceDetail" ref="inputArea"></resource-inputs>
    <div class="ft clearfix">
      <div class="rt-side">
        <el-button class="ft-btn deep-color-btn" type="text" @click="updateResourceHandler">更新资源</el-button>
      </div>
    </div>
  </section>
</template>

<script>
  import ResourceDetail from './index'

  export default ResourceDetail
</script>

<style lang="less" scoped>
  @import "index.less";
  @import "../../../styles/footer.less";
</style>
