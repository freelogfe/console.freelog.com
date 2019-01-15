<template>
  <div
          v-loading="isShowLoading"
          class="authorization-scheme-box"
          :style="boxStyle"
  >
    <div
            class="scheme-partition"
            v-for="(resourceAuthScheme, index) in currentOpenedResources"
            :key="'resource' + index"
    >
      <div class="upcast-resource-head" v-if="currentOpenedResources.length > 1 || authType === 'resource'">
        <h3>{{resourceAuthScheme.resourceName}}</h3>
        <div>
          <span>{{resourceAuthScheme.userName}}</span>
          <span>{{resourceAuthScheme.resourceDate}}</span>
          <span>{{resourceAuthScheme.resourceType}}</span>
        </div>
      </div>
      <div
              class="s-p-resolve-btn"
              :class="{'s-p-no-resolve': resourceAuthScheme.isNoResolved}"
              v-if="authType === 'resource'"
              @click="toggleResolveResource(resourceAuthScheme, index)">
        不处理此资源
      </div>
      <scheme-detail
              :isCanUpdateContract.sync="isCanUpdateContract"
              :resourceAuthScheme="resourceAuthScheme"
              :currentOpenedResources="currentOpenedResources"
              :resourceLevelIndex="index"
              :resourceMap="resourceMap"
              :authSchemeIdentityAuthMap="authSchemeIdentityAuthMap"
              :selectedAuthSchemeTabIndex.sync="resourceAuthScheme.selectedAuthSchemeTabIndex"
              :activeAuthSchemeTabIndex.sync="resourceAuthScheme.activeAuthSchemeTabIndex"
              :checkIsCanExchangeSelection="checkIsCanExchangeSelection"
              @show-upcast-resource-scheme="showUpcastResourceScheme"
              @refresh-opened-resource="refreshCurrentOpenedResource"
              @refresh-selected-auth-schemes="refreshSelectedAuthSchemes"
              @cancel-scheme-selection="cancelSomeURSchemeSelection"
      ></scheme-detail>
      <div class="s-p-mask" v-if="resourceAuthScheme.isNoResolved"></div>
    </div>
    <div class="auth-s-b-nav" v-if="isShowNavBar">
      <div class="auth-s-b-n-btn prev">
        <span class="el-icon-arrow-left"></span>
      </div>
      <div class="auth-s-b-n-btn next">
        <span class="el-icon-arrow-right"></span>
      </div>
    </div>
    <div class="asb-footer" v-if="isShowFooter">
      <div
              class="update-btn"
              :class="{'active': true}"
              @click="signContract(isCanUpdateContract)">
        {{presentableInfo.contracts.length ? "更新合约" : "生成合约"}}
      </div>
    </div>
    <scheme-suspension-ball
            :isShow="authType === 'presentable'"
            :selectedAuthSchemes="selectedAuthSchemes"
            :unResolveAuthResources="unResolveAuthResources"
    ></scheme-suspension-ball>
    <scheme-sign-dialog
            v-if="authType ==='presentable'"
            :authType="authType"
            :visible.sync="isShowDialog"
            :resolvedDutyStatements="selectedAuthSchemes"
            :presentableId="presentableInfo.presentableId"
            @done="afterSginContract"
    ></scheme-sign-dialog>
    <!--<div class="asb-scroll-guide-box" v-if="isScrollBar && this.currentOpenedResources.length > 2">-->
      <!--<div class="red-bar" :style="redBarStyle"></div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import authorizationSchememManage from './index'

  export default authorizationSchememManage
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
