import FreelogTags from '@/components/Tags/index.vue'
import {RESOURCE_TYPES} from "@/config/resource";
import PresentablePolicy from '@/components/policyEditor/index.vue'

export default {
  name: 'presentable-editor',
  data() {
    return {
      rules: {
        name: [
          {required: true, message: '请输入presentable name', trigger: 'blur'}
        ]
      }
    }
  },
  components: {
    FreelogTags,
    PresentablePolicy
  },
  props: {
    data: {
      type: Object,
      default() {
        return {
          userDefinedTags: [],
          policyText: '',
          name: ''
        }
      }
    }
  },
  mounted() {

  },
  methods: {
    validatePolicyHandler(detail) {
      if (detail.done) {
        this.$message.success('校验通过')
      }
    }
  }
}
