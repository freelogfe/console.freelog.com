<template>
  <section>
    <!--<el-autocomplete-->
      <!--v-model="query"-->
      <!--:fetch-suggestions="querySearchAsync"-->
      <!--placeholder="请输入内容"-->
      <!--@select="handleSelectSearchItem"-->
    <!--&gt;</el-autocomplete>-->

    <el-input placeholder="请输入搜索内容" v-model="query" class="query-input">
      <el-button slot="append" icon="el-icon-search" type="primary" @click="queryHandler"></el-button>
    </el-input>

    <table-view class="resource-list" :loader="loader()">
      <el-table-column
        prop="resourceName"
        label="resource name">
      </el-table-column>
      <el-table-column
        prop="resourceType"
        align="center"
        label="resource type">
      </el-table-column>
      <el-table-column
        prop="resourceId"
        label="resourceId"
        align="center"
        width="350px">
      </el-table-column>
      <el-table-column
        align="center"
        width="150px"
        label="create date">
        <template slot-scope="scope">
          {{scope.row.createDate | fmtDate}}
        </template>
      </el-table-column>
      <el-table-column
        label="resource URL">
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
            @click="handleContact(scope.row)">去创建presentable</el-button>
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
