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
      currentTool: '',
      editingIndex: -1,
      policyList: []
    }
  },
  props: {
    value: {
      type: [Array, Object],
      default() {
        return ''
      }
    },

    showValidate: {
      type: Boolean,
      default() {
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
    policyList: {
      handler: function (val, oldVal) {
        this.$emit('change', this.policyList)
      },
      deep: true
    },
    'value.policy': {
      handler: function (val, oldVal) {
        this.fillPolicyList(this.value)
      },
      deep: true
    }
  },
  mounted() {
    if (!this.config.type) {
      this.config.type = (this.$route.meta.type === 'node') ? 'presentable' : 'resource'
    }
    this.fillPolicyList(this.value)
  },
  methods: {
    fillPolicyList(list) {
      if (list.policy) {
        this.policyList = list.policy.map(p => {
          var segmentText = p.segmentText
          var _compiler = compiler[this.config.type];
          var ret = _compiler.compile(segmentText)
          if (!ret.errorMsg) {
            segmentText = _compiler.beautify(segmentText);
          }
          return {
            policyName: p.policyName || '',
            policyText: segmentText,
            policySegmentId: p.segmentId,
            disabled: p.status === 0
          }
        });
      }

      if (!this.policyList.length) {
        this.addNewPolicy()
      }
    },
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
    addNewPolicy() {
      this.policyList.push({
        policyName: '未命名策略',
        policyText: '',
        disabled: false
      })
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
    getCurrentEditingPolicy() {
      return this.policyList[this.editingIndex];
    },
    selectPolicyTemplateCallback(data) {
      var policy = this.getCurrentEditingPolicy()
      policy.policyText = data.template;
    },
    selectLicenseIdCallback(data) {
      var policy = this.getCurrentEditingPolicy()
      policy.policyText += ` ${data.licenseId}`
    },
    changePolicyText(policy) {
      //to validate
    },
    focusInputHandler(ev, index) {
      this.editingIndex = index
    },
    switchPolicyStatusHandler(policy, index) {
      if (policy.policySegmentId) {
        policy.disabled = !policy.disabled
      } else {
        this.$confirm('确定删除当前未保存策略？')
          .then(() => {
            this.policyList.splice(index, 1)
          }).catch(() => {
        })
      }
    },
    getChangeData() {
      var policies = {}
      this.policyList.forEach(p => {
        if (p.policySegmentId) {
          policies.updatePolicySegments = policies.updatePolicySegments || []
          policies.updatePolicySegments.push({
            policySegmentId: p.policySegmentId,
            policyName: p.policyName,
            status: p.disabled ? 0 : 1
          })
        } else if (p.policyText) {
          policies.addPolicySegments = policies.addPolicySegments || []
          policies.addPolicySegments.push({
            policyName: p.policyName,
            policyText: btoa(p.policyText)
          })
        }
      });
      return policies
    }
  }
}
