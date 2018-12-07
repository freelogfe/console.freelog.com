import PresentablePolicy from '@/components/policyEditor/index.vue'
import FreelogTags from '@/components/Tags/index.vue'
import {onloadResourceDetail} from '@/data/resource/loader'
import {onloadSchemeDetail} from '@/data/scheme/loader'
import {onloadPresentableDetail} from '@/data/presentable/loader'

import PresentableEditor from '../editor/index.vue'
import ResourceIntroInfo from '../../../resource/intro/index.vue'
import PresentableDetailHeader from './header.vue'

export default {
  name: 'presentable-detail',
  data() {
    return {
      params: {},
      loading: false,
      activeTabName: 'policy-manager', //contract-manager, schema-manager
      resourceInfo: {},
      presentableInfo: {},
    }
  },

  props: {
    detail: {
      type: Object
    }
  },
  components: {
    PresentableDetailHeader,
    // FreelogTags,
    // PresentableEditor,
    // ResourceIntroInfo
  },

  computed: {},

  watch: {
    '$route': function () {
      this.initView()
    }
  },
  mounted() {
    this.initView()
  },
  methods: {
    initView() {
      this.params = this.$route.params
      if (!this.params.presentableId) {
        return this.$error.showErrorMessage('缺乏presentable参数')
      }

      this.loadPresentableData(this.params)
    },
    loadPresentableData(params) {
      return onloadPresentableDetail(params.presentableId)
        .then(presentable => {
          this.presentableInfo = {...presentable}
          return onloadResourceDetail(presentable.resourceId).then((detail) => {
            this.resourceInfo = {...detail}
            console.log(this.presentableInfo, this.resourceInfo)
          })
        })
    },
    loadPresentableScheme() {
      const contract = this.getPresentableContract()
      if (contract) {
        onloadSchemeDetail(contract.authSchemeId).then((scheme) => {
          if (scheme) {
            for (let i = 0; i < scheme.policy.length; i += 1) {
              const policy = scheme.policy[i]
              if (policy.segmentId === contract.policySegmentId) {
                scheme.selectedPolicy = policy
                break
              }
            }

            this.$set(this.presentableInfo, 'scheme', scheme)
          }
        })
      }
    },
    getPresentableContract() {
      const contracts = this.presentableInfo.contracts || []
      if (contracts.length) {
        let contract
        for (let i = 0; i < contracts.length; i += 1) {
          contract = contracts[i]
          if (contract.resourceId === this.presentableInfo.resourceId) {
            return contract
          }
        }
      }

      return null
    },
    gotoSchemeDetailHandler() {
      this.$router.push({
        path: `/node/${this.$route.params.nodeId}/presentable/${this.presentableInfo.presentableId}/scheme_detail`,
        query: {resourceId: this.presentableInfo.resourceId}
      })
    },
    handleClick(){

    }
  }
}
