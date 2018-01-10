<template>
<div class="">
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%">
    <p>您将签署协议号为: </p>

    <span slot="footer" class="dialog-footer">



      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirm()">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script type="text/javascript">
  import TransactionEvent from './index.js'
  export default TransactionEvent
</script>
