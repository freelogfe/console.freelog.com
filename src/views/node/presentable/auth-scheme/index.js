import ResourceSchemeTree from '@/views/resource/scheme-tree/index.vue'
import PresentableDataLoader from '@/data/presentable/loader'
import SchemeDataLoader from '@/data/scheme/loader'
import ResourceDataLoader from '@/data/resource/loader'
import ResourceIntroInfo from '../../../resource/intro/index.vue'

export default {
  name: 'presentable-scheme-detail',
  components: {
    ResourceSchemeTree,
    ResourceIntroInfo
  },
  data() {
    const params = this.$route.params
    return {
      isInitStatus: false,
      params,
      presentableDetail: {
        contracts: [],
        schemes: [],
        resourceInfo: {}
      },
      cachedContractsMap: {}
    }
  },
  mounted() {
    this.initView(this.params)
  },
  methods: {
    initView(params) {
      if (!params.presentableId) {
        return
      }

      PresentableDataLoader.onloadPresentableDetail(params.presentableId).then((data) => {
        if (data && data.contracts) {
          this.isInitStatus = !data.contracts.length

          data.contracts.slice(0).reduce((cachedContractsMap, item) => {
            cachedContractsMap[this.getSchemeContractKey(item)] = item
            return cachedContractsMap
          }, this.cachedContractsMap)

          ResourceDataLoader.onloadResourceDetail(data.resourceId).then(detail => {
            Object.assign(data.resourceInfo, detail)
            data.resourceInfo.contracts = data.contracts
            this.presentableDetail = data
          })
        }
      })
    },
    loadPresentableSchemes(resourceId) {
      SchemeDataLoader.onloadSchemesForResource(resourceId).then((schemes) => {
        this.presentableDetail.schemes = schemes
      })
    },
    getSchemeContractKey(item) {
      return `${item.authSchemeId}_${item.policySegmentId}`
    },
    saveSchemeHandler() {
      const dutyStatements = this.$refs.schemeTree.getDutyStatements()
      const targetResourceId = this.presentableDetail.resourceId
      const cachedContractsMap = this.cachedContractsMap
      const contracts = []

      dutyStatements.map((dep) => {
        const selectedScheme = dep.selectedScheme
        const contract = {
          resourceId: dep.resourceId
        }
        let schemePolicy
        if (selectedScheme) {
          schemePolicy = {
            authSchemeId: selectedScheme.authSchemeId,
            policySegmentId: selectedScheme.selectedPolicy.segmentId
          }
        } else if (dep.policySegmentId) {
          schemePolicy = {
            authSchemeId: dep.authSchemeId,
            policySegmentId: dep.policySegmentId
          }
        }

        if (schemePolicy) {
          const key = this.getSchemeContractKey(schemePolicy)
          if (cachedContractsMap[key]) {
            contract.contractId = cachedContractsMap[key].contractId
          } else {
            Object.assign(contract, schemePolicy)
          }
          contracts.push(contract)
        }
      })

      let targetResource
      for (let i = 0; i < dutyStatements.length; i++) {
        if (dutyStatements[i].resourceId === targetResourceId) {
          targetResource = dutyStatements[i]
          break
        }
      }

      if (targetResource) {
        if (targetResource.activeStatus === 2) {
          this.updatePresentableSchemes({
            contracts: filterSameContracts(contracts)
          })

          function filterSameContracts(contracts) {
            const tempMap = new Map()
            return contracts.filter((it) => {
              if (it.contractId && tempMap.get(it.contractId)) {
                return false
              }
              tempMap.set(it.contractId, true)
              return true
            })
          }
        } else {
          this.$message.error('有资源未选择授权策略')
        }
      } else {
        this.$message.error('未选择授权方案')
      }
    },
    updatePresentableSchemes(data) {
      return this.$services.presentables.put(this.params.presentableId, data).then((res) => {
        if (res.data.errcode === 0) {
          this.isInitStatus = !res.data.data.contracts.length
          this.$message.success('更新成功')
          this.gotoContractView(res.data.data)
        } else {
          this.$error.showErrorMessage(res)
        }
      })
    },
    gotoContractView(data) {
      const query = {}
      for (let i = 0; i < data.contracts.length; i++) {
        const contract = data.contracts[i]
        if (contract.resourceId === this.presentableDetail.resourceId) {
          query.contractId = contract.contractId
          break
        }
      }

      this.$router.push({ path: `/node/${this.params.nodeId}/contracts`, query })
    },
    switchSchemeHandler(resource, scheme, index, panelIndex) {

    },
    selectResourceHandler(dep, scheme, panelIndex, $event) {

    },
    changePolicy(resource, scheme, policy) {

    },
    changeSchemePolicyHandler(scheme, policy) {

    },
    selectAuthSchemeHandler(resource, scheme, panelIndex) {

    }
  }
}
