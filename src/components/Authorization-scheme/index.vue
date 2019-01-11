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
    <div @click.stop="function() {}" v-if="authType === 'presentable'">
      <div class="suspension-ball" @click="toggleSuspensionSchemeList">
        <span class="suspension-count" v-if="selectedAuthSchemes.length || unResolveAuthResources.length">{{selectedAuthSchemes.length + unResolveAuthResources.length}}</span>
        <span class="suspension-icon-list" v-else>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div class="suspension-list-box" v-if="isShowSuspensionSchemeList">
        <ul v-if="selectedAuthSchemes.length">
          <li
                  v-for="(item, index) in selectedAuthSchemes"
                  :key="'selectedAuthScheme-'+index"
          >
            <div class="suspension-lb-row-1">{{item.resourceName}}</div>
            <div class="suspension-lb-row-2">
              <span>{{item.authSchemeName}}</span>
              <span>{{item.policyName}}</span>
            </div>
          </li>
        </ul>

        <p v-if="selectedAuthSchemes.length === 0 && unResolveAuthResources.length === 0">请选择相应授权方案及策略……</p>
        <div class="unresolve-authschemes-box" v-if="unResolveAuthResources.length">
          <h3>未处理资源列表</h3>
          <ul>
            <li
                    v-for="(item, index) in unResolveAuthResources"
                    :key="'unResolveAuthResources-'+index"
            >
              <div class="suspension-lb-row-1">{{item.resourceName}}</div>
            </li>
          </ul>
        </div>
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
    <scheme-sign-dialog
            v-if="authType ==='presentable'"
            :authType="authType"
            :visible.sync="isShowDialog"
            :resolvedDutyStatements="selectedAuthSchemes"
            :presentableId="presentableInfo.presentableId"
            @done="afterSginContract"
    ></scheme-sign-dialog>
    <div class="asb-scroll-guide-box" v-if="isScrollBar && this.currentOpenedResources.length > 2">
      <div class="red-bar" :style="redBarStyle"></div>
    </div>
  </div>
</template>

<script>
  import authorizationSchememManage from './index'

  export default authorizationSchememManage
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
