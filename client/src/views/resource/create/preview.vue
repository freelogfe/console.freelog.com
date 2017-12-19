<template>
  <div class="page-builder-wrapper" ref="wrapper">
    <div class="edit-mask" ref="editMask">
      <div class="tool-wrap">
        <el-tooltip class="item" effect="dark" content="设置组件" placement="top">
          <i class="el-icon-setting" @click="widgetActionHandler" data-action="edit"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除组件" placement="top">
          <i class="el-icon-delete" @click="widgetActionHandler" data-action="delete"></i>
        </el-tooltip>
      </div>
      <div class="widget-tip">{{(currentEditWidget && currentEditWidget.widgetData.resourceName)}}</div>
    </div>
    <el-dialog
      :title="(currentEditWidget && currentEditWidget.widgetData.resourceName) + ' 组件样式'"
      :visible.sync="dialogVisible"
      size="small">
      <textarea class="widget-style-editor" rows="10" v-model="widgetStyle"></textarea>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialog">取 消</el-button>
        <el-button type="primary" @click="updateWidgetHandler">确 定</el-button>
      </div>
    </el-dialog>
    <div class="page-build-container" ref="page"></div>
    <div class="preview-tip">拖拽组件进来</div>
  </div>
</template>

<script>
  import PageBuilderPreview from './preview'

  export default PageBuilderPreview
</script>

<style lang="less">
  .app-wrapper {
    height: 100%;
  }
  @import "preview.less";
</style>
