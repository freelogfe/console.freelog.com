import compiler from 'freelog_policy_compiler'
import policy from "../../../../services/policy";

export default {
  name: 'resource-creator',
  data() {
    return {
      policyText: '',
      validateLoading: false,
      submitLoading: false,
      policyDetail: null,
      options: [
        {value: 'widget', label: 'widget'},
        {value: 'file', label: 'file'}
      ]
    }
  },
  mounted() {
    var self = this
    var resId = this.$route.query.resourceId
    this.loadPolicyDetail(resId).then((policy) => {
      self.policyDetail = policy;
      self.policyText = (policy && policy.policyText) || ''
    })
  },
  methods: {
    loadPolicyDetail(resId) {
      return this.$services.policy.get(resId)
        .then((res) => {
          return res.getData()
        })
    },
    validate() {
      console.log('validating');
      this.policyText = compiler.compile(this.policyText, 'beautify').stringArray.splice(1).join(' ').replace(/\n\s/g, '\n');
    },

    createHandler(data) {
      return this.$services.policy.post(Object.assign({
        resourceId: this.$route.query.resourceId,
      }, data)).then((res) => {
        this.submitLoading = false;
        this.$message.success('创建成功')
      }).catch((err) => {
        this.submitLoading = false;
        this.$message.error(err.response.errorMsg || err)
      })
    },
    updateHandler(data) {
      return this.$services.policy.put(this.policyDetail.resourceId, data)
        .then((res) => {
          this.submitLoading = false;
          this.$message.success('更新成功')
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
      console.log(this.policyText);
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
