import FreelogTags from '@/components/Tags/index.vue'
import {RESOURCE_TYPES} from "@/config/resource";
import PresentablePolicy from '../policy/index.vue'

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
          policyText: `For userA@userB :
        in initial :
        proceed to <activate> on transaction of 100 to feth1026f01634a
        in <activate> :
        proceed to suspend on license LicenseA`,
          name: ''
        }
      }
    }
  },
  mounted() {

  },
  methods: {
  }
}