<template>
  <section>
    <el-input placeholder="请输入搜索内容" v-model="query" class="query-input" @keyup.enter.native="queryHandler" @keydown.native="autoQueryHandler">
      <el-button slot="append" icon="el-icon-search" type="primary" @click="queryHandler"></el-button>
    </el-input>

    <table-view class="resource-list" ref="resourceList" :loader="loader()">
      <el-table-column
        label="资源名称">
        <template slot-scope="scope">
          {{scope.row.resourceName}}
          <span v-if="scope.row.systemMeta.version"
                class="widget-version">v {{scope.row.systemMeta.version}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="resourceType"
        align="center"
        label="资源类型">
      </el-table-column>
      <el-table-column
        prop="resourceId"
        label="资源ID"
        align="center"
        width="350px">
      </el-table-column>
      <el-table-column
        align="center"
        width="150px"
        label="创建日期">
        <template slot-scope="scope">
          {{scope.row.createDate | fmtDate}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="资源链接">
        <template slot-scope="scope">
          <a :href="scope.row.resourceUrl" target="_blank">资源链接</a>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot-scope="scope">
          <el-dropdown size="small" split-button type="primary"
                       @command="handleCommand"
                       @click="viewSrcDetail(scope.row)">
            查看详情
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{fn:'handleContact',data: scope.row}">创建presentable</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
  .widget-version {
    background-color: #e77334;
    color: white;
    padding: 0 5px;
    border-radius: 3px;
    border: 1px solid #cc5819;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    display: inline-block;
  }

  .query-input {
    margin-bottom: 15px;
    width: 50%;
  }

  .resource-list {
    width: 100%;
    min-height: 600px;
  }
</style>
