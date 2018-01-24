import CONFIG from '@/config/index'
import compiler from 'freelog_policy_compiler'
import PresentableCreator from './creator.vue'

const {RESOURCE_TYPES} = CONFIG

export default {
  name: 'node-presentable-creator',
  data() {
    return {
      formData: {}
    }
  },
  mounted() {
    if (!this.$route.query.resourceId) {
      this.$message.error('没有资源Id, 请重新选择');
    } else {
      this.init()
    }
  },
  components: {
    PresentableCreator
  },
  computed: {
    canSubmit() {
      return !!this.formData.selectedPolicy
    }
  },
  methods: {
    init() {
      this.loadPolicyDetail()
        .then(this.queryContractsStatus.bind(this))
        .then((data) => {
          this.formData = data
        }).catch(this.$error.showErrorMessage)
    },
    //查询合同创建状态
    queryContractsStatus(formData) {
      let partyTwo = this.$route.params.nodeId
      return this.$services.contractRecords.get({
        params: {
          resourceIds: formData.resource.resourceId,
          partyTwo: partyTwo
        }
      }).then((res) => {
        var records = res.getData()
        records.forEach((item) => {
          if (formData.resource.resourceId === item.resourceId) {
            let policies = formData.data.policy
            for (let [j, policy] of policies.entries()) {
              if (policy.segmentId === item.segmentId) {
                policy.created = true
                break;
              }
            }
          }
        })

        return formData
      })
    },
    loadResourceDetail(resId) {
      return this.$services.resource.get(resId).then((res) => {
        return res.getData()
      })
    },
    loadPolicyDetail() {
      var query = this.$route.query
      return new Promise((resolve) => {
        resolve(this.loadResourceDetail(query.resourceId))
      }).then((resource) => {
        var formData = {
          resource: resource,
          data: {},
          presentableInput: {
            name: '',
            policyText: '',
            userDefinedTags: []
          },
          selectedPolicy: null //记录选择哪个策略
        };

        formData.widgets = (resource && resource.systemMeta && resource.systemMeta.widgets) || []
        formData.widgets = formData.widgets.map((w) => {
          w.detailUrl = `/resources/detail/${w.resourceId}`
          return w
        })

        return this.$services.policy.get(resource.resourceId).then((res) => {
          let policyData = res.getData();
          policyData.policy.forEach((p) => {
            p.created = false; //是否已经创建过合同
            p._formatSegmentText = this.formatSegmentText(p.segmentText)
            p.forUsers = p.users.map((u) => {
              return {
                type: u.userType,
                users: u.users.join(',')
              }
            })
          })

          Object.assign(formData.data, policyData)
          return formData
        })
      })
    },
    formatSegmentText(segmentText) {
      return compiler.compile(segmentText, 'beautify').stringArray.splice(1).join(' ').replace(/\n\s/g, '\n');
    },
    createResourceContract(param) {
      return this.$services.contract.post(param)
        .then((res) => {
          var data = res.getData()
          if (res.data.errcode !== 0) {
            throw new Error(res.data.msg)
          } else {
            return data
          }
        })
    },
    createPresentablePolicy(params) {
      return this.$services.presentables.post(params)
        .then((res) => {
          return res.getData()
        })
    },
    extractSubmitData() {
      var nodeId = parseInt(this.$route.params.nodeId)
      var formData = this.formData

      let contract = {
        contractType: '2',
        targetId: formData.resource.resourceId,
        segmentId: formData.selectedPolicy.segmentId,
        serialNumber: formData.data.serialNumber,
        partyTwo: nodeId
      };

      let policy = {
        nodeId: nodeId,
        name: formData.presentableInput.name,
        resourceId: formData.resource.resourceId,
        policyText: btoa(formData.presentableInput.policyText),
        languageType: 'freelog_policy_lang',
        userDefinedTags: formData.presentableInput.userDefinedTags.join(',')
      }

      return {
        contract,
        policy
      }
    },
    gotoPresentablDetail(data) {
      var nodeId = parseInt(this.$route.params.nodeId)
      var pbPresentableId = this.$route.query.pbPresentableId
      var ispb = !!pbPresentableId
      if (!ispb) {
        let resourceType = this.formData.resource.resourceType || data.tagInfo.resourceInfo.resourceType
        ispb = resourceType === RESOURCE_TYPES.pageBuild
      }
      var routeParam = pbPresentableId ? {
        path: `/node/${nodeId}/presentable/detail`,
        query: {presentableId: pbPresentableId, ispb: true}
      } : {
        path: `/node/${nodeId}/presentable/detail#presentable`,
        query: {presentableId: data.presentableId, ispb: ispb}
      }

      this.$router.push(routeParam)
    },
    submit() {
      if (!this.canSubmit) {
        document.body.scrollIntoView('#js-form-step-1')
        return this.$message.warning('未选择合同策略')
      }
      var data = this.extractSubmitData()
      console.log(data);
      this.createResourceContract(data.contract)
        .then((contract) => {
          data.policy.contractId = contract.contractId
        })
        .then(() => {
          return this.createPresentablePolicy(data.policy)
        })
        .then((data) => {
          this.$message.success('presentable创建成功');
          this.gotoPresentablDetail(data)
        }).catch(this.$error.showErrorMessage)
    }
  }
}
