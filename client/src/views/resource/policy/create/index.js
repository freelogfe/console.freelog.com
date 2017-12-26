import compiler from 'freelog_policy_compiler'
import policy from "../../../../services/policy";

export default {
  name: 'resource-creator',
  data() {
    return {
      policyText: `For testUser@test.com and users in LoginUser in the following states:
  in initial :
    proceed to signing on accepting transaction of 100 to feth1026f01634a
  in signing:
    proceed to activate on accepting license license_A
  I agree to authorize token in activate`,
      validateLoading: false,
      submitLoading: false,
      policyDetail: null,
      resource: null,
      options: [
        {value: 'widget', label: 'widget'},
        {value: 'file', label: 'file'}
      ]
    }
  },
  mounted() {
    var self = this
    var resId = this.$route.query.resourceId
    if (resId) {
      this.loadResourceData(resId)
        .then((detail) => {
          console.log(detail)
          self.resource = detail
        })
    }
    this.loadPolicyDetail(resId).then((policy) => {
      if (policy) {
        self.policyDetail = policy
        self.policyText = policy.policyText
      }
    })
  },
  methods: {
    loadResourceData(param) {
      return this.$services.resource.get(param || {})
        .then((res) => {
          return (this.detail = res.getData());
        }).catch((err) => {
          this.$message.error(err.response.errorMsg || err)
        })
    },
    loadPolicyDetail(resId) {
      return this.$services.policy.get(resId)
        .then((res) => {
          return res.getData()
        })
    },
    validate() {
      var myBeautify = compiler.compile(this.policyText, 'beautify')
      if (!myBeautify.errorMsg) {
        this.policyText = myBeautify.stringArray.splice(1).join(' ').replace(/\n\s/g, '\n');
      } else {
        this.$message.error(myBeautify.errorMsg)
      }
    },

    createHandler(data) {
      var resId = this.$route.query.resourceId
      return this.$services.policy.post(Object.assign({
        resourceId: resId,
      }, data)).then((res) => {
        this.submitLoading = false;
        if (res.data.errcode === 0) {
          this.$message.success('创建成功')
          setTimeout(() => {
            this.$router.push({path: '/resource/detail/edit', query: {resourceId: resId}})
          }, 5e2)
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch((err) => {
        this.submitLoading = false;
        this.$message.error(err.response.errorMsg || err)
      })
    },
    updateHandler(data) {
      return this.$services.policy.put(this.policyDetail.resourceId, data)
        .then((res) => {
          this.submitLoading = false;
          if (res.data.errcode === 0) {
            this.$message.success('更新成功')
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch((err) => {
          this.submitLoading = false;
          this.$message.error(err.response.errorMsg || err)
        })
    },
    submit() {
      this.submitLoading = true;
      if (!this.$route.query.resourceId) {
        this.$message.error('没有资源Id, 请重新选择');
      }
      var data = {
        policyText: btoa(this.policyText),
        languageType: 'freelog_policy_lang'
      };

      if (this.policyDetail) {
        this.updateHandler(data)
      } else {
        this.createHandler(data)
      }
    }
  }
}
