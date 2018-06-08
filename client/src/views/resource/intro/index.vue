<template>
  <div class="res-intro-wrapper">
    <div class="user-avatar">
      <img class="resource-author-img"
           src="//freelog-image.oss-cn-shenzhen.aliyuncs.com/preview/e9bb1c2d-33ce-4a65-93c1-87c88abb4188.jpg"
           alt="">
    </div>
    <div class="res-content">
      <p class="res-name">{{resource.resourceName}}</p>
      <slot></slot>
      <div class="res-origin">
        <span class="res-author">by: {{resource.userName || resource.resourceId}}</span>
        <span class="res-date">{{resource.updateDate|fmtDate}}</span>
      </div>
      <div>
        <a target="_blank" class="more-detail-link" :href="'/resource/detail/'+ resource.resourceId">查看更多>></a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'resource-intro',
    data() {
      return {}
    },

    props: {
      resource: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>


<style lang="less" scoped>
  @import "index.less";
</style>
