<template>
  <section class="resource-detail">
    <ul>
      <li class="detail-item">
        <label class="detail-name">resourceId :</label><span>{{detail.resourceId}}</span>
      </li>
      <li class="detail-item">
        <label class="detail-name">resource name :</label><span>{{detail.resourceName}}</span>
      </li>
      <li class="detail-item">
        <label class="detail-name">resource url :</label><span>{{detail.resourceUrl}}</span>
      </li>
      <li class="detail-item">
        <label class="detail-name">resource type :</label><span>{{detail.resourceType}}</span>
      </li>
      <li class="detail-item">
        <label class="detail-name">resource mime type :</label><span>{{detail.mimeType}}</span>
      </li>
      <li class="detail-item">
        <label class="detail-name">create date :</label><span>{{detail.createDate | fmtDate}}</span>
      </li>
    </ul>
    <div class="btns">
      <el-button @click="bakcToList()">返回</el-button>
      <el-button type="primary" @click="gotoCreateContract(detail)">去创建presentable</el-button>
    </div>
  </section>
</template>

<script>
  import ResourceDetail from './index'

  export default ResourceDetail
</script>

<style lang="less" scoped>
  .detail-item {
    line-height: 30px;
  }

  .resource-detail {
    width: 80%;
    margin: auto;
  }

  .btns {
    text-align: center;
  }

  .detail-name {
    width: 160px;
    display: inline-block;
    text-align: right;
    margin-right: 15px;
  }
</style>
