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
      <div class="upcast-resource-head" v-if="currentOpenedResources.length > 1 ">
        <h3>
          <router-link :to="{ path: `/resource/detail/${resourceAuthScheme.resourceId}` }">
            {{resourceAuthScheme.resourceName}}
          </router-link>
        </h3>
        <div>
          <span>{{resourceAuthScheme.userName}}</span>
          <span>{{resourceAuthScheme.resourceDate}}</span>
          <span>{{resourceAuthScheme.resourceType}}</span>
        </div>
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
              @show-upcast-resource-scheme="showUpcastResourceScheme"
              @refresh-opened-resource="refreshCurrentOpenedResource"
              @refresh-selected-auth-schemes="refreshSelectedAuthSchemes"
      ></scheme-detail>
    </div>
    <div class="asb-scroll-guide-box" v-if="this.currentOpenedResources.length > 2">
      <div class="red-bar" :style="redBarStyle"></div>
    </div>
    <div class="asb-footer">
      <div
              class="update-btn"
              :class="{'active': isCanUpdateContract}"
              @click="updateContract(isCanUpdateContract)">
        {{presentableInfo.contracts.length ? "更新合约" : "生成合约"}}
      </div>
    </div>
    <div @click.stop="function() {}">
      <div class="suspension-ball" @click="toggleSuspensionSchemeList">
        <span class="suspension-count" v-if="selectedAuthSchemes.length">{{selectedAuthSchemes.length}}</span>
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
        <p v-else>请选择相应授权方案及策略……</p>
      </div>
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
