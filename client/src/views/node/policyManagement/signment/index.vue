<template>
  <section>
    <presentable-steps :active="0"></presentable-steps>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(formatData, indexOuter) in tabData" key=""  :label="formatData.resourceName" :name="formatData.resourceName">
        <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item :title=" 'policy'+ indexInner" :name=" 'policy'+ indexInner" v-for="(transition,indexInner) in formatData.formatData" key="">
                <b>{{transition.users}}</b>:
                <collapseState v-bind:stateMachine="transition"></collapseState>
                <el-button :class="{'child': true, redColor:btnStates[indexOuter][indexInner]}" v-on:click="select(transition.segmentId, transition.serialNumber, indexOuter, indexInner,$event)">选中</el-button>
              </el-collapse-item>
            </el-collapse>
      </el-tab-pane>
      <el-button class="child" @click="submit" >提交</el-button>
    </el-tabs>
  </section>
</template>

<script>
  import NodePolicySignment from './index'
  export default NodePolicySignment
</script>

<style lang="less" scoped>
.child {
  display: table; /* 给一个自适应的宽度，本质还是占着一行，就像 block */
  margin: 0 auto;
}
.redColor {
  color: red
}
</style>
