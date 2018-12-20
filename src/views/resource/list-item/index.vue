<template>
  <div class="resource-item-info" :class="['resource-item-theme-type-'+type]">
    <h4 class="res-title">{{resource.resourceName}}</h4>
    <div class="res-intro-detail">
      <div class="rt-actions" v-show="type === 'self'">
        <el-button size="mini" type="primary" @click="gotoSchemeHandler">授权管理</el-button>
      </div>

      <div @click="gotoDetail(resource)">
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
  </div>
</template>


<script>
  import {onloadUserInfo} from '@/data/user/loader'
  import {RESOURCE_STATUS} from '@/config/resource'

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
      },
      gotoSchemeHandler() {
        window.open(`/resource/edit/${this.resource.resourceId}/auth_schemes`)
        // this.$router.push(`/resource/edit/${this.resource.resourceId}/auth_schemes`)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
