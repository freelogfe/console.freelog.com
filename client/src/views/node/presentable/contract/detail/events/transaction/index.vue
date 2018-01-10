<template>
  <div class="transaction-wrap">
    <el-form label-position="left" label-width="80px" :model="contractDetail">
      <el-form-item label="contractId">
        {{contractDetail.contractId}}
      </el-form-item>
      <el-form-item label="甲方">
        {{contractDetail.partyOne}}
      </el-form-item>
      <el-form-item label="乙方">
        {{contractDetail.partyTwo}}
      </el-form-item>
      <el-form-item label="转入账号">
        {{params.params[0]}}
      </el-form-item>
      <el-form-item label="转账金额">
        {{params.params[1]|humanizeCurrency}} {{unitType}}
      </el-form-item>
      <el-form-item label="转出账号">
        <el-select v-model="fromAccountId" size="small" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.accountId"
            :label="item.accountId"
            :value="item.accountId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支付密码">
        <el-input type="password" size="small" style="max-width: 300px;" v-model="password"
                  placeholder="请输入支付密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="doneHandler">取 消</el-button>
        <el-button type="primary" @click="pay">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/javascript">
  import TransactionEvent from './index.js'

  export default TransactionEvent
</script>

<style scoped>
  .transaction-wrap {
    width: 400px;
    margin: auto;
  }
</style>
