export default {
  name: 'transaction-event',
  data() {
    return {
      dialogVisible: true,
      options: [],
      account: '',
      password: ''
    }
  },
  mounted() {
    var self = this;
    this.$services.accounts.get().then(function (res) {
      var accounts = res.data.data;
      self.options = accounts;
    })
  },
  computed: {},
  watch: {
    showTransaction: function () {
      this.dialogVisible = this.showTransaction
    }
  },
  props: ['showTransaction', 'contractDetail', 'params'],
  methods: {
    payResultHandler(result) {
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
    pay() {
      console.log('params', this.params);
      var self = this;
      this.$services.pay.post({
        "targetId": self.contractDetail.contractId,
        "orderType": 1,
        "fromAccountId": self.account,
        "toAccountId": self.params.params[0],
        "amount": self.params.params[1],
        "password": self.password
      }).then((res) => {
        if (res.data.errcode === 0) {
          this.payResultHandler(res.data.data)
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(this.$error.showErrorMessage)
    }
  }
}
