<template>
  <section>
    <div class="resource-top-sec">
      <el-button type="primary">
        <router-link class="route-link" to="/resource/create">创建新资源</router-link>
      </el-button>
    </div>
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
        label="resource ID"
        width="350px">
      </el-table-column>
      <el-table-column
        prop="resourceType"
        label="resource status"
        align="center"
        width="150px">
        <template slot-scope="scope">
          <el-tag :type="RESOURCE_STATUS[scope.row.status].type">{{RESOURCE_STATUS[scope.row.status].text}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="resource URL">
        <template slot-scope="scope">
          <a :href="scope.row.resourceUrl" target="_blank">资源链接</a>
        </template>
      </el-table-column>
      <el-table-column
        label=""
        align="center"
        width="200px">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.row)">详情
          </el-button>
          <el-button
            size="small"
            v-show="scope.row.status === 1"
            @click="handlePolicy(scope.row)">创建policy
          </el-button>
          <el-button
            size="small"
            v-show="scope.row.status === 2"
            @click="handlePolicy(scope.row)">修改policy
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
  .resource-top-sec {
    margin-bottom: 15px;
  }

  .route-link {
    color: white;
  }

  .resource-list {
    width: 100%;
    min-height: 600px;
  }
</style>
