<template>
  <section>
    <table-view class="resource-list" :loader="loader()" :showPagination="false">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="presentable-detail-expand">
            <el-form-item label="resourceId">
              <span>{{ props.row.resourceId }}</span>
            </el-form-item>
            <el-form-item label="contractId">
              <span>{{ props.row.contractId }}</span>
            </el-form-item>
            <el-form-item label="create date">
              <span>{{ props.row.createDate | fmtDate}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="presentable name">
      </el-table-column>
      <el-table-column
        prop="tagInfo.resourceInfo.resourceName"
        label="resource name">
      </el-table-column>
      <el-table-column
        prop="tagInfo.resourceInfo.resourceType"
        label="resource type"
      width="200px">
      </el-table-column>
      <el-table-column
        prop="presentableId"
        align="center"
        label="presentableId">
      </el-table-column>
      <el-table-column label="" align="center" width="270px">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="handlePreview(scope.row)">查看详情</el-button>
          <el-button
            size="small"
            @click="handleEdit(scope.row)">查看user policy</el-button>
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
