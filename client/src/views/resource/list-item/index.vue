<template>
  <div class="resource-item-info" @click="gotoDetail(resource)">
    <h4 class="res-title">{{resource.resourceName}}</h4>
    <div class="res-intro-detail">
      <div class="res-intro-bd">
        <span class="res-type">#{{resource.resourceType}}</span>
        <!--<span class="res-size">{{resource._fileSize}}</span>-->
        <span class="res-desc">{{resource.resourceDesc}}{{resource.resourceId}}</span>
      </div>
      <div class="res-intro-ft">
        <span class="res-author" v-if="resource._userInfo">by: {{resource._userInfo.nickname}}</span>
        <span class="update-time">最近更新时间：{{resource.createDate|fmtDate}}</span>
      </div>
    </div>
  </div>
</template>


<script>
  import {onloadUserInfo} from '@/data/user/loader'

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
      }
    },

    watch: {
//      resource() {
//        this.format(this.resource)
//      }
    },

    mounted() {
      this.format(this.resource)
    },

    methods: {
      format(resource) {
        if (!this.resource.resourceId) {
          return
        }
        resource._fileSize = this.humanizeSize(resource.systemMeta.fileSize)
        onloadUserInfo(resource.userId).then((userInfo) => {
          this.$set(resource, '_userInfo', userInfo)
        })
      },
      humanizeSize(number) {
        const UNITS = ['B', 'KB', 'MB', 'GB', 'TB'];

        if (number < 1) {
          return number + 'B';
        }

        const algorithm = 1024
        const exponent = Math.min(Math.floor(Math.log(number) / Math.log(algorithm)), UNITS.length - 1);
        number = Number((number / Math.pow(algorithm, exponent)).toPrecision(2));
        const unit = UNITS[exponent];

        return number + unit;
      },
      gotoDetail(resource) {
       this.$router.push(`/resource/detail/${resource.resourceId}`)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
