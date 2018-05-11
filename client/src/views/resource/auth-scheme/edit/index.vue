<template>
  <section class="auth-scheme-editor-wrap">
    <div class="top-tab-wrap">
      <!--@tab-remove="removeTab" -->
      <el-tabs v-model="curTabName" type="card" @tab-click="clickTab" class="scheme-nav-tabs">
        <el-tab-pane
          v-for="(item, index) in tabs"
          :key="index"
          :name="item.name">
          <span slot="label">
            <i class="el-icon-circle-check-outline" :class="{published: item.data.isPublished}"></i>
            <el-button class="auth-name" type="text">
            <input type="text"
                   class="input-auth-name"
                   v-model="item.data.scheme.authSchemeName"
                   @keydown = "inputDownHandler"
                   @keyup.enter="handleInputConfirm">
          </el-button>
          </span>
          <component :is="item.content"
                     @change="changeDepsHandler"
                     :detail="item.data"
                     :updateCallback="updateData"></component>
        </el-tab-pane>
        <el-tab-pane name="createTab">
          <span slot="label" class="add-new-scheme-tab-btn"><i class="el-icon-plus"></i>添加新授权方案</span>
        </el-tab-pane>
      </el-tabs>
    </div>


    <div class="ft">
      <div class="error-tip-wrap" v-show="showErrorTip">已发授权方案授权方式不可更改，只可更新授权策略。更新前签约的合同执行原授权策略</div>
      <div class="btm-wrap clearfix">
        <div class="lf-side">
          <el-button class="ft-btn gray-btn"
                     type="text"
                     @click="backToResourceInfoHandler"><i class="el-icon-back"></i> 返回资源基础信息
          </el-button>
        </div>

        <div class="rt-side">
          <el-button class="ft-btn gray-btn" type="text" @click="tmpSaveAndQuitHandler">暂存退出</el-button>
          <el-button class="ft-btn deep-color-btn" type="primary" round @click="saveSchemeHandler">
            签约并发布
          </el-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import AuthSchemeCreator from './index'

  export default AuthSchemeCreator
</script>

<style lang="less" scoped>
  @import "../../create/footer.less";
  @import "index.less";
</style>

<style lang="less">
  @import "el-reset.less";
</style>
