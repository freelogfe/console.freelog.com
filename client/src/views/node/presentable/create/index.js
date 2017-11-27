import {mapGetters} from 'vuex'
import PresentableSteps from '@/views/node/presentable/steps/index.vue'
import compiler from 'presentable_policy_compiler'

export default {
  name: 'presentable-creator',
  data() {
    return {
      resourceType:'',
      validateLoading:false,
      submitLoading:false,
      options: [
        {value: 'widget', label: 'widget'},
        {value: 'file', label: 'file'}
      ],
      step: {
        active: 1
      },
      headers: {},
      formData: {
              textarea: 'For userA, userB in the following states: '+
           'in initial:proceed to activatetwo on accepting license licenseA, licenseB and on contract_guaranty of 5000 refund after 1 day '+
           'in activatetwo: proceed to activate on date 2012-12-12  ' +
           'in activate: proceed to activatetwo on the end of day ' +
           'in activatetwo: proceed to activate on 10 day after contract creation '+
        'I agree to authorize token in begining, activate',
        presentableName: ''
      },
      rules: {
        presentableName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 30, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: mapGetters({
    session: 'session'
  }),
  components: {PresentableSteps},
  mounted(){
    this.headers.Authorization =  `Bearer ${this.session.token}`
  },
  methods: {
    errorHandler(err, file){
      switch (err.status){
        case 400:
          this.$message.error('不支持的文件类型');break;
        case 401:
          this.$message.error('权限未经验证');break;
      }
    },
    nextAction () {
      console.log('successfully upload!');
    },
    validate (formName) {
      this.formData.textarea =compiler.compile(this.formData.textarea, 'beautify').stringArray.splice(1).join(' ').replace(/\n\s/g,'\n');
      // this.validateLoading = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message.info('通过校验');
        } else {
          this.$message.info('未通过校验');
          return false;
        }
      });
    },
    submit () {
      this.submitLoading = true;
      if (!this.$route.query.contractId) {
        this.$message.error('没有资源Id, 请重新选择');
      };

      this.$services.presentables.post({
        name: this.formData.presentableName,
        nodeId:Number(this.$route.params.nodeId),
        contractId: this.$route.query.contractId,
        policyText: btoa(this.formData.textarea),
        languageType: 'freelog_policy_lang'
      }).then(() => {
        this.submitLoading = false;
        this.$message.success('presentable创建成功');
        this.step = {
          active: 3
        }
      }).catch((err)=> {
        this.submitLoading = false;
        this.$message.error(err.response.errorMsg);
      })
    }
  }
}
