<template>
<div class="">
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%">
    <p>请选择转出账号: </p>
    <el-select v-model="account" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.accountId"
        :label="item.accountId"
        :value="item.accountId">
      </el-option>
    </el-select>
    <p>转出金额：{{params.params[1]}}</p>
    <p>请输入支付密码: </p>
    <el-input type="password" v-model="password" placeholder="请输入支付密码"></el-input>
    <span slot="footer" class="dialog-footer">


      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="pay()">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script type="text/javascript">
  import TransactionEvent from './index.js'
  export default TransactionEvent
</script>
