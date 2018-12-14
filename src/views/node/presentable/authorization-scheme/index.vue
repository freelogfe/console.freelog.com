<template>
  <div
          class="authorization-scheme-box"
  >
    <div class="scheme-partition">
      <scheme-detail
              v-if="authSchemesData && authSchemesData.authSchemeList.length"
              :isFinishAllSelection.sync="isFinishAllSelection"
              :resourceAuthScheme="authSchemesData"
              :resourceLevelIndex="0"
              :selectedAuthSchemeTabIndex.sync="selectedAuthSchemeTabIndexArr[0]"
              :selectedAuthSchemeTabIndexArr.sync="selectedAuthSchemeTabIndexArr"
              :upcastResourceIDs.sync="upcastResourceIDs"
              :upcastResourceAuthSchemeMap="upcastResourceAuthSchemeMap"
              @show-upcast-resource-scheme="showUpcastResourceScheme"
      ></scheme-detail>
    </div>
    <div
            class="scheme-partition"
            v-for="(resourceId, index) in upcastResourceIDs"
            :key="'upcastResource' + index"
    >
      <div class="upcast-resource-head">
        <h3>{{upcastResourceAuthSchemeMap[resourceId].resourceName}}</h3>
        <div>
          <span>{{upcastResourceAuthSchemeMap[resourceId].userName}}</span>
          <span>{{upcastResourceAuthSchemeMap[resourceId].resourceDate}}</span>
          <span>{{upcastResourceAuthSchemeMap[resourceId].resourceType}}</span>
        </div>
      </div>
      <scheme-detail
              :isFinishAllSelection.sync="isFinishAllSelection"
              :resourceAuthScheme="upcastResourceAuthSchemeMap[resourceId]"
              :resourceLevelIndex="index + 1"
              :selectedAuthSchemeTabIndex.sync="selectedAuthSchemeTabIndexArr[index + 1]"
              :selectedAuthSchemeTabIndexArr.sync="selectedAuthSchemeTabIndexArr"
              :upcastResourceIDs.sync="upcastResourceIDs"
              :upcastResourceAuthSchemeMap="upcastResourceAuthSchemeMap"
              @show-upcast-resource-scheme="showUpcastResourceScheme"
              @rerender="rerender"
      ></scheme-detail>
    </div>
    <div>
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
