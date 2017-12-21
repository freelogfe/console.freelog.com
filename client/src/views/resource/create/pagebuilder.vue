<template>
  <section class="page-builder-wrapper">
    <h3 class="wrap-title">page builder</h3>
    <el-row :gutter="20" class="js-page-builder" style="height: 100%;display: inline-block">
      <el-col :span="4">
        <div class="query-wrapper">
          <el-input placeholder="请输入搜索内容" v-model="queryInput">
            <el-button slot="append" icon="el-icon-search" @click="queryHandler"></el-button>
          </el-input>
        </div>
        <el-row :gutter="5" ref="leftPanel" class="widgets-panel">
          <el-col :span="24" v-for="(widget, index) in widgets" :key="'widget'+index"
                  class="widget-item js-draggable-widget"
                  :data-index="index">
            <el-popover
              ref="widgetInfo"
              placement="bottom"
              width="400"
              v-model="widget.showInfo"
              trigger="manual">
              <div slot="reference">
                <el-card :body-style="{padding: 0}" class="js-widget widget-resource"
                         :data-index="index"
                         @mouseleave.native="hideInfoHandler(index)"
                         @mouseenter.native="showInfoHandler(index)">
                  <div style="padding: 14px;">
                    <span>{{widget.resourceName}}</span>
                  </div>
                </el-card>
              </div>
              <slot>
                <div class="widget-meta-info">
                  <ul>
                    <li v-for="(val, key) in widget">
                      {{key}}: {{val}}
                    </li>
                  </ul>
                </div>
              </slot>
            </el-popover>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="20" class="page-build-container" ref="editorWrapper">
        <div class="page-build-mask" ref="mask"></div>

        <!--#409EFF-->
        <div class="tool-bar">
          <el-radio-group v-model="editMode" @change="switchEditMode" :border="false">
            <el-radio-button :label="modes.code">
              <el-tooltip class="item" effect="dark" content="源码模式" placement="top">
                <i class="el-icon-fa-code" aria-hidden="true"></i>
              </el-tooltip>
            </el-radio-button>
            <el-radio-button :label="modes.view">
              <el-tooltip class="item" effect="dark" content="可视化模式" placement="top">
                <i class="el-icon-fa-eye" aria-hidden="true" title="可视化模式"></i>
              </el-tooltip>
            </el-radio-button>
          </el-radio-group>
          <el-tooltip class="item" effect="dark" content="全屏模式" placement="top">
            <el-button @click="enterFullscreen">
              <i class="el-icon-fa-arrows-alt" aria-hidden="true"></i>
            </el-button>
          </el-tooltip>
        </div>
        <div class="page-builder">
          <codemirror :code="code"
                      :options="editorOptions"
                      class="pb-edit-mode"
                      ref="codeArea"
                      @change="onEditorCodeChange">
          </codemirror>
          <iframe src="/resource/create/preview"
                  frameborder="0"
                  class="pb-view-mode"
                  ref="rightPanel"
                  v-show="editMode==modes.view"></iframe>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import PageBuilder from './pagebuilder'

  export default PageBuilder
</script>

<style lang="less" scoped>
  @import "pagebuilder.less";
</style>
