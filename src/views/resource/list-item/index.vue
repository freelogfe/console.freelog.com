<template>
  <div class="resource-item-info" @click="gotoDetail(resource)" :class="['resource-item-theme-type-'+type]">
    <h4 class="res-title">{{resource.resourceName}}</h4>
    <div class="res-intro-detail">
      <div class="res-intro-bd">
        <span class="res-type">#{{resource.resourceType}}</span>
        <span class="res-desc">{{resource.resourceDesc}} {{resource.resourceId}}</span>
      </div>
      <div class="res-intro-ft">
        <span class="res-type">#{{resource.resourceType}}</span>
        <!--<span class="res-author" v-if="resource._userInfo">by: {{resource._userInfo.nickname}}</span>-->
        <span class="update-time">最近更新时间：{{resource.createDate|fmtDate}}</span>
        <span style="margin-left: 6px" v-if="resource._statusInfo">状态：{{resource._statusInfo.desc}}</span>
      </div>
    </div>
  </div>
</template>


<script>
import { onloadUserInfo } from '@/data/user/loader'
import { RESOURCE_STATUS } from '@/config/resource'

export default {
  name: 'resource-info-item',

  data() {
    return {}
  },

  props: {
    resource: {
      type: Object,
      default() {
        return {}
      }
    },
    type: {
      type: String,
      default: 'list'
    },
    navTo: Function
  },

  mounted() {
    this.format(this.resource)
  },

  methods: {
    format(resource) {
      if (!this.resource.resourceId) {
        return
      }

      resource._statusInfo = RESOURCE_STATUS[resource.status]
      onloadUserInfo(resource.userId).then((userInfo) => {
        this.$set(resource, '_userInfo', userInfo)
      })
    },
    gotoDetail(resource) {
      if (typeof this.navTo === 'function') {
        this.navTo(resource)
      } else {
        this.$router.push(`/resource/detail/${resource.resourceId}`)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
