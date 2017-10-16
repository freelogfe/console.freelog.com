<template>
  <section>
      <el-collapse v-model="activeNames" @change="handleChange">

        <el-collapse-item :title=" 'policy'+ index" :name=" 'policy'+ index" v-for="(transition,index) in format" >
          <b>{{transition.users}}</b>:

          <collapseState v-bind:stateMachine="transition"></collapseState>
          <el-button class="child" v-on:click="sign(transition.segmentId, serialNumber)">签约</el-button>

        </el-collapse-item>

      </el-collapse>
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
</style>
