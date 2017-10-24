<template>
  <section>
    <!--<el-autocomplete-->
      <!--v-model="query"-->
      <!--:fetch-suggestions="querySearchAsync"-->
      <!--placeholder="请输入内容"-->
      <!--@select="handleSelectSearchItem"-->
    <!--&gt;</el-autocomplete>-->

    <el-input placeholder="请输入搜索内容" v-model="query" class="query-input">
      <el-button slot="append" icon="search" type="primary" @click="queryHandler"></el-button>
    </el-input>

    <table-view class="resource-list" :loader="loader()">
      <el-table-column
        prop="resourceName"
        label="resourceName">
      </el-table-column>
      <el-table-column
        prop="resourceType"
        label="resourceType">
      </el-table-column>
      <el-table-column
        prop="policyId"
        label="policyId">
      </el-table-column>
      <el-table-column
        label="resourceUrl">
        <template slot-scope="scope">
          <a :href="scope.row.resourceUrl" target="_blank">资源链接</a>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="previewResourceHandler(scope.row)">查看详情</el-button>
          <el-button
            size="small"
            @click="handleContract(scope.row)">去创建合同</el-button>
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
