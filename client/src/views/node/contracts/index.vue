<template>
  <section>
    <el-input placeholder="请输入搜索内容" v-model="query" class="query-input">
      <el-button slot="append" icon="search" type="primary" @click="queryHandler"></el-button>
    </el-input>

    <table-view class="contracts-list" :loader="loader()">
      <el-table-column
        prop="contractId"
        label="contractId">
      </el-table-column>
      <el-table-column
        prop="resourceId"
        label="resourceId">
      </el-table-column>
      <el-table-column
        prop="partyOne"
        label="partyOne">
      </el-table-column>
      <el-table-column
        prop="status"
        label="status">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="previewHandler(scope.row)">查看详情</el-button>
          <el-button
            size="small"
            @click="handlePresentable(scope.row)">去创建presentable</el-button>
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
  .query-input {
    margin-bottom: 15px;
    width: 50%;
  }

.resource-list {
  width: 100%;
  min-height: 600px;
}
</style>
