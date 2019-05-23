<template>
  <div class="release-editor-wrapper" v-if="release !== null">
    <release-editor-layout :release.sync="release" type="edit">
      <template slot="about-version">
        <template v-if="release.baseUpcastReleases.length === 0">
          <div class="r-e-w-v-list">
            <el-tooltip placement="top" :disabled="release.policies.length > 0" content="发行没策略，不能新增版本">
              <div class="r-e-w-v-add-btn" @click="showResourceDialog" :class="{'disabled': release.policies.length === 0}">新增版本</div>
            </el-tooltip>
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
          <el-tooltip placement="top" :disabled="release.policies.length > 0" content="发行没策略，不能新增版本">
            <div class="r-e-w-v-add-btn" @click="showResourceDialog" :class="{'disabled': release.policies.length === 0}">新增版本</div>
          </el-tooltip>
          <div class="r-e-w-v-scheme">
            <div class="rew-v-selector">
              <div class="rew-v-version">
                {{selectedVersion}}
                <i class="el-icon-arrow-down" :class="{'visible': isVersionSelectorVisible}"></i>
              </div>
              <div class="rew-v-list">
                <ul>
                  <li class="rew-v-l-item"
                      :class="{'selected': item.version === selectedVersion}"
                      v-for="item in release.resourceVersions"
                      :key="'rew-v-l-item-'+item.version"
                      @click.stop="exchangeVersion(item)">
                    <i class="el-icon-check"></i>
                    <span class="rew-v-li-version">{{item.version}}</span>
                    <span class="rew-v-li-name">{{item.aliasName}}</span>
                    <span class="rew-v-li-date">{{item.createDate | fmtDate}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <el-tabs v-model="vTabActiveName" type="card" :closable="false" @tab-click="exchangeVTab">
              <el-tab-pane label="方案" name="scheme">
                <scheme-manage
                        type="edit"
                        :release="release"
                        :baseUpcastReleases="release.baseUpcastReleases"
                        :depReleasesList="depReleasesList"
                        :depReleasesDetailList.sync="depReleasesDetailList"
                        :releasesTreeData.sync="releasesTreeData"
                        :contracts.sync="contracts"
                ></scheme-manage>
              </el-tab-pane>
              <el-tab-pane label="合约" name="contract">
                <release-editor-contract
                        :release="release"
                        :depReleasesDetailList="depReleasesDetailList"
                        :contracts="contracts"
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
      <el-input
              class="r-e-w-search-input"
              v-model="searchInput"
              clearable
              ref="searchInputRef"
              @clear="clearSearchInputHandler"
              @keyup.native.enter="searchHandler"
              :placeholder="$t('search.resourcePlaceholder')"
      ></el-input>
      <lazy-list-view :list="searchResources"
                      ref="searchView"
                      class="r-e-w-s-resource-list"
                      :height="60" :fetch="searchDataHandler">
        <template slot-scope="scope">
          <div class="r-e-w-s-r-item">
            <span class="r-e-w-s-r-name">{{scope.data.aliasName}}</span>
            <span class="r-e-w-s-r-type">{{scope.data.resourceType}}</span>
            <span class="r-e-w-s-r-date">{{scope.data.createDate | fmtDate}}</span>
            <span class="r-e-w-s-r-select-btn" @click="addNewVersion(scope.data)">选择</span>
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

      .r-e-w-v-scheme {
        position: relative;
        padding-top: 5px;
      }

      .rew-v-selector {
        position: absolute; left: 0; top: 33px; z-index: 20;
        &:hover {
          .rew-v-list{ display: block; }
        }

        .rew-v-version {
          width: 78px;
          line-height: 34px; font-size: 14px; font-weight: 600; color: #333; cursor: pointer;
          .el-icon-arrow-down {
            font-size: 14px; font-weight: 600; transition: all .3s;
            &.visible { transform: rotate(180deg); }
          }
        }

        .rew-v-list {
          display: none;
          position: absolute; top: 34px; left: 0; z-index: 10;
          width: 400px; border-radius:4px;
          background: #fff; box-shadow:0px 4px 7px 0px rgba(0,0,0,0.3);
        }
        .rew-v-l-item {
          margin: 15px 20px; line-height: 20px; cursor: pointer;
          .el-icon-check { font-size: 14px; font-weight: 600;  color: #fff; transform: translateY(-4px); }
          span{
            display: inline-block;
            overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
            padding: 0 5px; font-size: 14px; color: #999;
            &.rew-v-li-version { width: 70px; }
            &.rew-v-li-name { width: 160px; border-right: 1px solid #999; }
          }
          &.selected {
            .el-icon-check { color: #409EFF; }
            span {
              font-weight: 600; color: #333;
              &.rew-v-li-name { border-color: #333; }
            }
          }
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
      &.disabled { opacity: .7; cursor: not-allowed; pointer-events: none; }
    }

    .r-e-w-search-dialog {

      .r-e-w-search-input { margin-bottom: 20px; }

      .r-e-w-s-r-item { margin: 15px 0; }
      span { display: inline-block; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; }
      .r-e-w-s-r-name { width: 220px; color: #333; }
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
        .el-tabs__nav { margin-left: 168px;  }
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
