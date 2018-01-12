export default {
  name: 'license-event',
  data() {
    return {
      accepted: false
    }
  },
  mounted() {
    console.log(this.contractDetail, this.params)
  },
  props: ['contractDetail', 'params'],

  methods: {
    signHandler() {
      this.$services.eventTest.post({
        contractId: this.contractDetail.contractId,
        eventId: this.params.eventId
      }).then(() => {
        this.$message.success('执行成功')
        this.doneHandler(true)
      })
    },
    doneHandler(shouldUpdate) {
      this.$emit('close', {shouldUpdate})
    }
  }
}
