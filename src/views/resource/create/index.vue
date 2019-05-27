<template>
  <section class="create-resource-wrapper">
    <div class="bd">
      <resource-input :data="resourceDetail" ref="inputArea">
        <div class="btm-wrap clearfix">
          <div class="rt-side">
            <el-button class="ft-btn" style="color: #999999;" @click="cancelHandler" type="text">取消创建</el-button>
            <el-button class="ft-btn" type="primary" round @click="create2AddHandler">
              完成并添加授权
            </el-button>
          </div>
        </div>
      </resource-input>
    </div>
  </section>
</template>

<script>
import Creator from './index';
export default Creator;
</script>

<style lang="less" scoped>
  @import "index.less";
  @import "../../../styles/footer.less";
</style>
