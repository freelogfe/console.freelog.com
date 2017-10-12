<template>
  <div class="table-view-wrapper">
    <el-table
      class="table"
      :data="data"
      border>
      <slot></slot>
    </el-table>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>

<script>
  import TableView from './index'
  export default TableView
</script>

<style lang="less" scoped>
.table-view-wrapper {
  .table {
    max-height: 100%;
  }

  .pagination {
    margin-top: 15px;
    text-align: center;
  }
}
</style>
