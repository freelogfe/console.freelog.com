<template>
  <div
          class="authorization-scheme-box"
          :class="{ 'multi-upcast-resource': true }"
  >
    <div class="scheme-partition">
      <scheme-detail
              v-if="authSchemesData"
              :authSchemeList="authSchemesData.data"
              :upcastResourceLevelIndex="0"
              @show-upcast-resource-scheme="showUpcastResourceScheme"
              @refresh-upcast-resourceIDs="refreshUpdcastResourceIDs"
      ></scheme-detail>
    </div>
    <div
            class="scheme-partition"
            v-for="(resourceId, index) in upcastResourceIDs"
            :key="'upcastResource' + index"
    >
      <div class="upcast-resource-head">
        <h3>{{upcastResourceAuthScheme[resourceId].resourceName}}</h3>
        <div>
          <span>{{upcastResourceAuthScheme[resourceId].userName}}</span>
          <span>{{upcastResourceAuthScheme[resourceId].resourceDate}}</span>
          <span>{{upcastResourceAuthScheme[resourceId].resourceType}}</span>
        </div>
      </div>
      <scheme-detail
              v-if="authSchemesData"
              :authSchemeList="upcastResourceAuthScheme[resourceId].authSchemeList"
              :upcastResourceLevelIndex="index + 1"
      ></scheme-detail>
    </div>
    <div class="suspension-ball" @click="toggleSuspensionSchemeList">
      <span class="suspension-count" v-if="false">3</span>
      <span class="suspension-icon-list" v-else>
        <span></span>
        <span></span>
        <span></span>
      </span>
    </div>
    <div class="suspension-list-box" v-if="isShowSuspensionSchemeList">
      <ul v-if="false">
        <li></li>
      </ul>
      <p v-else>请选择相应授权方案及策略……</p>
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
