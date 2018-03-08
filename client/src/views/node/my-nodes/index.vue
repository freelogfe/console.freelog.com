<template>
  <section>
    <div class="node-top-sec">
      <router-link class="route-link" to="/node/create">
        <el-button type="primary">创建新节点</el-button>
      </router-link>
    </div>
    <table-view class="node-list" :loader="loader()">
      <el-table-column
        prop="nodeName"
        label="节点名">
      </el-table-column>
      <el-table-column
        label="节点地址">
        <template slot-scope="scope">
          {{resolveDomain(scope.row)}}
          <clip-board
            style="display: inline-block"
            @copyDone="copyDoneHandler"
            :value="resolveDomain(scope.row)">
            <a href="javascript:;">
              <i class="el-icon-fa-clipboard"></i>
            </a>
          </clip-board>
        </template>
      </el-table-column>
      <el-table-column
        prop="nodeId"
        label="节点ID">
      </el-table-column>
      <el-table-column
        label="节点状态">
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
