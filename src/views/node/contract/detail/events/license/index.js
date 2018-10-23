export default {
  name: 'license-event',
  data() {
    return {
      accepted: false,
      licenses: []
    }
  },
  mounted() {
    this.loadLicenses()
  },

  props: ['contractDetail', 'params'],

  methods: {
    loadLicenses() {
      const promises = this.params.licenseIds.map(rid => this.loadLicenseContent(rid))

      Promise.all(promises).then((list) => {
        this.licenses = list
      }).catch(this.$error.showErrorMessage)
    },
    loadLicenseContent(resourceId) {
      return this.$axios.get(`/v1/auths/resource/${resourceId}.data`)
        .then((res) => {
          const error = res.getData().errcode
          if (error == 15) {
            this.$message.warning('协议格式不正确，请联系合约作者。')
            return
          }
          return res.getData()
        })
    },
    signHandler() {
      this.$services.signingLicenses.post({
        contractId: this.contractDetail.contractId,
        eventId: this.params.eventId,
        licenseIds: this.params.licenseIds,
        nodeId: this.$route.params.nodeId
      }).then((res) => {
        if (res.data.errcode === 0) {
          this.$message.success('执行成功')
          this.doneHandler(true)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    doneHandler(shouldUpdate) {
      this.$emit('close', { shouldUpdate })
    }
  }
}
