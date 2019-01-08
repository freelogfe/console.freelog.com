<template>
  <div class="resource-detail-intro-wrap">
    <div class="res-detail-intro-container" v-show="mode === 0">
      <div class="res-detail-info">
        <img :src="previewImage | padImage"
             :class="{'resource-default-preview':!previewImage}"
             alt="">
        <p class="res-name">{{resource.resourceName}}</p>
        <p class="res-type">{{resource.resourceType}}</p>
      </div>

      <div class="pull-panel-btn" @click="pullHandler">更新资源 <i class="el-icon-arrow-down"></i></div>

      <div class="res-actions-wrap">
        <el-button size="small" type="primary">发布资源</el-button>
      </div>
    </div>

    <div @click="pullHandler" class="pull-btn-area" v-show="mode === 1">收起资源 <i class="el-icon-arrow-up"></i></div>
  </div>
</template>

<script>
  export default {
    name: 'resource-detail-intro',

    data() {
      return {
      }
    },

    props: {
      resource: Object,
      viewMode: String
    },

    mounted() {

    },

    computed: {
      previewImage() {
        return (this.resource.previewImages && this.resource.previewImages[0]) || ''
      },
      mode(){
        return this.viewMode === 'preview'? 0: 1
      }
    },

    methods: {
      pullHandler() {
        this.$emit('switch')
      }
    }
  }
</script>

<style lang="less" scoped>
  .resource-detail-intro-wrap {
    height: 105px;
    background-color: #FAFBFB;
    .res-detail-intro-container {
      width: 1190px;
      margin: auto;
      display: flex;
      align-items: center;
      height: 100%;
    }

    .pull-btn-area {
      text-align: center;
      font-size: 14px;
      color: #666666;
      cursor: pointer;
    }

    .pull-panel-btn {
      flex: 1;
      font-size: 14px;
      color: #666666;
      cursor: pointer;
    }

    .res-detail-info {
      flex: 1;
      .res-name {
        color: #333333;
        font-size: 18px;
      }
      .res-type {
        color: #999999;
      }
      img {
        width: 60px;
        height: 45px;
        display: inline-block;
        margin-right: 20px;
        float: left;
      }
    }
  }
</style>