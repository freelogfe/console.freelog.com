import resourceCompiler from '@freelog/resource-policy-compiler'
import presentableCompiler from '@freelog/presentable-policy-compiler'

import PolicyTemplateDetailInfo from '@/components/detail-info/policyTemplate.vue'
import rules from '../rules'
import * as utils from '../utils'

const MODE = {
  VIEW: 'view',
  EDIT: 'edit'
};

export default {
  name: 'policy-tpl-detail',
  data() {
    return {
      mode: MODE.VIEW,
      detail: {},
      rules: rules
    }
  },
  components: {
    PolicyTemplateDetailInfo
  },
  computed: {
    isEditMode() {
      return this.mode === MODE.EDIT
    }
  },
  mounted() {
    var query = this.$route.query
    if (query.id) {
      this.loadDetail(query.id)
        .then((data) => {
          this.detail = data
        })
    } else {
      this.$message.error('参数有误')
    }
  },
  methods: {
    loadDetail(id) {
      return this.$services.policyTemplate.get(id)
        .then((res) => {
          return res.getData()
        })
    },
    changeModeHandler() {
      var mode = this.mode;
      if (mode === MODE.EDIT) {
        this.$refs.detailForm.validate((valid) => {
          console.log('valid', valid)
          if (!valid) {
            return
          }
          this.validatePolicy().then((err) => {
            if (err) {
              this.$message.error(err)
            } else {
              this.saveDetail()
              this.mode = MODE.VIEW
            }
          })
        })
      } else {
        this.mode = MODE.EDIT
      }
    },
    validatePolicy() {
      var promise = Promise.resolve()
      var tpl = this.detail.template
      var isNodeType = (this.type === 'node')
      var ret = isNodeType ? presentableCompiler.compile(tpl) : resourceCompiler.compile(tpl);

      if (!ret.errorMsg) {
        this.detail.template = isNodeType ? presentableCompiler.beautify(tpl) : resourceCompiler.beautify(tpl)
      }

      return promise.then(() => {
        return ret.errorMsg
      })
    },
    cancelEditMode() {
      this.mode = MODE.VIEW
    },
    saveDetail() {
      this.$services.policyTemplate.put(this.detail.id, {
        name: this.detail.name,
        template: btoa(this.detail.template)
      })
    },
    resolveType(type) {
      return utils.resolveType(type)
    },
    resolveStatus(status) {
      return utils.resolveStatus(status)
    }
  }
}
