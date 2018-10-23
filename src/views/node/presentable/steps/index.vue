<template>
  <div class="presentable-steps">
    <el-steps :space="300"
              :active="active"
              :process-status="processStatus"
              :finish-status="finishStatus"
              align-center>
      <el-step title="创建合同" description="与资源作者签订资源使用策略"></el-step>
      <el-step title="创建user policy" description="制定用户查看Presentable的策略"></el-step>
      <el-step title="完成" description="成功创建Presentable"></el-step>
    </el-steps>
  </div>
</template>

<script>
import PresentableSteps from './index'

export default PresentableSteps
</script>

<style lang="less" scoped>
 .presentable-steps {
   position: relative;
   left: 50%;
   transform: translate(-25%,0);

   text-align: center;
   margin-bottom: 15px;
 }
</style>
