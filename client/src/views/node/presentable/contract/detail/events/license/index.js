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
      var promises = this.params.params.map((rid) => {
        return this.loadLicenseContent(rid)
      })

      Promise.all(promises).then((list) => {
        this.licenses = list
      }).catch(this.$error.showErrorMessage)
    },
    loadLicenseContent(resourceId) {
      return this.$axios.get(`/v1/auths/resource/${resourceId}.data`)
        .then((res) => {
          return res.getData()
        })
    },
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
