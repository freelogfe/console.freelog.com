import compiler from 'presentable_policy_compiler'
import {RESOURCE_TYPES} from "@/config/resource";

export default {
  name: 'presentable-policy',
  data() {
    return {
      policyText: `For testUser1 :
  in initial :
    proceed to signing on accepting transaction of 200 to feth209fa4da1a4
  in signing:
    proceed to activate on accepting license license_A
  I agree to authorize token in activate`
    }
  },
  props: {
    value: String,
    showValidateButton: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  mounted() {
    if (this.value) {
      this.policyText = this.value
    }

    setTimeout(() => {
      this.textChange() //test
    }, 1e3)
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

      // Object.assign({
      //   name: this.formData.presentableName,
      //   nodeId: nodeId,
      //   contractId: this.$route.query.contractId,
      //   policyText: btoa(this.policyText),
      //   languageType: 'freelog_policy_lang'
      // }, data)

      this.$services.presentables.post({
        name: this.formData.presentableName,
        nodeId: nodeId,
        contractId: this.$route.query.contractId,
        policyText: btoa(this.policyText),
        languageType: 'freelog_policy_lang'
      }).then((res) => {
        var data = res.getData()
        if (!data) {
          this.$message.error(res.data.msg)
        } else {
          this.$message.success('presentable创建成功');
          this.$router.push({
            path: `/node/${nodeId}/presentable/detail#presentable`,
            query: {
              presentableId: data.presentableId,
              ispb: data.tagInfo.resourceInfo.resourceType === RESOURCE_TYPES.pageBuild
            }
          })
        }
      }).catch(this.$error.showErrorMessage)
    }
  }
}
