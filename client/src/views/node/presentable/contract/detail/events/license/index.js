export default {
  name: 'license-event',
  data() {
    return {
      accepted: false,
      licenses: []
    }
  },
  mounted() {
      this.params.params.forEach((param)=> {
        this.$axios.get('/v1/auths/resource/'+param+'.data').then((res)=>{
          console.log(res.headers);
        })
      })
  },
  props: ['contractDetail', 'params'],

  methods: {
    signHandler() {
      this.$services.signingLicenses.post({
        contractId: this.contractDetail.contractId,
        eventId: this.params.eventId,
        licenseIds: this.params.params
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
