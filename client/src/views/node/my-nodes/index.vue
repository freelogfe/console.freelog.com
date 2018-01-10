<template>
  <section>
    <div class="node-top-sec">
      <el-button type="primary"><router-link class="route-link" to="/node/create">创建新节点</router-link></el-button>
    </div>
    <table-view class="node-list" :loader="loader()">
      <el-table-column
        prop="nodeName"
        label="node name">
      </el-table-column>
      <el-table-column
        label="node domain">
        <template slot-scope="scope">
          {{scope.row.nodeDomain}}.freelog.com
        </template>
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
            @click="gotoNodeHandler(scope.row)">进入节点
          </el-button>
          <el-button
            size="small"
            @click="handleEdit(scope.row)">详情
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
  .node-top-sec {
    margin-bottom: 15px;
  }

  .route-link {
    color: white
  }

  .node-list {
    width: 100%;
    min-height: 600px;
  }
</style>
