<template>
  <section class="res-detail-wrap" :class="{'owner-resource': isOwnerResource}">
    <div class="op-btns">
      <el-button type="text"
                 v-if="!showAuthSchemes"
                 @click="showAuthSchemeHandler"
                 class="show-btn">
        <img class="auth-schems-img-icon" src="../../../assets/img/icons/scheme.png" alt="授权方案">
      </el-button>
    </div>
    <div class="res-detail-aside" :class="{'active-aside-status':showAuthSchemes}">
      <auth-scheme-detail class="auth-scheme-detail"
                          :selectedCallback="selectPolicyHandler"
                          @close="hideAuthSchemeHandler"
                          :resource="resourceDetail.resourceInfo"
                          v-show="showAuthSchemes"></auth-scheme-detail>
    </div>

    <div class="res-detail-content" ref="detailContent" :style="{transform: contentTransform}">
      <div class="res-detail-hd clearfix">
        <div class="res-hd-wrap">
          <div class="res-digest">
            <div class="rt-side">
              <p>
                <el-button class="res-act-btn" type="primary" @click="getResourceAuthHandler">获取授权</el-button>
              </p>
              <p>
                <el-button class="res-act-btn" @click="favorHandler">{{resourceDetail.isFavor?'已收藏':'收藏'}}</el-button>
              </p>
            </div>
            <div class="lf-side">
              <div class="res-title">{{resourceDetail.resourceInfo.resourceName}}</div>
              <div class="res-origin-info">
                <span class="res-type">{{resourceDetail.resourceInfo.resourceType}}</span>
                <span class="res-update-time">{{resourceDetail.resourceInfo.updateDate|fmtDate}}</span>
              </div>
            </div>
          </div>
          <div class="res-author-info">
            <img :src="avatarUrl" alt="">
            <span class="res-author-name">{{resourceDetail.resourceInfo.userName}}</span>
          </div>
        </div>
      </div>
      <div class="res-detail-nav-tabs-wrap" ref="tabs">
        <ul class="res-detail-nav-tabs">
          <li :class="{active:activeTab===tab.name}"
              v-for="tab in tabs" @click="scrollInto(tab.name)">
            {{tab.title}}
          </li>
        </ul>
      </div>
      <div class="res-detail-bd">
        <div class="res-detail-desc res-detail-info" ref="resDesc" v-html="resourceDetail.resourceInfo.description"></div>
        <div class="res-detail-meta res-detail-info" ref="resMeta">
          <pre class="meta-info">{{JSON.stringify(resourceDetail.resourceInfo.meta, null, 4)}}</pre>
        </div>
      </div>
      <div class="res-detail-ft">
        <el-button class="res-act-btn" @click="favorHandler">{{resourceDetail.isFavor?'已收藏':'收藏'}}</el-button>
        <el-button class="res-act-btn" type="primary" @click="getResourceAuthHandler">获取授权</el-button>
        <el-button type="primary" class="res-act-btn" @click="editDetailHandler" v-if="isOwnerResource">编辑</el-button>
      </div>
    </div>


    <a class="up-to-top" href="#" ref="upBtn">
      <i class="el-icon-arrow-up"></i>
    </a>
    <el-dialog width="640px" title="" :visible.sync="showOptionsDialog">
      <div class="opts-content-wrap">
        <div class="select-target-header">
          <div class="resource-name">{{resourceDetail.resourceInfo.resourceName}}</div>
          <div class="selected-resource-auth-scheme-policy"></div>
        </div>
        <div class="select-target-bd">
          <h4 class="opts-bd-title">获取资源授权至节点：</h4>
          <div class="opts-container">
            <ul class="checkbox-group node-opts">
              <li class="checkbox-item" v-for="node in nodes" :class="{'node-opt-selected': node.selected}"
                  @click="nodeOptCheckHandler(node)">
                <i class="node-opt-check-status checked-opt" v-if="node.checked"></i>
                <i class="node-opt-check-status unchecked-opt" v-else></i>
                {{node.nodeName}}
              </li>
            </ul>
          </div>
        </div>
        <div class="dialog-footer">
          <el-button class="deep-color-btn" type="primary" @click="confirmAuthHandler">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import ResourceDetail from './index'

  export default ResourceDetail
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
