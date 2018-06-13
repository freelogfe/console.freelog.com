<template>
  <section class="my-resources">
    <h3 class="title">我的资源库</h3>
    <div class="body-content">
      <el-tabs tab-position="top" v-model="curTabName">
        <!--<el-tab-pane label="已获取资源" name="signed">-->
          <!--<lazy-component>-->
            <!--<resource-items type="signed"></resource-items>-->
          <!--</lazy-component>-->
        <!--</el-tab-pane>-->
        <el-tab-pane label="自制资源" name="self">
          <lazy-component>
            <resource-items type="self"></resource-items>
          </lazy-component>
        </el-tab-pane>
        <el-tab-pane label="收藏资源" name="favor">
          <lazy-component>
            <resource-items type="favor"></resource-items>
          </lazy-component>
        </el-tab-pane>
      </el-tabs>
      <div class="right-tool-bar-wrap">
        <ul class="tool-bars">
          <li class="tool-item">
            <search-input></search-input>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
  import ResourceList from './index'

  export default ResourceList
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
