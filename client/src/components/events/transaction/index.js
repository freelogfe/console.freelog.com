export default {
  name: 'transaction-event',
  data() {
    return {
      dialogVisible:true,
      options: [],
      account: '',
      password: ''
    }
  },
  mounted() {
    var self = this;
    var accounts = this.$services.accounts.get().then(function(res) {
      var accounts = res.data.data;
      self.options = accounts;
    })
  },
  computed: {

  },
  watch: {
  dialogVisible  : function (val) {
    console.log('dialogVisible');
    // console.log('123213123',this.ok);
    //   this.dialogVisible  =this.ok
    },
    ok: function(val) {
      console.log('in ok');
      this.dialogVisible  =this.ok
    }
  },
  props: ['ok', 'contractDetail','params'],
  methods: {
    pay() {
      console.log('im pay');
      console.log('contractDetail', this.contractDetail.contractId);
      console.log('params', this.params);
      var self = this;
      // this.$services.pay.post({
      //   "targetId": self.contractDetail.contractId,
      //   "orderType": 1,
      //   "fromAccountId": self.account,
      //   "toAccountId": self.params.params[0],
      //   "amount": self.params.params[1],
      //   "password": self.password
      // })
      this.$services.eventTest.post({
        contractId:self.contractDetail.contractId,
        eventId:self.params.eventId
      })
      //改变状态测试用
    }
  }
}
