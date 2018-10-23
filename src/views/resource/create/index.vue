<template>
  <section class="create-resource-wrapper">
    <div class="bd">
      <base-resource-creator :data="resourceDetail" ref="inputArea"></base-resource-creator>
    </div>
    <div class="ft">
      <div class="btm-wrap clearfix">
        <div class="rt-side">
          <el-button class="ft-btn gray-btn" type="text" @click="create2QuitHandler">完成并退出</el-button>
          <el-button class="ft-btn deep-color-btn" type="primary" round @click="create2AddHandler">
            完成并添加授权
          </el-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Creator from './index'

export default Creator
</script>

<style lang="less" scoped>
  @import "index.less";
  @import "../../../styles/footer.less";
</style>
