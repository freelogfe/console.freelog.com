import compiler from '@freelog/presentable-policy-compiler'
import PresentablePolicy from '@/components/policyEditor/index.vue'
import FreelogTags from '@/components/Tags/index.vue'
import {RESOURCE_TYPES} from '@/config/resource'
import PresentableEditor from '../editor/index.vue'
import ResourceIntroInfo from '../../../resource/intro/index.vue'
import ResourceDataLoader from '@/data/resource/loader'

export default {
  name: 'presentable-detail',
  data() {
    return {
      showBindWidgetDialog: false,
      loading: false,
      bindWidget: {},
      presentableDetail: {},
      activeTabName: 'resource',
      nodeId: this.$route.params.nodeId,
      editPresentable: {
        name: '',
        policyText: '',
        userDefinedTags: []
      },
      presentableData: {
        resourceInfo: {}
      }
    }
  },

  props: {
    detail: {
      type: Object
    }
  },
  components: {
    PresentablePolicy,
    FreelogTags,
    PresentableEditor,
    ResourceIntroInfo
  },

  computed: {},

  watch: {
    'detail.presentableId': function () {
      this.initView()
    }
  },
  mounted() {
    this.initView()
  },
  methods: {
    initView() {
      this.presentableData = this.detail
      ResourceDataLoader.onloadResourceDetail(this.detail.resourceId).then(detail => {
        this.presentableData.resourceInfo = {...detail}
      })
      console.log('presentableData', this.presentableData)
    },
    gotoSchemeDetailHandler() {
      this.$router.push({
        path: `/node/${this.$route.params.nodeId}/presentable/${this.detail.presentableId}/scheme_detail`,
        query: {resourceId: this.detail.resourceId}
      })
    },
    savePresentableEnd(data) {
      this.presentableData = {...data}
    }
  }
}
