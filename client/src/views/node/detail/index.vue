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
              <i class="el-icon-fa-clipboard"></i>
            </a>
          </clip-board>
        </div>
      </div>
      <nav>
        <ul class="nav-list">
          <li class="nav-item">页面样式</li>
          <li class="nav-item">引用资源</li>
        </ul>
      </nav>
    </div>
    <div class="right-side-wrap">
      <div class="test" style="height: 3000px;"></div>
      <!--<component :is="nav.content" data=""></component>-->
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
