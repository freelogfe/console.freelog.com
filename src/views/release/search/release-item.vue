<template>
  <div class="release-item">
    <div class="r-i-name">{{release.releaseName}}</div>
    <div class="r-i-row">
      <span class="r-i-type">{{release.resourceType}}</span>
      <span class="r-i-version">{{release.latestVersion.version}}</span>
      <span class="r-i-date">{{release.updateDate | fmtDate}}</span>
    </div>
    <el-button class="add-release-btn" @click="addToRelease">{{$t('search.addBtn')}}</el-button>
  </div>
</template>


<script>
  export default {
    name: 'release-item',
    props: {
      release: {
        type: Object,
        default() {
          return {}
        }
      },
      type: String
    },
    methods: {
      addToRelease() {
        this.$emit('add', this.release)
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .release-item {
    position: relative;
    padding: 8px 0; border-bottom: 1px solid #E1E1E1;

    .r-i-name {
      font-size: 18px; color: #333;
    }

    .r-i-row {
      span {
        font-size: 13px; color: #999;
        &:not(:first-child) {
          margin-left: 5px; padding-left: 5px; border-left: 1px solid #999;
        }
      }
    }

    .add-release-btn {
      position: absolute; top: 50%; right: 0; z-index: 1;
      padding: 8px 16px; border-radius: 16px; border-width: 0;
      font-size: 12px; font-weight: 400; background-color: #409EFF; color: #fff;
      transform: translateY(-50%);
    }
  }


</style>
