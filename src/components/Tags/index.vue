<template>
  <div>
    <el-tag
      class="user-defined-tag"
      :key="tag"
      v-for="tag in tags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)">
      {{tag}}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm">
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput"><i class="el-icon-plus"></i> {{actionText}}</el-button>
  </div>
</template>

<script>
import FreelogTags from './index'

export default FreelogTags
</script>

<style lang="less" scoped>
  .user-defined-tag,
  .input-new-tag{
    margin-bottom: 10px;
  }
  .el-tag {
    margin-right: 10px;
  }
  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    border-radius: 4px;
    background-color: transparent;
  }
  .input-new-tag {
    width: 90px;
    vertical-align: bottom;
  }

</style>
