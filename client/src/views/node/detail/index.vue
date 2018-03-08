<template>
  <section class="node-form-container">
    <el-form label-position="right" label-width="100px"
             :model="detail" :rules="rules" ref="detail"
             class="small-el-form">
      <el-form-item label="节点名称" class="flex-grid" prop="nodeName">
        {{detail.nodeName}}
      </el-form-item>
      <el-form-item label="节点域名">
        {{detail.nodeDomain}}.freelog.com
      </el-form-item>
      <el-form-item label="节点ID">
        {{detail.nodeId}}
      </el-form-item>
      <el-form-item label="节点状态" v-if="detail.statusInfo">
        <el-tag :type="detail.statusInfo.type">{{detail.statusInfo.text}}</el-tag>
      </el-form-item>
      <el-form-item label="创建时间">
        {{detail.createDate | fmtDate}}
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="primary" @click="updateNodeDetail('detail')">保存</el-button>
        <el-button @click="backToList()">返回</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
  import NodeDetail from './index'

  export default NodeDetail
</script>

<style lang="less" scoped>

</style>
