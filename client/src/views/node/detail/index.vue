<template>
  <section class="node-detail-container">
    <div class="node-nav-area">
      <div class="node-info-wrap">
        <h3 class="title">{{detail.nodeName}}</h3>
        <div class="node-link">{{detail.nodeDomain}}{{domainSuffix}}
          <clip-board
            style="display: inline-block"
            @copyDone="copyDoneHandler"
            :value="resolveDomain(detail)">
            <a href="javascript:;">
              <!--<i class="el-icon-fa-clipboard"></i>-->
              <i class="fl-icon-node-page fl-icon"></i>
            </a>
          </clip-board>
        </div>
      </div>
      <nav class="node-detail-nav-wrap">
        <ul class="nav-list">
          <li class="nav-item" :class="{active: nav.content===navItem.name}" @click="changePanelHandler(navItem.name)"
              v-for="navItem in NAV_TABS">{{navItem.title}}
          </li>
        </ul>
      </nav>

      <div class="node-status-info">
        <p>节点状态：</p>
        <el-button class="node-status-btn">未发布</el-button>
      </div>
    </div>
    <div class="right-side-wrap">
      <!--<div class="test" style="height: 3000px;"></div>-->
      <component :is="nav.content" data=""></component>
    </div>
  </section>
</template>

<script>
  import NodeDetail from './index'

  export default NodeDetail
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
