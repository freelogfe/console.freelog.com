import compiler from '@freelog/presentable-policy-compiler'
import {RESOURCE_TYPES} from "@/config/resource";
import defaultPolicyTpls from './defaultPolicyTpls'
import PolicyTplList from '@/components/policyTplSelector/index.vue'

export default {
  name: 'presentable-policy',
  data() {
    return {
      policyText: '',
      policyTpls: [],
      defaultPolicyTpls: defaultPolicyTpls,
      queryPolicyTpl: '',
      showCustomPolicyTplDialog: false
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
  components: {PolicyTplList},
  watch: {
    value: function () {
      this.policyText = this.value
    }
  },
  mounted() {
    this.policyText = this.value
  },
  methods: {
    textChange() {
      this.$emit('input', this.policyText)
    },
    validate() {
      var myBeautify = compiler.beautify(this.policyText)
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

      this.$services.presentables.post({
        name: this.formData.presentableName,
        nodeId: nodeId,
        contractId: this.$route.query.contractId,
        policyText: btoa(this.policyText),
        languageType: 'freelog_policy_lang'
      }).then((res) => {
        var data = res.getData()
        if (res.data.errcode !== 0) {
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
    },
    loadCustomPolicyTpl() {
      return this.$services.policyTemplate.get({
        params: {
          templateType: 2,
          pageSize: 1e2
        }
      }).then((res) => {
        var data = res.getData()
        if (data) {
          return data.dataList
        } else {
          throw new Error(res.data.msg)
        }
      })
    },
    useCustomPolicyTpl() {
      this.loadCustomPolicyTpl()
        .then((list) => {
          this.policyTpls = list
          this.showCustomPolicyTplDialog = true
        })
    },
    selectPolicyTplHandler(data) {
      this.showCustomPolicyTplDialog = false
      this.policyText = data.template
      this.$emit('input', this.policyText)
    },
    filterHandler(list) {
      return list.filter((tpl) => {
        return this.queryPolicyTpl ? tpl.name.indexOf(this.queryPolicyTpl) > -1 : true
      })
    }
  }
}
