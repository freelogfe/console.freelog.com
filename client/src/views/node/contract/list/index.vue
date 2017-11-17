<template>
  <section>
    <el-input placeholder="请输入搜索内容" v-model="query" class="query-input">
      <el-button slot="append" icon="search" type="primary" @click="queryHandler"></el-button>
    </el-input>
    <table-view class="contracts-list" :loader="loader()">
      <el-table-column
        prop="resourceDetail.resourceName"
        label="资源名称">
      </el-table-column>
      <el-table-column
        prop="contractId"
        align="center"
        label="合同 ID">
      </el-table-column>
      <el-table-column
        prop="resourceId"
        label="资源 ID"
        align="center"
        width="350px">
      </el-table-column>
      <el-table-column
        prop="resourceDetail.resourceType"
        align="center"
        label="资源类型">
      </el-table-column>
      <el-table-column
        prop="status"
        align="center"
        width="120px"
        label="合同状态">
        <template slot-scope="scope">
          <div v-if="scope.row.status==0">测试状态</div>
          <div v-if="scope.row.status==1">未开始执行</div>
          <div v-if="scope.row.status==2">执行中</div>
          <div v-if="scope.row.status==3">生效中</div>
          <div v-if="scope.row.status==4">用户终止</div>
          <div v-if="scope.row.status==4">系统终止</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250px">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="previewHandler(scope.row)">查看详情</el-button>
          <el-button
            size="small"
            @click="handlePresentable(scope.row)" v-show="!scope.row.presentableDetail">去创建user policy</el-button>
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
