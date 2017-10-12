<template>
  <section>
    <table-view class="resource-list" :data="resourceList">
      <el-table-column
        prop="resourceName"
        label="resourceName">
      </el-table-column>
      <el-table-column
        prop="resourceType"
        label="resourceType">
      </el-table-column>
      <el-table-column
        label="resourceUrl">
        <template scope="scope">
          <a :href="scope.row.resourceUrl" target="_blank">资源链接</a>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="small"
            @click="handlePolicy(scope.row)">policy</el-button>
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
  height: 600px;
}
</style>
