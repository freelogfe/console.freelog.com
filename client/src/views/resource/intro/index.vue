<template>
  <div class="res-intro-wrapper">
    <div class="user-avatar">
      <img class="resource-author-img"
           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb_dez7L9rZGrxliWIWRzbH6H0u0BMePCrTB6wVbLtcfrAMKII"
           alt="">
    </div>
    <div class="res-content">
      <p class="res-name">{{resource.resourceName}}{{resource.resourceName}}{{resource.resourceName}}</p>
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
