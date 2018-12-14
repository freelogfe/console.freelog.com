<template>
  <div
          class="authorization-scheme-box"
  >
    <div class="scheme-partition">
      <scheme-detail
              v-if="authSchemesData && authSchemesData.authSchemeList.length"
              :resourceAuthScheme="authSchemesData"
              :resourceLevelIndex="0"
              :upcastResourceIDs="upcastResourceIDs"
              :upcastResourceAuthSchemeMap="upcastResourceAuthSchemeMap"
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
        <h3>{{upcastResourceAuthSchemeMap[resourceId].resourceName}}</h3>
        <div>
          <span>{{upcastResourceAuthSchemeMap[resourceId].userName}}</span>
          <span>{{upcastResourceAuthSchemeMap[resourceId].resourceDate}}</span>
          <span>{{upcastResourceAuthSchemeMap[resourceId].resourceType}}</span>
        </div>
      </div>
      <scheme-detail
              :resourceAuthScheme="upcastResourceAuthSchemeMap[resourceId]"
              :resourceLevelIndex="index + 1"
              :upcastResourceIDs="upcastResourceIDs"
              :upcastResourceAuthSchemeMap="upcastResourceAuthSchemeMap"
              @show-upcast-resource-scheme="showUpcastResourceScheme"
              @refresh-upcast-resourceIDs="refreshUpdcastResourceIDs"
              @rerender="rerender"
      ></scheme-detail>
    </div>
    <div>
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

  </div>
</template>

<script>
  import authorizationSchememManage from './index'

  export default authorizationSchememManage
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
