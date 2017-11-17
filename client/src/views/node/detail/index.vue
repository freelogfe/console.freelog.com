<template>
  <section class="node-form-container">
    <div class="node-form">
      <ul class="node-detail">
        <li><label>node domain </label>:<span>{{detail.nodeDomain}}.freelog.com</span></li>
        <li><label>node ID </label>:<span>{{detail.nodeId}}</span></li>
        <li><label>create date </label>:<span>{{(new Date(detail.createDate)).toLocaleDateString()}}</span></li>
      </ul>
      <el-form :model="detail" :rules="rules" ref="detail" label-width="100px">
        <el-form-item label="nodeName" prop="nodeName">
          <el-input v-model="detail.nodeName"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="updateNodeDetail('detail')">保存</el-button>
          <el-button @click="backToList()">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
  import NodeDetail from './index'

  export default NodeDetail
</script>

<style lang="less" scoped>
  .node-detail {
    label {
      width: 100px;
      display: inline-block;
    }
    span {
      padding-left: 9px;
    }

    li {
      border-bottom: 1px solid #eee;
      margin-bottom: 12px;
      padding-bottom: 3px;
    }
  }

  .node-form {
    width: 600px;
    margin: auto;
  }

</style>
