<template>
  <div class="res-intro-wrapper">
    <div class="user-avatar">
      <img class="resource-author-img"
           :src="`https://image.freelog.com/headImage/${resource.userId}?x-oss-process=style/head-image`"
           alt="">
    </div>
    <div class="res-content">
      <p class="res-name">{{resource.resourceName}}</p>
      <slot></slot>
      <div class="res-origin">
        <span class="res-author">by: {{resource.userName}}</span>
        <span class="res-date">{{resource.updateDate|fmtDate('YYYY-MM-DD')}}</span>
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
