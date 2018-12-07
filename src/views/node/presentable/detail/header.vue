<template>
  <div class="presentable-detail-header-wrap">
    <div class="pdh-body">
      <div class="lf-side">
        <div class="presentable-info">
          <span class="p-name">{{presentable.presentableName}}</span>
        </div>
        <div class="res-info">{{resource.resourceName}} | {{resource.userName}} | {{resource.updateDate|fmtDate}} |
          {{resource.resourceType}}
        </div>
        <p><i class="dot"></i>{{contractState}}</p>
      </div>

      <router-link :to="nodeIndexUrl" class="back-to-node-page">
        <el-button type="primary" plain round class="back-btn"><i class="el-icon-back"></i>节点首页</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'presentable-detail-header',
    data() {
      return {}
    },

    props: {
      presentable: Object,
      resource: Object
    },

    computed: {
      contractState() {
        return '已签约（授权方案1/策略2）'
      },
      nodeIndexUrl(){
        return `/node/${this.$route.params.nodeId}`
      }
    }

  }
</script>

<style scoped lang="less" type="text/less">
  .presentable-detail-header-wrap {
    background-color: #FAFBFB;
    .pdh-body {
      width: 1160px;
      margin: auto;
      padding: 20px 0;
      display: flex;
      align-items: center;

      .lf-side {
        flex: 1;
      }
      .presentable-info {
        margin-bottom: 10px;
      }
      .p-name {
        color: #333333;
        font-weight: bold;
        font-size: 20px;
        line-height: 28px;
      }
    }

    .dot {
      margin-right: 10px;
    }
    .res-info {
      color: #999999;
      font-size: 14px;
      margin-bottom: 10px;
    }

    .back-to-node-page {
      .back-btn {
        background-color: white;
        color: #409EFF;
        padding: 8px 15px;
        i {
          margin-right: 6px;
        }
      }
    }
  }
</style>