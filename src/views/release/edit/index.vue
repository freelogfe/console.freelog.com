<template>
  <div class="release-editor-wrapper" v-if="release !== null">
    <release-editor-layout :release.sync="release" type="edit">
      <template slot="about-version">
        <template v-if="release.baseUpcastReleases.length === 0">
          <div class="r-e-w-v-list">
            <div class="r-e-w-v-add-btn" @click="showResourceDialog">新增版本</div>
            <el-table
                    :show-header="false"
                    :data="release.resourceVersions"
                    size="small"
                    style="width: 460px; margin-top: 20px;"
            >
              <el-table-column prop="version" label="版本" width="120"></el-table-column>
              <el-table-column prop="resourceName" label="资源名称"></el-table-column>
              <el-table-column prop="createDate" label="日期" width="180"></el-table-column>
            </el-table>
          </div>
        </template>
        <div class="r-e-w-v-box" v-else>
          当前版本：
          <el-select size="small" v-model="selectedVersion">
            <el-option
                    v-for="item in release.resourceVersions"
                    :key="item.value"
                    :label="item.version"
                    :value="item.version">
            </el-option>
          </el-select>
          <div class="r-e-w-v-add-btn" @click="showResourceDialog">新增版本</div>
          <div class="r-e-w-v-scheme">
            <el-tabs v-model="vTabActiveName" type="card" :closable="false" @tab-click="exchangeVTab">
              <el-tab-pane label="方案" name="scheme">
                <scheme-manage
                        type="edit"
                        :release="release"
                        :baseUpcastReleases="release.baseUpcastReleases"
                        :depReleases="resourceDependencies"
                        :releasesTreeData.sync="releasesTreeData"
                        :releaseScheme="releaseScheme"
                ></scheme-manage>
              </el-tab-pane>
              <el-tab-pane label="合约" name="contract">
                <release-editor-contract
                        :release="release"
                        :releaseScheme="releaseScheme"
                        :releasesTreeData="releasesTreeData"
                ></release-editor-contract>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </template>
    </release-editor-layout>
    <el-dialog
            class="r-e-w-search-dialog"
            center
            title="我的资源"
            width="640px"
            :visible.sync="resourceDialogVisible"
    >
      <el-input class="r-e-w-search-input" v-model="searchInput"></el-input>
      <lazy-list-view :list="searchResources"
                      ref="searchView"
                      class="r-e-w-s-resource-list"
                      :height="60" :fetch="searchDataHandler">
        <template slot-scope="scope">
          <div class="r-e-w-s-r-item">
            <span class="r-e-w-s-r-name">{{scope.data.resourceName}}</span>
            <span class="r-e-w-s-r-type">{{scope.data.resourceType}}</span>
            <span class="r-e-w-s-r-date">{{scope.data.updateDate}}</span>
            <span class="r-e-w-s-r-select-btn">选择</span>
          </div>
        </template>
      </lazy-list-view>
    </el-dialog>
  </div>
</template>

<script>
  import ReleaseEditor from './index.js'
  export default ReleaseEditor
</script>

<style lang="less" type="text/less" scoped>
  @import '../../../styles/variables.less';

  .release-editor-wrapper {
    .r-e-w-v-box {
      .cont { padding: 20px 0; }
      .r-e-w-v-list { padding: 20px 0; }

      .el-select { width: 140px; margin-right: 40px; }

      .r-e-w-v-box {
        padding: 10px; border-radius: 4px;
        .r-e-w-v-scheme {
          margin-top: 12px; padding-top: 5px;
        }
      }
    }

    .r-e-w-v-add-btn {
      display: inline-block; cursor: pointer;
      width: 120px; padding: 8px; border-radius: 2px;
      font-size: 12px; background-color: #FAFBFB; color: #409EFF; text-align: center;
      &:hover {
        background-color: #F5F5F5; color: #1287ff;
      }
    }

    .r-e-w-search-dialog {

      .r-e-w-search-input { margin-bottom: 20px; }

      .r-e-w-s-r-item { margin: 15px 0; }
      span { display: inline-block; }
      .r-e-w-s-r-name { width: 180px; color: #333; }
      .r-e-w-s-r-type, .r-e-w-s-r-date { width: 90px; font-size: 12px; color: #999; }
      .r-e-w-s-r-select-btn {
        float: right; cursor: pointer;
        padding: 2px 10px; border-radius: 13px;
        font-size: 12px; background-color: #409EFF; color: #fff;
      }
    }
  }
</style>

<style lang="less" type="text/less">
  .release-editor-wrapper {
    .r-e-w-v-box {
      .el-input__inner{ height: 34px; line-height: 34px; }
      .el-tabs {
        margin-top: 20px;
        .el-tabs__header { margin: 0; }
        .el-tabs__nav-wrap {
          &:after {
            display: none;
          }
        }
        .el-tabs__nav { margin-left: 80px;  }
        .el-tabs__item {
          padding: 0 40px;
          &.is-active { border-bottom-color: #FAFBFB; background-color: #FAFBFB; }
        }
        .el-tabs__content { overflow: visible; }
      }
    }

    .r-e-w-search-dialog {
      .el-dialog__body {
        overflow: auto;
        height: 300px; margin: 0 20px; padding: 20px 50px 0; border-top: 1px solid #D8D8D8;

        .el-input__inner { padding-left: 30px; }
      }
    }
  }

</style>
