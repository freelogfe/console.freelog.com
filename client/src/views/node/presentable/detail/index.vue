<template>
  <section>
    <ul class="p-detail">
      <li><label>resource name</label><span>{{detail.tagInfo.resourceInfo.resourceName}}</span></li>
      <li><label>contract Id</label><span>{{detail.contractId}}</span></li>
      <li><label>presentable Id</label><span>{{detail.presentableId}}</span></li>
      <li><label>resource Id</label><span>{{detail.resourceId}}</span></li>
      <li><label>resource type</label><span>{{detail.tagInfo.resourceInfo.resourceType}}</span></li>
      <li><label>create date</label><span>{{detail.createDate | fmtDate}}</span></li>
    </ul>
    <el-form :model="detail" ref="detail" label-width="150px">
      <el-form-item label="name" prop="name">
        <el-input v-model="detail.name"></el-input>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="primary" @click="updateDetail('detail')">保存</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
  import PresentableDetail from './index'

  export default PresentableDetail
</script>

<style lang="less" scoped>
.p-detail {
  li {
    margin-bottom: 12px;
  }

  span {
    border-bottom: 1px solid #eee;
  }

  label {
    color: #48576a;
    display: inline-block;
    width: 150px;
    padding-right: 12px;
    box-sizing: border-box;
    text-align: right;
  }
}
</style>
