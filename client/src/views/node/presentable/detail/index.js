import compiler from '@freelog/presentable-policy-compiler'
import PresentablePolicy from '@/components/policyEditor/index.vue'
import FreelogTags from '@/components/Tags/index.vue'
import {RESOURCE_TYPES} from '@/config/resource'
import PresentableEditor from '../editor/index.vue'
import ResourceIntroInfo from '../../../resource/intro/index.vue'
import ResourceDataLoader from '@/data/resource/loader'
import SchemeDataLoader from '@/data/scheme/loader'

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
      if (!this.detail.resourceId) {
        return
      }
      this.presentableData = this.detail
      ResourceDataLoader.onloadResourceDetail(this.detail.resourceId).then(detail => {
        this.presentableData.resourceInfo = {...detail}
      });

      this.loadPresentableScheme();
    },
    loadPresentableScheme() {
      var contract = this.getPresentableContract()
      if (contract) {
        SchemeDataLoader.onloadSchemeDetail(contract.authSchemeId).then(scheme => {
          if (scheme) {
            for (let i = 0; i < scheme.policy.length; i++) {
              let policy = scheme.policy[i]
              if (policy.segmentId === contract.policySegmentId) {
                scheme.selectedPolicy = policy
                break;
              }
            }

            this.$set(this.presentableData, 'scheme', scheme)
          }
        })
      }
    },
    getPresentableContract() {
      var contracts = this.presentableData.contracts || []
      if (contracts.length) {
        let contract;
        for (let i = 0; i < contracts.length; i++) {
          contract = contracts[i];
          if (contract.resourceId === this.presentableData.resourceId) {
            return contract
          }
        }
      }

      return null
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
