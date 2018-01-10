import PresentableSteps from '@/views/node/presentable/steps/index.vue'
import compiler from 'presentable_policy_compiler'


export default {
  name: 'presentable-policy',
  data() {
    return {
      policyText: ''
    }
  },
  props: {
    value: String
  },
  mounted() {
    this.policyText = this.value
  },
  methods: {
    textChange() {
      this.$emit('input', this.policyText)
    },
    validate() {
      var myBeautify = compiler.compile(this.policyText, 'beautify')
      if (!myBeautify.errorMsg) {
        this.policyText = myBeautify.stringArray.splice(1).join(' ').replace(/\n\s/g, '\n');
      } else {
        this.$message.error(myBeautify.errorMsg)
      }
    },
    submit(data) {
      if (!this.$route.query.contractId) {
        this.$message.error('没有资源Id, 请重新选择');
      }

      var nodeId = parseInt(this.$route.params.nodeId)

      Object.assign({
        name: this.formData.presentableName,
        nodeId: nodeId,
        contractId: this.$route.query.contractId,
        policyText: btoa(this.policyText),
        languageType: 'freelog_policy_lang'
      }, data)

      this.$services.presentables.post(data).then((res) => {
        var data = res.getData()
        if (!data) {
          this.$message.error(res.data.msg)
        } else {
          this.$message.success('presentable创建成功');
          this.$router.push({
            path: `/node/${nodeId}/presentable/detail#presentable`,
            query: {presentableId: data.presentableId}
          })
        }
      }).catch(this.$error.showErrorMessage)
    }
  }
}
