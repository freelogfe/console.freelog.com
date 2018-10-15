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
    var params = this.$route.params
    return {
      isInitStatus: false,
      params: params,
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

          data.contracts.slice(0).reduce((cachedContractsMap, item) => {
            cachedContractsMap[this.getSchemeContractKey(item)] = item
            return cachedContractsMap
          }, this.cachedContractsMap);

          ResourceDataLoader.onloadResourceDetail(data.resourceId).then(detail => {
            console.log('detail', detail)
            Object.assign(data.resourceInfo, detail)
            data.resourceInfo.contracts = data.contracts
            this.presentableDetail = data
          })
          // this.loadPresentableSchemes(data.resourceId)
          // console.log(this.cachedContractsMap)
        }
      });
    },
    loadPresentableSchemes(resourceId) {
      SchemeDataLoader.onloadSchemesForResource(resourceId).then(schemes => {
        console.log(schemes)
        this.presentableDetail.schemes = schemes;
      })
    },
    getSchemeContractKey(item) {
      return `${item.authSchemeId}_${item.policySegmentId}`
    },
    saveSchemeHandler() {
      var dutyStatements = this.$refs.schemeTree.getDutyStatements()
      var resource2schemeMap = {}
      var targetResourceId = this.presentableDetail.resourceId
      var cachedContractsMap = this.cachedContractsMap
      var contracts = [];

      dutyStatements.map(dep => {
        let selectedScheme = dep.selectedScheme
        if (selectedScheme) {
          resource2schemeMap[dep.resourceId] = selectedScheme.authSchemeId
          let selectedSegmentId = selectedScheme.selectedPolicy.segmentId
          let contract = {
            resourceId: dep.resourceId
          };
          let schemePolicy = {
            authSchemeId: selectedScheme.authSchemeId,
            policySegmentId: selectedSegmentId
          };
          let key = this.getSchemeContractKey(schemePolicy)
          if (cachedContractsMap[key]) {
            contract.contractId = cachedContractsMap[key].contractId
          } else {
            Object.assign(contract, schemePolicy)
          }
          contracts.push(contract)
        } else {
          resource2schemeMap[dep.resourceId] = dep.authSchemeId
        }
      });

      var targetResource;
      for (let i = 0; i < dutyStatements.length; i++) {
        if (dutyStatements[i].resourceId === targetResourceId) {
          targetResource = dutyStatements[i]
          break;
        }
      }

      if (targetResource) {
        if (targetResource.activeStatus === 2) {
          this.updatePresentableSchemes({
            contracts: filterSameContracts(contracts)
          })

          function filterSameContracts (contracts){
            var tempMap = new Map()
            return contracts.filter(it =>{
              if(tempMap.get(it.authSchemeId)){
                return false
              }else{
                tempMap.set(it.authSchemeId, 1)
                return true
              }
            })
          }
        } else {
          this.$message.error('有资源未选择授权策略')
        }
      } else {
        console.log('error contracts', contracts)
        this.$message.error('未选择授权方案')
      }
    },
    updatePresentableSchemes(data) {
      return this.$services.presentables.put(this.params.presentableId, data).then(res => {
        if (res.data.errcode === 0) {
          this.isInitStatus = !res.data.data.contracts.length
          this.$message.success('更新成功');
          this.gotoContractView(res.data.data)
        } else {
          this.$error.showErrorMessage(res)
        }
      })
    },
    gotoContractView(data) {
      var query = {tab: 'node-contracts'}
      for (var i = 0; i < data.contracts.length; i++) {
        let contract = data.contracts[i]
        if (contract.resourceId === this.presentableDetail.resourceId) {
          query.contractId = contract.contractId
          break;
        }
      }

      this.$router.push({path: `/node/${this.params.nodeId}`, query: query})
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
