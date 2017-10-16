<template>
  <section>
      <el-row :gutter="40" v-for="transition in format">
        <hr>
          <el-col :span="8">
            【{{transition.currentState}}】
          </el-col>
          <br>
          <el-col :span="8" >
          【{{transition.event}}】
          </el-col>
          <el-col :span="8">
          【{{transition.nextState}}】
          </el-col>
      </el-row>

  </section>
</template>

<script>
  import NodePolicySignment from './index'
  export default NodePolicySignment
</script>

<style lang="less" scoped>

</style>
