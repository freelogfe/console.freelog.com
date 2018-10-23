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
        <div class="res-author-avatar">
          <img :src="`https://image.freelog.com/headImage/${resourceDetail.resourceInfo.userId}?x-oss-process=style/head-image`"
               alt="">
        </div>
        <div class="res-digest">
          <div class="res-title">{{resourceDetail.resourceInfo.resourceName}}</div>
          <div class="res-origin-info">
            <span class="res-type">{{resourceDetail.resourceInfo.resourceType}}</span>
            <span class="res-author-name">by: {{resourceDetail.resourceInfo.userName}}</span>
            <span class="res-update-time">最近更新时间： {{resourceDetail.resourceInfo.updateDate|fmtDate}}</span>
          </div>
          <div class="res-type-info"></div>
        </div>
      </div>
      <div class="res-detail-bd">
        <div class="res-detail-desc" v-html="resourceDetail.resourceInfo.description"></div>
        <div class="res-detail-meta">
          <h3>meta</h3>
          <pre class="meta-info">{{JSON.stringify(resourceDetail.resourceInfo.meta, null, 4)}}</pre>
        </div>
      </div>
    </div>

    <div class="res-detail-ft">
      <div class="res-detail-ft-content">
        <el-button type="text" class="preview-btn detail-ft-btn" @click="previewHandler">
          <img class="img-icon" src="../../../assets/img/icons/preview.png"
               alt="预览">预览
        </el-button>
        <el-button type="text" class="favor-btn detail-ft-btn" @click="favorHandler">
          <img class="img-icon" src="../../../assets/img/icons/favor.png"
               alt="收藏">{{resourceDetail.isFavor?'已收藏':'收藏至我的资源库'}}
        </el-button>
        <el-button type="text" class="edit-btn detail-ft-btn" @click="editDetailHandler">
          <i class="el-icon-edit" style="padding-right: 12px"></i>编辑
        </el-button>
        <el-button class="auth-btn" circle @click="getResourceAuthHandler">获取授权</el-button>
      </div>
    </div>

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
