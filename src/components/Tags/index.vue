<template>
  <div>
    <el-tag
      class="user-defined-tag"
      :key="tag"
      v-for="tag in tags"
      closable
      size="small"
      :disable-transitions="false"
      @close="handleClose(tag)">
      {{tag}}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="mini"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm">
    </el-input>
    <el-button v-else class="button-new-tag" round size="mini" @click="showInput"><i class="el-icon-plus"></i> {{actionText}}</el-button>
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
    border-radius: 20px;
    height: 28px;
    line-height: 24px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .button-new-tag {
    background-color: white;
  }
  .input-new-tag {
    width: 90px;
    vertical-align: bottom;
  }

</style>
