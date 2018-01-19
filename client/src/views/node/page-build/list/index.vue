<template>
  <section>
    <el-table
      class="resource-list"
      :data="pagebuildList"
      stripe
      border>
      <el-table-column
        prop="presentableName"
        label="presentable名称">
      </el-table-column>
      <el-table-column
        prop="resourceDetail.resourceName"
        label="资源名称">
      </el-table-column>
      <el-table-column
        prop="presentableId"
        width="220px"
        label="presentableId(for test)">
      </el-table-column>
      <el-table-column
        prop="resourceId"
        width="350px"
        label="资源id(for test)">
      </el-table-column>
      <el-table-column
        width="120px"
        label="创建时间">
        <template slot-scope="scope">
          {{scope.row.createDate|fmtDate}}
        </template>
      </el-table-column>
      <el-table-column
        label="资源链接（for test）">
        <template slot-scope="scope">
          <a :href="scope.row.resourceDetail.resourceUrl" target="_blank">资源链接</a>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        label="展示状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.statusInfo.type">{{scope.row.statusInfo.desc}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="handlePreview(scope.row)">查看详情
          </el-button>
          <el-button
            size="small"
            @click="setDefaultPageBuildHandler(scope.row)" type="primary" v-show="scope.row.status==2">设为展示
          </el-button>
          <el-button
            size="small"
            @click="setDefaultPageBuildHandler(scope.row, 2)" type="warning" v-show="scope.row.status==1">设为隐藏
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
