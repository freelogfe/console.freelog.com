import FreelogTags from '@/components/Tags/index.vue'
import {RESOURCE_TYPES} from "@/config/resource";
import PresentablePolicy from '@/components/policyEditor/index.vue'
import compiler from '@freelog/presentable-policy-compiler'
import {cloneDeep} from 'lodash'


export default {
  name: 'presentable-editor',
  data() {
    return {
      rules: {
        name: [
          {required: true, message: '请输入presentable name', trigger: 'blur'}
        ]
      },
      inputData: {
        presentableName: '',
        policy: [],
        userDefinedTags: []
      }
    }
  },
  components: {
    FreelogTags,
    PresentablePolicy
  },
  props: {
    data: {
      type: Object
    }
  },
  watch: {
    data() {
      this.initView()
    }
  },
  mounted() {
    this.initView()
  },
  methods: {
    initView() {
      if (this.data.presentableId) {
        Object.keys(this.inputData).forEach(k => {
          this.inputData[k] = this.data[k]
        })
      }
    },
    validatePolicyHandler(detail) {
      if (detail.done) {
        this.$message.success('校验通过')
      }
    },
    changePolicyHandler() {

    },
    savePresentableHandler() {
      var policies = this.$refs.editor.getChangeData()
      var param = {
        // isOnline
        presentableName: this.inputData.presentableName
      };

      if (this.inputData.userDefinedTags.length) {
        param.userDefinedTags = this.inputData.userDefinedTags
      }

      if (Object.keys(policies).length) {
        param.policies = policies
      }

      this.$services.presentables.put(this.data.presentableId, param)
        .then((res) => {
          if (res.data.errcode === 0) {
            var data = res.getData()
            this.$emit('onSaveEnd', data)
            this.$message.success('更新成功')
          } else {
            this.$message.error(res.data.msg || '更新失败')
          }
        }).catch(this.$error.showErrorMessage)
    }
  }
}
