<template>
  <div class="presentable-detail-header-wrap">
    <div class="pdh-body">
      <div class="lf-side">
        <div class="presentable-info">
          <div style="float: left; margin-right: 60px">
            <template v-if="editing === false">
              <span class="p-name">{{presentable.presentableName}}</span>
              <el-button type="text" @click="setEdtingHandler(true)"><i class="el-icon-edit"></i></el-button>
            </template>
            <template v-else>
              <input type="text" class="presentable-name-input p-name"
                     @blur="changePresentableNameHandler"
                     @keyup.enter="changePresentableNameHandler"
                     v-model="presentable.presentableName">
            </template>
          </div>
          <FreelogTags v-model="presentable.userDefinedTags"
                       class="p-user-tags"
                       actionText="新标签"
                       @input="changeTagsHandler"></FreelogTags>
        </div>
        <div class="res-info" v-if="resource&&resource.resourceName"><a :href="'/resource/detail/'+resource.resourceId" target="_blank">{{resource.resourceName}}</a> | {{resource.userName}} | {{resource.updateDate|fmtDate}} |
          {{resource.resourceType}}
        </div>
        <p :class="contractStateCls"><i class="dot"></i>{{contractState}}</p>
      </div>

      <router-link :to="nodeIndexUrl" class="back-to-node-page">
        <el-button type="primary" plain round class="back-btn"><i class="el-icon-back"></i>节点首页</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import FreelogTags from '@/components/Tags/index.vue'


  export default {
    name: 'presentable-detail-header',
    data() {
      return {
        editing: false
      }
    },

    props: {
      presentable: Object,
      resource: Object
    },

    components:{
      FreelogTags,
    },

    computed: {
      contractState() {
        var scheme = this.presentable.scheme
        var text

        if (!scheme) {
          text = '未签约'
        } else {
          text = `已签约 (${scheme.authSchemeName}/${scheme.selectedPolicy.policyName})`
        }
        return text
      },
      contractStateCls() {
        return this.presentable.scheme ? 'active-status-2' : 'active-status-0'
      },
      nodeIndexUrl() {
        return `/node/${this.$route.params.nodeId}`
      }
    },
    methods: {
      changePresentableNameHandler() {
        this.setEdtingHandler(false)
        this.$emit('save', {presentableName: this.presentable.presentableName})
      },
      setEdtingHandler(flag) {
        this.editing = flag
      },
      changeTagsHandler(){
        this.$emit('save', {userDefinedTags: this.presentable.userDefinedTags})
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  @import '../../../../styles/variables.less';

  .presentable-detail-header-wrap {
    background-color: #FAFBFB;
    .pdh-body {
      width: @main-content-width-1190;
      margin: auto;
      padding: 20px 0;
      display: flex;
      align-items: center;

      .lf-side {
        flex: 1;
      }
      .presentable-info {
        margin-bottom: 10px;
        i {
          color: #333333;
          font-size: 18px;
          margin-left: 10px;
        }

        .p-user-tags {
          padding-top: 7px;
        }

        .presentable-name-input {
          outline: none;
          background-color: white;
          border: 1px solid #CCCCCC;
          border-radius: 4px;
          padding: 7px 10px;
          min-width: 200px;
          max-width: 600px;
        }
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
      a {
        color: #999999;
      }
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

  @media screen and (max-width: 1366px){
    .presentable-detail-header-wrap .pdh-body{
      width: @main-content-width-990;
    }
  }
</style>