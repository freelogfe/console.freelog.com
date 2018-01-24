import compiler from 'freelog_policy_compiler'

export default {
  name: 'policy-editor',
  data() {
    return {
      submitLoading: false,
      policyText: this.value || `for group_user_aASaa , 13480125810 :
  in initial :
    proceed to <signing> on transaction of 100 to feth1026f01634a
  in <signing> :
    proceed to activate on license license_A`,
      options: [
        {value: 'widget', label: 'widget'},
        {value: 'file', label: 'file'}
      ]
    }
  },
  props: {
    value: String
  },
  watch: {
    value: function () {
      this.policyText = this.value
    }
  },
  mounted() {
    this.$on('submit', this.submit.bind(this))
  },
  methods: {
    validate() {
      var myBeautify = compiler.compile(this.policyText, 'beautify')

      if (!myBeautify.errorMsg) {
        this.policyText = myBeautify.stringArray.splice(1).join(' ').replace(/\n\s/g, '\n');
      } else {
        this.$message.error(myBeautify.errorMsg)
      }
    },
    createHandler(data) {
      return this.$services.policy.post(data)
    },
    updateHandler(resourceId, data) {
      return this.$services.policy.put(resourceId, data)
    },
    submit(resourceId) {
      if (!this.policyText || this.value === this.policyText) {
        return Promise.resolve(true)
      }

      if (this.submitLoading) {
        return
      }
      this.submitLoading = true;

      var data = {
        policyText: btoa(this.policyText),
        languageType: 'freelog_policy_lang'
      };

      return new Promise((resolve, reject) => {
        var promise
        if (this.policyDetail) {
          promise = this.updateHandler(resourceId, data)
        } else {
          data.resourceId = resourceId
          promise = this.createHandler(data)
        }
        promise.then((res) => {
          this.submitLoading = false;
          (res.data.errcode === 0) ? resolve(true) : reject(res.data.msg)
        }).catch((err) => {
          this.submitLoading = false;
          reject(err.response.errorMsg || err)
        })
      })
    }
  }
}
