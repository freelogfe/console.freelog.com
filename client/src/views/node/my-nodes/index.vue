<template>
  <section>
    <table-view class="resource-list" :loader="loader()">
      <el-table-column
        prop="nodeName"
        label="nodeName">
      </el-table-column>
      <el-table-column
        prop="nodeDomain"
        label="nodeDomain">
      </el-table-column>
      <el-table-column
        prop="nodeId"
        label="nodeId">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="gotoNodeHandler(scope.row)">进入节点
          </el-button>
          <el-button
            size="small"
            @click="handleEdit(scope.row)">编辑
          </el-button>
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
