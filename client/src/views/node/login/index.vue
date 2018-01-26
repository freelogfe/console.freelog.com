<template>
  <section class="node-login-container">
    <el-alert
      title="请选择一个节点作为登录节点"
      style="margin-bottom: 15px"
      type="warning">
    </el-alert>

    <table-view class="node-list" :loader="loader()">
      <el-table-column
        prop="nodeName"
        label="node name">
      </el-table-column>
      <el-table-column
        prop="nodeId"
        label="node Id">
      </el-table-column>
      <el-table-column
        label="status">
        <template slot-scope="scope">
          <el-tag :type="NODE_STATUS[scope.row.status].type">{{NODE_STATUS[scope.row.status].text}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="gotoNodeHandler(scope.row)">进入该节点
          </el-button>
        </template>
      </el-table-column>
    </table-view>
  </section>
</template>

<script>
  import NodeLogin from './index'

  export default NodeLogin
</script>

<style lang="less" scoped>

</style>
