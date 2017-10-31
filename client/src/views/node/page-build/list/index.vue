<template>
  <section>
    <table-view class="resource-list" :loader="loader()" :showPagination="false">
      <el-table-column
        prop="resourceDetail.resourceName"
        label="resourceName">
      </el-table-column>
      <el-table-column
        prop="status"
        label="status">
      </el-table-column>
      <el-table-column
        prop="resourceId"
        label="resourceId">
      </el-table-column>
      <el-table-column
        label="resourceUrl">
        <template slot-scope="scope">
          <a :href="scope.row.resourceDetail.resourceUrl" target="_blank">资源链接</a>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="handlePreview(scope.row)">查看详情</el-button>
          <el-button
            size="small"
            @click="setDefaultPageBuildHandler(scope.row)">设为默认</el-button>
          <el-button
            size="small"
            @click="setDefaultPageBuildHandler(scope.row, 2)">设为隐藏</el-button>
        </template>
      </el-table-column>
    </table-view>
  </section>
</template>

<script>
  import ResourceList from './index'

  export default ResourceList
</script>

<style lang="less" scoped>
.resource-list {
  width: 100%;
  min-height: 600px;
}
</style>
