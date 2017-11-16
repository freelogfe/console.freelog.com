<template>
  <section>
    <table-view class="resource-list" :loader="loader()" :showPagination="false">
      <el-table-column
        prop="presentableId"
        label="presentableId（presentableId）">
      </el-table-column>
      <el-table-column
        prop="name"
        label="presentable 名称（name）">
      </el-table-column>
      <el-table-column
        prop="resourceId"
        label="资源id（resourceId）">
      </el-table-column>
      <el-table-column
        prop="contractId"
        label="合同id（contractId）">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="handlePreview(scope.row)">查看详情</el-button>
          <el-button
            size="small"
            @click="handleEdit(scope.row)">编辑</el-button>
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
