<template>
  <div class="node-pb-setting-wrap">
    <h4 class="title">页面样式(pagebuild)</h4>

    <PresentableList class="pb-container"
                     :showFooter="false"
                     ref="presentableList"
                     :params="params">
      <template slot="append">
        <el-table-column
                width="150"
                label="上线状态">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="searchPageBuildHandler">切换样式</el-button>
            </div>
          </template>
        </el-table-column>
      </template>
      <div class="no-pb-selected-wrap" slot="empty">
        <p>请在资源列表中上线一个pagebuild资源作为页面样式，
          <el-button type="text" @click="searchPageBuildHandler">快速筛选</el-button>
        </p>
      </div>
    </PresentableList>
  </div>
</template>

<script>
  import PresentableList from './list.vue'
  import {RESOURCE_TYPES} from "../../../config/resource";

  export default {
    name: 'presentable-page-build-setting',

    data() {
      return {
        params: {
          isOnline: 1,
          resourceType: RESOURCE_TYPES.pageBuild
        }
      }
    },

    components: {PresentableList},

    mounted() {

    },

    methods: {
      searchPageBuildHandler() {
        this.$emit('search', {resourceType: RESOURCE_TYPES.pageBuild})
      },
      refresh() {
        this.$refs.presentableList.refresh()
      }
    }
  }
</script>

<style lang="less">
  .node-pb-setting-wrap {
    .title {
      font-size: 14px;
      color: #333333;
      margin-bottom: 10px;
    }

    .pb-container {
      border: 1px dashed #D8D8D8;

      .no-pb-selected-wrap {
        background-color: #FCFCFC;
        height: 100px;
        color: #999999;
        font-size: 14px;
        line-height: 100px;
        text-align: center;
      }
      .resource-row {
        background-color: #FCFCFC;
        height: 100px;
      }
    }
  }
</style>