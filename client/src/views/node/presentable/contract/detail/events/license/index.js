export default {
  name: 'transaction-event',
  data() {
    return {
      dialogVisible: true,
      options: [{
        accountId:'123'
      }],
      account: '',
      password: ''
    }
  },
  mounted() {
    console.log('contractDetail', this.contractDetail);
    console.log('selectedContractEvent',this.params);
  },
  props: ['ok', 'contractDetail', 'params'],
  watch: {
    ok: function (val) {
      this.dialogVisible = this.ok
    }
  },
  methods: {
    confirm() {
      console.log('333333');
      // this.$services.signingLicenses.bind(this).post({
      //   contractId: this.contractDetail.contractId,
      //   eventId: this.params.eventId,
      //   licenseIds: this.params.params
      // })
    }
  }
}
