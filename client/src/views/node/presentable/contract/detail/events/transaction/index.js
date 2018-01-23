import ACCOUNT_CONFIG from '@/config/account'

export default {
  name: 'transaction-event',
  data() {
    return {
      options: [],
      fromAccountId: '',
      password: '',
      tipMsg: '',
      order: {}
    }
  },
  mounted() {
    var self = this;
    this.$services.accounts.get().then(function (res) {
      self.options = res.data.data;
    })
    this.queryOrder()
      .then(this.checkOrderStatus.bind(this))
  },
  computed: {
    unitType() {
      // 可视化转换
      // var types = Object.values(ACCOUNT_CONFIG)
      // var accountType = this.fromAccountId.substr(0, 4)
      // var result = {}
      // for (let i = 0, len = types.length; i < len; i++) {
      //   if (types[i].abbr === accountType) {
      //     result = types[i]
      //     break;
      //   }
      // }
      return this.params.params[0].substr(0, 4)
    }
  },
  props: ['contractDetail', 'params'],
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
          msg = '支付进行中'
          break;
        case 2:
          msg = '已支付成功';
          break;
        case 3:
          msg = '支付失败';
          break;
      }

      this.tipMsg = msg
    },
    queryOrder() {
      return this.$services.orderInfo.get({
        params: {
          targetId: this.contractDetail.contractId
        }
      }).then((res) => {
        return res.getData()
      })
    },
    pay() {
      var self = this;
      this.$services.pay.post({
        "targetId": self.contractDetail.contractId,
        "orderType": 1,
        "fromAccountId": self.fromAccountId,
        "toAccountId": self.params.params[0],
        "amount": self.params.params[1],
        "password": self.password
      }).then((res) => {
        if (res.data.errcode === 0) {
          this.payResultHandler(res.data.data)
          this.doneHandler({shouldUpdate: true, data: res.data.data})
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(this.$error.showErrorMessage)
    }
  }
}
