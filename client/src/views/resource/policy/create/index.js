import {mapGetters} from 'vuex'
import compiler from 'freelog_policy_compiler'

export default {
  name: 'resource-creator',
  data() {
    return {
      textarea: 'For userA, userB in the following states: ' +
      'in initial:proceed to activatetwo on accepting license licenseA, licenseB and on contract_guaranty of 5000 refund after 1 day ' +
      'in activatetwo: proceed to activate on date 2012-12-12  ' +
      'in activate: proceed to activatetwo on the end of day ' +
      'in activatetwo: proceed to activate on 10 day after contract creation ' +
      'I agree to authorize token in begining, activate',
      resourceType: '',
      validateLoading: false,
      submitLoading: false,
      options: [
        {value: 'widget', label: 'widget'},
        {value: 'file', label: 'file'}
      ],
      headers: {}
    }
  },
  computed: mapGetters({
    session: 'session'
  }),
  mounted() {
    this.headers.Authorization = `Bearer ${this.session.token}`
  },
  methods: {
    errorHandler(err, file) {
      switch (err.status) {
        case 400:
          this.$message.error('不支持的文件类型');
          break;
        case 401:
          this.$message.error('权限未经验证');
          break;
      }
    },
    nextAction() {
      console.log('successfully upload!');
    },
    validate() {
      console.log('validating');
      this.textarea = compiler.compile(this.textarea, 'beautify').stringArray.splice(1).join(' ').replace(/\n\s/g, '\n');
      // this.validateLoading = true;
    },
    submit() {
      this.submitLoading = true;
      if (!this.$route.query.resourceId) {
        this.$message.error('没有资源Id, 请重新选择');
      }
      ;
      console.log(this.textarea);
      this.$services.policy.post({
        resourceId: this.$route.query.resourceId,
        policyText: btoa(this.textarea),
        languageType: 'freelog_policy_lang'
      }).then((res) => {
        if (res.data.ret != 0) {
          this.$message.error(res.data.msg);
        } else {
          this.$message.success('创建成功');
        }
        this.submitLoading = false;
      })
    }
  }
}
