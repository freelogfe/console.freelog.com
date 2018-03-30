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
        label="presentable ID">
      </el-table-column>
      <el-table-column
        prop="resourceId"
        width="350px"
        label="资源ID">
      </el-table-column>
      <el-table-column
        width="120px"
        label="创建时间">
        <template slot-scope="scope">
          {{scope.row.createDate|fmtDate}}
        </template>
      </el-table-column>
      <el-table-column
      width="350px"
        label="签约信息">
        <template slot-scope="scope">
          <div style="line-height: 30px;">全部插件数量: {{scope.row.pbStatics.widgetsCount}}</div>
          <div style="line-height: 30px;">已关联插件数: <span style="color:red" v-if="scope.row.pbStatics.widgetContractCount != scope.row.pbStatics.widgetsCount"> {{scope.row.pbStatics.widgetContractCount}}
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-triangle"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12" y2="17"></line></svg></span><span  style="color:#45b745" v-if="scope.row.pbStatics.widgetContractCount == scope.row.pbStatics.widgetsCount"> {{scope.row.pbStatics.widgetContractCount}}
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg></span></div>
          <div style="line-height: 30px;">已关联插件激活比: <span style="color:red" v-if="scope.row.pbStatics.widgetContractActivatedCount != scope.row.pbStatics.widgetContractCount">{{scope.row.pbStatics.widgetContractActivatedCount}}-{{scope.row.pbStatics.widgetContractCount}}
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-triangle"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12" y2="17"></line></svg></span><span style="color:#45b745" v-if="scope.row.pbStatics.widgetContractActivatedCount == scope.row.pbStatics.widgetContractCount"> {{scope.row.pbStatics.widgetContractActivatedCount}}-{{scope.row.pbStatics.widgetContractCount}}
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg></span></div>
          <div style="line-height: 30px;">已关联插件创建presentable数: <span style="color:red" v-if="scope.row.pbStatics.widgetPresentableCount != scope.row.pbStatics.widgetsCount"> {{scope.row.pbStatics.widgetPresentableCount}}
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-triangle"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12" y2="17"></line></svg></span><span style="color:#45b745" v-if="scope.row.pbStatics.widgetPresentableCount == scope.row.pbStatics.widgetsCount"> {{scope.row.pbStatics.widgetPresentableCount}}
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg></span></div>

        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        label="展示状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.statusInfo.type">{{scope.row.statusInfo.desc}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220px">
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
