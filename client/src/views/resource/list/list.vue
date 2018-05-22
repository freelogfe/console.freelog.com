<template>
  <div class="resource-items">
    <ul>
      <li class="resource-item" v-for="resource in resources">
        <h4 class="res-title">{{resource.resourceName}}</h4>
        <div class="res-intro-detail">
          <div class="res-intro-bd">
            <span class="res-type">#{{resource.resourceType}}</span> <span
            class="res-size">{{resource._fileSize}}</span>
            <span class="res-desc">{{resource.resourceDesc}}</span>
          </div>
          <div class="res-intro-ft">
            <span class="res-author" v-if="resource._userInfo">by: {{resource._userInfo.nickname}}</span>
            <span class="update-time">创建时间：{{resource.createDate|fmtDate}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {onloadUserInfo} from '@/data/user/loader'

  export default {
    name: 'resource-items',

    data() {
      return {
        search: '',
        resources: []
      }
    },

    props: {
      type: {
        type: String,
        default() {
          return 'all'
        }
      }
    },

    mounted() {
      this.loader().then((resources) => {
        this.resources = this.resources.concat(resources)
        console.log(this.resources)
      })
    },

    methods: {
      loader(param) {
        if (typeof param === 'object') {
          param = {
            params: param
          }
        }
        return this.$services.resource.get(param || {}).then((res) => {
          return res.getData()
        }).then(this.format.bind(this))
      },
      format(data) {
        var resources = data.dataList;
        resources.forEach((res) => {
          res._fileSize = this.humanizeSize(res.systemMeta.fileSize)
          onloadUserInfo(res.userId).then((userInfo) => {
            this.$set(res, '_userInfo', userInfo)
          })
        })

        return resources;
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
      }
    }
  }
</script>

<style lang="less" scoped>
  .resource-item {
    margin-top: 25px;
  }

  .res-title {
    font-size: 16px;
    color: #666;
    margin-bottom: 8px;
  }

  .res-intro-bd {
    margin-bottom: 8px;
    font-size: 13px;
  }

  .res-type,
  .res-size {
    margin-right: 3px;
    color: #1696C0;
  }

  .res-desc {
    margin-left: 15px;
  }

  .res-intro-ft {
    color: #999;
    font-size: 12px;
  }

  .res-author {
    margin-right: 12px;
  }
</style>
