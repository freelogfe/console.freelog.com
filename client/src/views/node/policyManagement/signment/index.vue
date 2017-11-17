<template>
  <section>
    <presentable-steps :active="0"></presentable-steps>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(formatData, indexOuter) in tabData" key=""  :label="formatData.resourceName" :name="formatData.resourceName">
        <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item :title=" '合同方案'+ (indexInner + 1)" :name=" 'policy'+ indexInner" v-for="(transition,indexInner) in formatData.formatData" key="">
                <b>{{transition.users}}</b>:
                <collapseState v-bind:stateMachine="transition"></collapseState>
                <div class="btn-wrap">
                  <el-button :class="{redColor:btnStates[indexOuter][indexInner]}" v-on:click="select(transition.segmentId, transition.serialNumber, indexOuter, indexInner,$event)">选中</el-button>
                </div>
              </el-collapse-item>
            </el-collapse>
      </el-tab-pane>
      <div class="form-ft">
        <el-button @click="submit" >提交</el-button>
      </div>
    </el-tabs>
  </section>
</template>

<script>
  import NodePolicySignment from './index'
  export default NodePolicySignment
</script>

<style lang="less" scoped>
  .form-ft,
  .btn-wrap{
    text-align: center;
    margin-top: 15px;
  }

.redColor {
  color: red
}
</style>
