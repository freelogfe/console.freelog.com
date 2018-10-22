<template>
  <div class="transaction-wrap">
    <el-alert
      v-if="tipMsg"
      :title="tipMsg"
      type="warning">
    </el-alert>

    <el-form label-position="left" class="small-el-form" label-width="80px" :model="contractDetail">
      <el-form-item label="合同ID" label-width="120px">
        {{contractDetail.contractId}}
      </el-form-item>
      <el-form-item label="甲方" label-width="120px">
        {{contractDetail.partyOne}}
      </el-form-item>
      <el-form-item label="乙方" label-width="120px">
        {{contractDetail.partyTwo}}
      </el-form-item>
      <el-form-item label="保证金转入账号" label-width="120px">
        <el-select :loading="isLoadingAccount" loading-text="正在获取账户中..." v-model="toAccountId" size="small" placeholder="请选择" @visible-change="selectVisibleChange">
          <el-option
            v-for="item in options"
            :key="item.accountId"
            :label="item.accountId"
            :value="item.accountId">
          </el-option>
        </el-select>
        <el-tooltip placement="top">
          <div slot="content">
            <p><a style="color: white" href="//www.testfreelog.com/accounts" target="_blank">没有账号？去添加一个</a></p>
          </div>
          <i class="el-icon-question"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item>
        <el-button @click="doneHandler">取 消</el-button>
        <el-button type="primary" @click="confiscate" :disabled="order.status ==1||order.status ==2">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/javascript">

  export default {
    name: 'escrow-confiscate',
    data() {
      return {
        options: [],
        toAccountId: '',
        tipMsg: '',
        order: {},
        showError: false,
        isLoadingAccount: false,
      }
    },
    mounted() {
      var self = this
      this.$services.accounts.get().then(function (res) {
        self.options = res.data.data
      })
    },
    computed: {

    },
    props: ['contractDetail', 'params'],
    methods: {
      selectVisibleChange(visible) {
        if (visible && this.options.length === 0) {
          this.isLoadingAccount = true
          this.$services.accounts.get()
            .then(res => {
              this.options = res.data.data
              this.isLoadingAccount = false
            })

        }
      },
      // 支付结果处理
      confiscatedResultHandler(result) {
        switch (result.status) {
          case 1:
            this.$message.success('支付进行中，稍后查询支付结果')
            break;
          case 2:
            this.$message.success('支付成功')
            break;
          case 3:
            this.$message.success('支付失败')
            break;
          default:
            this.$message.info('未知的支付状态')
        }
      },
      // 支付完成（即支付成功） 处理
      doneHandler(data) {
        if (this.order) {
          data = {
            shouldUpdate: true
          }
        }
        this.$emit('close', data)
      },
      checkOrderStatus(order) {
        if (!order) return

        this.order = order
        var msg
        switch (order.status) {
          case 1:
            msg = '没收进行中'
            break;
          case 2:
            msg = '已没收成功';
            break;
          case 3:
            msg = '没收失败';
            break;
        }

        this.tipMsg = msg
      },
      // 查询支付订单状态
      queryOrder() {
        // return this.$services.orderInfo.get({
        //   params: {
        //     targetId: this.contractDetail.contractId
        //   }
        // }).then((res) => {
        //   return res.getData()
        // })
      },
      // 没收保证金
      confiscate() {
        return
        this.$axios.post('/v1/contracts/events/escrowConfiscated', {
          contractId: this.contractId,
          eventId,
          toAccountId: this.toAccountId,
        })
        .then(resp => {
          if(resp.status === 200) {
            if (res.data.errcode === 0) {
              this.showError = false
              this.confiscatedResultHandler(res.data.data)
              this.doneHandler({shouldUpdate: true, data: res.data.data})
            } else {
              this.showError = true
              this.$message.error(res.data.msg)
            }
          }else {
            console.log('/v1/contracts/events/escrowConfiscated 请求失败！')
          }
        })
        .catch(e => {
          this.$error.showErrorMessage(e)
        })
      }
    }

  }
</script>

<style lang="less">

</style>
