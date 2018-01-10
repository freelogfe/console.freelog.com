import {mapGetters} from 'vuex'
import PresentableSteps from '@/views/node/presentable/steps/index.vue'
import compiler from 'presentable_policy_compiler'
import FreelogTags from '@/components/Tags/index.vue'

export default {
  name: 'presentable-editor',
  data() {
    return {
      resourceType: '',
      validateLoading: false,
      submitLoading: false,
      options: [
        {value: 'widget', label: 'widget'},
        {value: 'file', label: 'file'}
      ],
      step: {
        active: 1
      },
      presentableDetail: {
        contract: {},
        resource: {}
      },
      headers: {},
      formData: {
        presentableTags: [],
        userPolicy: `For userA@userB :
        in initial :
        proceed to activate on accepting transaction of 100 to feth1026f01634a
        in activate :
        proceed to suspend on accepting license LicenseA
          I agree to authorize token in activate`,
        presentableName: ''
      },
      rules: {
        presentableName: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 3, max: 30, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  computed: mapGetters({
    session: 'session'
  }),
  components: {
    PresentableSteps,
    FreelogTags
  },
  mounted() {
    var qs = this.$route.query
    this.headers.Authorization = `Bearer ${this.session.token}`
    this.loadDetail(qs)
      .catch(this.$error.showErrorMessage)
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
    loadDetail(param) {
      return this.loadContractDetail(param.contractId)
        .then((contract) => {
          this.loadResourceDetail(contract.resourceId).then((resource) => {
            this.presentableDetail = {
              contract: contract,
              resource: resource
            }
            console.log(this.presentableDetail)
          })
        })
    },
    loadContractDetail(contractId) {
      return this.$services.contract.get(contractId)
        .then((res) => {
          if (res.data.errcode === 0) {
            return res.getData();
          } else {
            throw new Error(res.data.msg)
          }
        }).catch(this.$error.showErrorMessage)
    },
    loadResourceDetail(resId) {
      return this.$services.resource.get(resId).then((res) => {
        return res.getData()
      })
    },
    nextAction() {
      console.log('successfully upload!');
    },
    validate(formName) {
      var self = this;
      var myBeautify = compiler.compile(this.formData.userPolicy, 'beautify')
      this.formData.userPolicy = myBeautify.stringArray.splice(1).join(' ').replace(/\n\s/g, '\n')
      // this.validateLoading = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message.success('通过校验');
        } else {
          this.$message.error('未通过校验');
          return false;
        }
      });
    },
    submit() {
      this.submitLoading = true;
      if (!this.$route.query.contractId) {
        this.$message.error('没有资源Id, 请重新选择');
      }

      var nodeId = parseInt(this.$route.params.nodeId)
      var formData = this.formData
      this.$services.presentables.post({
        name: formData.presentableName,
        nodeId: nodeId,
        contractId: this.$route.query.contractId,
        policyText: btoa(formData.userPolicy),
        languageType: 'freelog_policy_lang',
        userDefinedTags: formData.presentableTags.join(',')
      }).then((res) => {
        var data = res.getData()
        this.submitLoading = false;
        if (!data) {
          this.$message.error(res.data.msg)
        } else {
          this.$message.success('presentable创建成功');
          this.step = {
            active: 3
          }
          this.$router.push({
            path: `/node/${nodeId}/presentable/detail#presentable`,
            query: {presentableId: data.presentableId}
          })
        }
      }).catch((err) => {
        this.submitLoading = false;
        this.$message.error(err.response.errorMsg);
      })
    }
  }
}
