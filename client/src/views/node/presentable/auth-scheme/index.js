import ResourceSchemeTree from '@/views/resource/scheme-tree/index.vue'
import PresentableDataLoader from '@/data/presentable/loader'
import SchemeDataLoader from '@/data/scheme/loader'

export default {
  name: 'presentable-scheme-detail',
  components: {
    ResourceSchemeTree
  },
  data() {
    var params = this.$route.params
    params.resourceId = this.$route.query.resourceId
    return {
      isInitStatus: false,
      params: params,
      presentableDetail: {
        contracts: []
      },
      cachedContractsMap: {}
    }
  },
  mounted() {
    this.initView(this.params)
  },
  computed: {},
  watch: {},
  methods: {
    initView(params) {
      if (!params.presentableId) {
        return
      }
      PresentableDataLoader.onloadPresentableDetail(params.presentableId).then(data => {
        if (data && data.contracts) {
          this.isInitStatus = !data.contracts.length
          this.presentableDetail = data

          data.contracts.slice(0).reduce((cachedContractsMap, item) => {
            cachedContractsMap[item.policySegmentId] = item
            return cachedContractsMap
          }, this.cachedContractsMap);
          console.log(this.cachedContractsMap)
        }
      });

    },
    saveSchemeHandler() {
      var dutyStatements = this.$refs.schemeTree.getDutyStatements()
      var resource2schemeMap = {}
      var targetResourceId = this.presentableDetail.resourceId
      var cachedContractsMap = this.cachedContractsMap
      var contracts = [];
      console.log(this.presentableDetail)
      console.log(dutyStatements)
      dutyStatements.map(dep => {
        if (dep.selectedScheme) {
          resource2schemeMap[dep.resourceId] = dep.selectedScheme.authSchemeId
          let selectedSegmentId = dep.selectedScheme.selectedPolicy.segmentId
          var contract = {
            resourceId: dep.resourceId
          };

          if (cachedContractsMap[selectedSegmentId]) {
            contract.contractId = cachedContractsMap[selectedSegmentId].contractId
          } else {
            Object.assign(contract, {
              authSchemeId: dep.selectedScheme.authSchemeId,
              policySegmentId: dep.selectedScheme.selectedPolicy.segmentId
            })
          }
          contracts.push(contract)
        } else {
          resource2schemeMap[dep.resourceId] = dep.authSchemeId
        }
      })

      SchemeDataLoader.onloadSchemesForResource(targetResourceId)
        .then(schemes => {
          var selectedScheme;
          for (var i = 0; i < schemes.length; i++) {
            if (schemes[i].authSchemeId === resource2schemeMap[targetResourceId]) {
              selectedScheme = schemes[i]
              break;
            }
          }

          if (selectedScheme) {
            if (selectedScheme.bubbleResources.length) {
              let flag = true
              selectedScheme.bubbleResources.forEach(res => {
                if (!resource2schemeMap[res.resourceId]) {
                  flag = false
                }
              });

              return flag
            } else {
              return true
            }
          } else {
            this.$message.error('未选择授权方案')
          }
        }).then(valid => {
        console.log(contracts)
        if (valid) {
          // this.updatePresentableSchemes({
          //   contracts: contracts
          // })
        } else {
          this.$message.error('有资源未选择授权策略')
        }
      });
    },
    updatePresentableSchemes(data) {
      return this.$services.presentables.put(this.params.presentableId, data).then(res => {
        if (res.data.errcode === 0) {
          this.$message.success('更新成功');
        } else {
          this.$error.showErrorMessage(res)
        }
      })
    },
    updateSchemesHandler() {
      console.log(arguments)
    }
  }
}
