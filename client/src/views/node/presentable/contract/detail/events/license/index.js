export default {
  name: 'license-event',
  data() {
    return {
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
  props: ['contractDetail', 'params'],

  methods: {
    signHandler() {
      this.$services.eventTest.post({
        contractId: this.contractDetail.contractId,
        eventId: this.params.eventId
      }).then(() => {
        this.$message.success('执行成功')
        this.$emit('update')
        this.doneHandler()
      })
    },
    doneHandler() {
      this.$emit('close')
    }
  }
}
