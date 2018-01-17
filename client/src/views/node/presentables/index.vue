<template>
  <section>
    <el-input placeholder="请输入搜索内容" v-model="query" class="query-input">
      <el-button slot="append" icon="el-icon-search" type="primary" @click="queryHandler"></el-button>
    </el-input>
    <table-view class="resource-list" :loader="loader()" :formatHandler="formatHandler">
      <el-table-column
        align="center"
        label="presentable name">
        <template slot-scope="scope">
          <span v-if="scope.row.presentableDetail">{{ scope.row.presentableDetail.name}}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="resourceDetail.resourceName"
        label="资源名称">
      </el-table-column>
      <el-table-column
        prop="resourceDetail.resourceType"
        label="资源类型"
        align="center"
        width="150px">
      </el-table-column>
      <el-table-column
        align="center"
        label="presentable创建日期">
        <template slot-scope="scope">
          <span>{{ scope.row.createDate | fmtDate}}</span>
        </template>
      </el-table-column>

      <!--for test-->
      <el-table-column
        prop="contractId"
        align="center"
        label="合同 ID">
      </el-table-column>
      <el-table-column
        prop="resourceId"
        label="resourceId"
        align="center"
        width="350px">
      </el-table-column>
      <!--for test-->

      <el-table-column
        prop="status"
        align="center"
        width="120px"
        label="合同状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row._statusInfo.type">{{scope.row._statusInfo.text}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="" width="250px">
        <template slot-scope="scope">
          <el-button
            size="small"
            class="action-btn"
            @click="handlePresentable(scope.row,'detail')">查看详情
          </el-button>
          <el-button
            size="small"
            class="action-btn"
            @click="handlePresentable(scope.row, 'edit')" v-if="!scope.row.presentableDetail">去创建user
            policy
          </el-button>
          <el-button
            size="small"
            class="action-btn"
            @click="handlePresentable(scope.row, 'execContract')"
            v-if="scope.row.status===1 || scope.row.status===2">去执行合同
          </el-button>
        </template>
      </el-table-column>
    </table-view>
  </section>
</template>

<script>
  import Presentables from './index'

  export default Presentables
</script>

<style lang="less" scoped>
  .action-btn {
    margin-bottom: 6px;
    margin-left: 0;
  }
  .query-input {
    margin-bottom: 15px;
    width: 50%;
  }

  .presentable-detail-expand {
    font-size: 0;
  }

  .presentable-detail-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .presentable-detail-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .resource-list {
    width: 100%;
    min-height: 600px;
  }
</style>
