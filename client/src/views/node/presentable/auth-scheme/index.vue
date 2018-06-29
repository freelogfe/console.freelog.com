<template>
  <div class="presentable-auth-scheme-wrap">
    <resource-scheme-tree
      :contracts="presentableDetail.resourceInfo.contracts"
      :resource="presentableDetail.resourceInfo"
      class="presentable-auth-scheme-tree"
      ref="schemeTree"></resource-scheme-tree>
    <div class="ft clearfix">
      <div class="rt-side">
        <el-button class="ft-btn deep-color-btn" type="primary" round @click="saveSchemeHandler">
          {{isInitStatus?'生成合约':'更新合约'}}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import PresentableSchemeDetail from './index'

  export default PresentableSchemeDetail
</script>

<style lang="less" scoped>
  @import "../../../../styles/footer.less";
  @import "index.less";
</style>

<style lang="less">
  .presentable-auth-scheme-wrap {

  .presentable-auth-scheme-tree {

  .auth-scheme-list-wrap:first-child {
    background: white;
  }

  }
  }

</style>
