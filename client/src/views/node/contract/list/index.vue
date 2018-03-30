<template>
  <section>
    <el-input placeholder="请输入搜索内容" v-model="query" class="query-input">
      <el-button slot="append" icon="search" type="primary" @click="queryHandler"></el-button>
    </el-input>

    <table-view class="contracts-list" :loader="loader()">
      <el-table-column
        label="资源名称">
        <template slot-scope="scope">
          {{scope.row.resourceDetail.resourceName}}
          <span v-if="scope.row.resourceDetail.systemMeta.version"
                class="widget-version">v {{scope.row.resourceDetail.systemMeta.version}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="contractId"
        label="合同ID">
      </el-table-column>
      <el-table-column
        prop="resourceId"
        label="资源ID">
      </el-table-column>
      <el-table-column
        align="center"
        label="资源作者">
        <template slot-scope="scope">
          <span v-if="scope.row.partyOneInfo">{{scope.row.partyOneInfo.nickname}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="创建时间">
        <template slot-scope="scope">
          {{scope.row.createDate | fmtDate}}
        </template>
      </el-table-column>

      <el-table-column
        width="120px"
        align="center"
        prop="resourceDetail.resourceType"
        label="资源类型">
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="合同状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.statusInfo.type">{{scope.row.statusInfo.desc}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="250px"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="previewHandler(scope.row)">查看详情</el-button>
          <el-button
            size="small"
            @click="handlePresentable(scope.row)">{{scope.row.presentableDetail?'查看presentable': '创建user policy'}}</el-button>
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
