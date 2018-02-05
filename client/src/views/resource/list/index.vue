<template>
  <section>
    <div class="resource-top-sec">
      <router-link class="route-link" to="/resource/create">
        <el-button type="primary">创建新资源</el-button>
      </router-link>
    </div>
    <table-view class="resource-list" :loader="loader()">
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
        width="350px">
      </el-table-column>
      <el-table-column
        prop="resourceType"
        label="资源状态"
        align="center"
        width="150px">
        <template slot-scope="scope">
          <el-tag :type="RESOURCE_STATUS[scope.row.status].type">{{RESOURCE_STATUS[scope.row.status].desc}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        width="150px">
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
  .widget-version {
    background-color: #e77334;
    color: white;
    padding: 0 5px;
    border-radius: 3px;
    border: 1px solid #cc5819;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
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
