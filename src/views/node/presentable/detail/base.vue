<template>
  <div class="presentable-detail-base-wrap">
    <div class="p-d-b-w-row">
      <label>节点资源名称</label>
      <el-input v-model="presentable.presentableName" size="medium"></el-input>
    </div>
    <div class="p-d-b-w-row">
      <label>节点资源标签</label>
      <div style="position: absolute; top: -4px; display: inline-block;">
        <FreelogTags v-model="presentable.userDefinedTags"
                     class="p-user-tags"
                     actionText="新标签"
                     @input="changeTagsHandler">
        </FreelogTags>
      </div>
    </div>
    <div class="p-d-b-w-row save-box">
      <el-button>取消</el-button>
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </div>
  </div>
</template>

<script>
  import FreelogTags from '@/components/Tags/index.vue'
  export default {
    name: 'presentable-detail-base',
    data() {
      return {
        tags: [],
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
    methods: {
      changeTagsHandler(userDefinedTags) {
        this.tags = userDefinedTags
      },
      onSubmit() {
        this.$emit('save', {
          userDefinedTags: this.presentable.userDefinedTags,
          presentableName: this.presentable.presentableName
        })
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .presentable-detail-base-wrap {
    label {
      box-sizing: border-box; display: inline-block; position: relative;
      width: 150px; padding-left: 8px;
      font-size: 14px; color: #666;

      &:before{
        position: absolute; left: 0; top: 50%; z-index: 1; transform: translateY(-50%);
        content: '';
        display: block;
        width: 3px; height: 14px;
        background-color: #666;
      }
    }

    .el-input {
      width: 400px;
    }

    .p-d-b-w-row {
      position: relative;  margin-top: 50px;

      &.save-box {
        padding-left: 150px;
      }
      .el-button {
        width: 110px; margin-right: 20px; border-radius: 20px;
      }
    }
  }
</style>