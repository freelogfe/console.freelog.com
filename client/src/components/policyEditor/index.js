import resourceCompiler from '@freelog/resource-policy-compiler'
import presentableCompiler from '@freelog/presentable-policy-compiler'

import PolicyTemplateSelector from './tool/policyTpl.vue'
import QueryPolicyLicense from './tool/queryLicense.vue'

const compiler = {
  resource: resourceCompiler,
  presentable: presentableCompiler
}

export default {
  name: 'policy-editor',
  data() {
    return {
      submitLoading: false,
      policyText: this.value,
      showCustomPolicyTplDialog: false,
      currentTool: ''
    }
  },
  props: {
    value: {
      type: String,
      default() {
        return ''
      }
    },

    showValidate: {
      type: Boolean,
      default(){
        return true
      }
    },
    config: {
      type: Object,
      default() {
        return {
          type: ''  //resource or presentable
        }
      }
    }
  },

  components: {PolicyTemplateSelector, QueryPolicyLicense},
  watch: {
    value: function () {
      this.policyText = this.value || ''
    }
  },
  mounted() {
    if (!this.config.type) {
      this.config.type = (this.$route.meta.type === 'node') ? 'presentable' : 'resource'
    }
  },
  methods: {
    validate() {
      var _compiler = compiler[this.config.type];
      var ret = _compiler.compile(this.policyText)
      if (!ret.errorMsg) {
        this.policyText = _compiler.beautify(this.policyText);
        this.$emit('input', this.policyText)
        this.$emit('validate', {done: true})
      } else {
        this.$emit('validate', {
          done: false,
          error: {
            message: ret.errorMsg
          }
        })
        this.$message.error(ret.errorMsg) //外层控制??
      }
    },
    createHandler(data) {
      return this.$services.policy.post(data)
    },
    showToolHandler(toolName) {
      this.currentTool = toolName;
      this.showCustomPolicyTplDialog = true
    },
    operationCallback(data) {
      this.showCustomPolicyTplDialog = false;

      if (data && data.name) {
        var name = `${data.name}Callback`;
        this[name] && this[name](data.data);
        this.$emit('input', this.policyText)
      }
    },
    selectPolicyTemplateCallback(data) {
      this.policyText = data.template;
    },
    selectLicenseIdCallback(data) {
      this.policyText += ` ${data.licenseId}`
    },
    changePolicyText(){
      this.$emit('input', this.policyText)
    }
  }
}
