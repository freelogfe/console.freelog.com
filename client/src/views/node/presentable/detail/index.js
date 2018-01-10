import compiler from 'presentable_policy_compiler'
import PresentableSteps from '@/views/node/presentable/steps/index.vue'
import PresentableContractDetail from '../contract/detail/index.vue'
import PresentablePolicy from '../policy/index.vue'
import FreelogTags from '@/components/Tags/index.vue'


export default {
  name: 'presentable-detail',
  data() {
    return {
      tabPosition: 'left',
      detail: {},
      activeTabName: 'resource',
      userPolicy: '',
      inputValue: '',
      tags: []
    }
  },
  components: {
    PresentableSteps,
    PresentableContractDetail,
    PresentablePolicy,
    FreelogTags
  },

  mounted() {
    const query = this.$route.query

    if (this.$route.hash) {
      this.activeTabName = this.$route.hash.slice(1)
    }

    if (query.presentableId) {
      this.loadPresentableDetail(query.presentableId)
        .then(this.loadDetail.bind(this))
        .then(this.formatData.bind(this))
    } else if (query.contractId) {
      let param = Object.assign({}, query)
      this.loadDetail(param)
        .then(this.formatData.bind(this))
    } else {
      this.$message.error('缺少参数');
    }
  },
  methods: {
    loadDetail(detail) {
      console.log('first detail', detail);
      return this.loadContractDetail(detail.contractId).then((contract) => {
        return this.loadResourceDetail(contract.resourceId).then((resource) => {
          detail._contractDetail = contract
          detail._resourceDetail = resource
          return detail
        })
      }).catch(this.$error.showErrorMessage)
    },
    beautifySegmentText(text) {
      if (text) {
        return compiler.compile(text, 'beautify').stringArray.splice(1).join(' ').replace(/\n\s/g, '\n');
      } else {
        return ''
      }
    },
    formatData(detail) {
      if (detail.presentableId) {
        detail.policy.forEach((segment) => {
          segment._formatSegmentText = this.beautifySegmentText(segment.segmentText)
        })
        detail._formatSegmentText = this.beautifySegmentText(detail.policyText)
        console.log(detail._formatSegmentText);
        this.originPresentable = {
          name: detail.name,
          policyText: detail.policyText,
          userDefinedTags: detail.tagInfo.userDefined.join(',')
        }
      }

      this.detail = detail
    },
    loadResourceDetail(resId) {
      return this.$services.resource.get(resId).then((res) => {
        if (res.data.errcode === 0) {
          return res.getData();
        } else {
          throw new Error(res.data.msg)
        }
      })
    },
    loadPresentableDetail(param) {
      return this.$services.presentables.get(param || {})
        .then((res) => {
          if (res.data.errcode === 0) {
            return res.getData();
          } else {
            throw new Error(res.data.msg)
          }
        }).catch(this.$error.showErrorMessage)
    },
    loadContractDetail(param) {
      return this.$services.contract.get(param || {})
        .then((res) => {
          if (res.data.errcode === 0) {
            return res.getData();
          } else {
            throw new Error(res.data.msg)
          }
        }).catch(this.$error.showErrorMessage)
    },
    createUserPolicyHandler() {
      var path = `/node/${this.$route.params.nodeId}/presentable/edit`
      this.$router.push({
        path: path,
        query: {
          contractId: this.detail._contractDetail.contractId
        }
      })
    },
    updatePresentableHandler() {
      var data = {
        name: this.detail.name,
        policyText: this.detail._formatSegmentText,
        userDefinedTags: this.detail.tagInfo.userDefined.join(',')
      };
      var param = {}
      Object.keys(this.originPresentable).forEach((key) => {
        if (data[key] !== this.originPresentable[key]) {
          param[key] = data[key]
        }
      });

      this.originPresentable = data
      this.$services.presentables.put(this.detail.presentableId, param)
        .then((res) => {
          if (res.data.errcode === 0) {
            var data = res.getData()
            Object.assign(this.detail, data)
          } else {
            this.$message.error(res.data.msg || '更新失败')
          }
        }).catch(this.$error.showErrorMessage)
    },
    updateContractDetail() {
      this.loadContractDetail(this.detail._contractDetail.contractId).then((contract) => {
        Object.assign(this.detail._contractDetail, contract)
      })
    }
  }
}
