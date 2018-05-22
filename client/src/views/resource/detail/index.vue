<template>
  <section class="res-detail-wrap">
    <div class="res-detail-aside">
      <div class="op-btns">
        <el-button type="text" class="hide-btn" @click="hideAuthSchemeHandler" v-if="showAuthSchemes">
          <i class="el-icon-close"></i>
        </el-button>
        <el-button type="text"
                   @click="showAuthSchemeHandler"
                   class="show-btn"
                   v-else>
          <img class="auth-schems-img-icon" src="../../../assets/img/icons/scheme.png" alt="授权方案">
        </el-button>
      </div>
      <auth-scheme-detail class="auth-scheme-detail"
                          :selectedCallback="selectPolicyHandler"
                          :class="animateCls"
                          v-show="showAuthSchemes"></auth-scheme-detail>
    </div>

    <div class="res-detail-content" :style="{transform: contentTransform}">
      <div class="res-detail-hd clearfix">
        <div class="res-author-avatar">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb_dez7L9rZGrxliWIWRzbH6H0u0BMePCrTB6wVbLtcfrAMKII"
            alt="">
        </div>
        <div class="res-digest">
          <div class="res-title">{{resourceDetail.resourceInfo.resourceName}}</div>
          <div class="res-origin-info">
            <span class="res-author-name">by: {{resourceDetail.resourceInfo.userName}}</span>
            <span class="res-update-time">最近更新时间： {{resourceDetail.resourceInfo.updateDate|fmtDate}}</span>
          </div>
          <div class="res-type-info">
            <span class="res-type">{{resourceDetail.resourceInfo.resourceType}}</span>
            <span class="res-file-size">{{resourceDetail.resourceInfo._filesize}}</span>
          </div>
        </div>
      </div>
      <div class="res-detail-bd">
        <div class="res-detail-desc">{{resourceDetail.resourceInfo.description}}</div>
        <div class="res-detail-meta">
          <h3>meta</h3>
          <pre class="meta-info">{{JSON.stringify(resourceDetail.resourceInfo.meta, null, 4)}}</pre>
        </div>
      </div>
    </div>

    <div class="res-detail-ft">
      <div class="res-detail-ft-content">
        <el-button type="text" class="preview-btn" @click="previewHandler">
          <img class="img-icon" src="../../../assets/img/icons/preview.png"
               alt="预览">预览
        </el-button>
        <el-button type="text" class="favor-btn" @click="favorHandler">
          <img class="img-icon" src="../../../assets/img/icons/favor.png"
               alt="收藏">{{resourceDetail.isFavor?'已收藏':'收藏至我的资源库'}}
        </el-button>
        <el-button class="auth-btn" circle @click="getResourceAuthHandler">获取授权</el-button>
      </div>
    </div>

    <el-dialog title="请选择将授权的节点" :visible.sync="showNodesPanel">
      <el-select v-model="selectedNode" placeholder="请选择将授权的节点">
        <el-option
          v-for="item in nodes"
          :key="item.nodeId"
          :label="item.nodeName"
          :value="item.nodeId">
        </el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAuthHandler">取 消</el-button>
        <el-button type="primary" @click="confirmAuthHandler">确 定</el-button>
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
