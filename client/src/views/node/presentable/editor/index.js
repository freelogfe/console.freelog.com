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
          policyText: `for NODES :
  in initial :
    proceed to signing on transaction of 200 to feth209fa4da1a4
  in signing:
    proceed to <activate> on license license_A`,
          name: ''
        }
      }
    }
  },
  mounted() {

  },
  methods: {}
}
