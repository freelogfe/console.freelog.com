<template>
  <section class="resource-detail">
    <resource-detail-info :data="detail">
      <el-form-item label="依赖widgets" v-if="detail.systemMeta && detail.systemMeta.widgets">
        <a :href="widget.detailUrl" class="link"
           target="_blank"
           v-for="widget in detail.systemMeta.widgets" :key="widget.resourceId">
          <el-tag>{{widget.resourceName}}</el-tag>
        </a>
      </el-form-item>
      <el-form-item style="margin-top: 20px">
        <el-button @click="bakcToList()">返回</el-button>
        <el-button type="primary" @click="gotoCreateContract(detail)">去创建presentable</el-button>
      </el-form-item>
    </resource-detail-info>
  </section>
</template>

<script>
  import ResourceDetail from './index'

  export default ResourceDetail
</script>

<style lang="less" scoped>
  .link {
    margin-right: 9px;
  }
</style>
