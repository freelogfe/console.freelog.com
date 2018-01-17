<template>
  <section class="resource-detail">
    <el-form label-position="right" class="small-el-form" label-width="100px">
      <el-form-item label="资源ID">
        {{detail.resourceId}}
      </el-form-item>
      <el-form-item label="资源名称">
        {{detail.resourceName}}
      </el-form-item>
      <el-form-item label="资源类型">
        {{detail.resourceType}}
      </el-form-item>
      <el-form-item label="资源链接">
        {{detail.resourceUrl}}
      </el-form-item>
      <el-form-item label="资源状态">
        {{detail.status}}
      </el-form-item>
      <el-form-item label="资源作者">
        {{detail.userId}}
      </el-form-item>
      <el-form-item label="创建时间">
        {{detail.createDate|fmtDate}}
      </el-form-item>
      <el-form-item>
        <el-button @click="bakcToList()">返回</el-button>
        <el-button type="primary" @click="gotoCreateContract(detail)">去创建presentable</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
  import ResourceDetail from './index'

  export default ResourceDetail
</script>

<style lang="less" scoped>

</style>
