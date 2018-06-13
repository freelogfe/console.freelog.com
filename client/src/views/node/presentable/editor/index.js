import TagsEditor from '@/components/Tags/index.vue'
import {RESOURCE_TYPES} from "@/config/resource";
import PresentablePolicy from '@/components/policyEditor/index.vue'
import compiler from '@freelog/presentable-policy-compiler'
import {cloneDeep} from 'lodash'
import CONFIG from '@/config/index'

const STATUS_TIPS = CONFIG.PRESENTABLE_STATUS_TIPS

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
      },
      userDefinedTags: []
    }
  },
  components: {
    TagsEditor,
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
  computed: {
    isValidPolicy() {
      return this.inputData.policy.some(p => {
        return p.status === 1
      })
    }
  },
  mounted() {
    this.initView()
  },
  methods: {
    initView() {
      if (this.data.presentableId) {
        Object.assign(this.inputData, this.data)
        this.userDefinedTags = this.inputData.userDefinedTags
      }
    },
    validatePolicyHandler(detail) {
      if (detail.done) {
        this.$message.success('校验通过')
      }
    },
    changePolicyHandler() {

    },
    formatPresentable(presentable) {
      presentable._statusInfo = STATUS_TIPS[presentable.status]
      presentable.isReady = (presentable.status & 3) === 3
    },
    savePresentableHandler() {
      var policies = this.$refs.editor.getChangeData()
      var param = {
        // isOnline
        presentableName: this.inputData.presentableName
      };
      param.userDefinedTags = this.userDefinedTags
      if (Object.keys(policies).length) {
        param.policies = policies
      }

      this.$services.presentables.put(this.data.presentableId, param)
        .then((res) => {
          if (res.data.errcode === 0) {
            var data = res.getData()
            Object.assign(this.data, data)
            this.formatPresentable(this.data)
            this.$emit('onSaveEnd', data)
            this.$message.success('更新成功')
          } else {
            this.$message.error(res.data.msg || '更新失败')
          }
        }).catch(this.$error.showErrorMessage)
    }
  }
}
