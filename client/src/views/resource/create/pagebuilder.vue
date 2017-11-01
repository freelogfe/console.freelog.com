<template>
  <section class="page-builder-wrapper">
    <h3>page builder</h3>
    <el-dialog
      :title="(currentEditWidget && currentEditWidget.widgetData.resourceName) + ' widget样式'"
      :visible.sync="dialogVisible"
      size="tiny">
      <textarea class="widget-style-editor" rows="10" v-model="widgetStyle"></textarea>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialog">取 消</el-button>
        <el-button type="primary" @click="updateWidgetHandler">确 定</el-button>
      </div>
    </el-dialog>


    <el-row :gutter="20" class="js-page-builder">
      <el-col :span="4">
        <div class="query-wrapper">
          <el-input placeholder="请输入搜索内容" v-model="queryInput">
            <el-button slot="append" icon="search" @click="queryHandler"></el-button>
          </el-input>
        </div>
        <el-row :gutter="5" ref="leftPanel" class="widgets-panel">
          <el-col :span="12" v-for="(widget, index) in widgets" :key="'widget'+index" class="widget-item js-draggable-widget"
                  :data-index="index">
            <el-popover
              ref="widgetInfo"
              placement="bottom"
              width="400"
              v-model="widget.showInfo"
              trigger="manual">
              <div slot="reference">
                <div class="js-widget-wrapper">
                  <div class="action-panel">
                    <div class="action-btns">
                      <i class="el-icon-delete" data-action="delete"></i>
                      <i class="el-icon-edit" data-action="edit"></i>
                    </div>
                  </div>
                  <el-card :body-style="{padding: 0}" class="js-widget widget-resource"
                           :data-index="index"
                           @mouseleave.native="hideInfoHandler(index)"
                           @mouseenter.native="showInfoHandler(index)">
                    <div style="padding: 14px;">
                      <span>{{widget.resourceName}}</span>
                    </div>
                  </el-card>
                </div>
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
      <el-col :span="20">
        <div class="page-builder" ref="rightPanel" @click="widgetActionHandler"></div>
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
