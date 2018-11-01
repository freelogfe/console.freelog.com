
import { ContractDetail } from '@freelog/freelog-ui-contract'
import ContractDetailInfo from '@/components/detail-info/contract.vue'

import ContractUtils from '@/data/contract/utils'
import { onloadResourceDetail } from '@/data/resource/loader'


export default {
  name: 'presentable-contract-detail',
  data() {
    return {
      eventComponent: '',
      dialogTitle: '',
      showEventExecDialog: false,
      loading: true,
      contractDetail: {},
      resourceDetail: {},
      account: '',
      options: [],
      password: '',
      selectedContractEvent: ''
    }
  },
  components: {
    ContractDetailInfo,
    "contract-content": ContractDetail,
  },
  props: {
    contractId: String
  },
  watch: {
    contractId: 'initContractDetail'
  },
  mounted() {
    this.initContractDetail()
  },
  methods: {
    initContractDetail() {
      if (!this.contractId) {
        this.loading = false
        return
      }
      this.loadContractDetail(this.contractId)
        .then((contract) => {
          onloadResourceDetail(contract.resourceId)
            .then((resInfo) => {
              this.resourceDetail = resInfo
            })
          this.contractDetail = ContractUtils.format(contract)
          this.loading = false
        })
    },
    updateContractAfterEvent(detail) {
      if (detail && detail.shouldUpdate) {
        setTimeout(() => {
          this.updateContractDetail() // 由于后端支付存在延迟，临时延迟update，后续根据订单支付状态进行优化展示
        }, 5e2)
      }
    },
    formatData() {
      let detail = Object.assign({}, this.contractDetail)
      detail = ContractUtils.format(detail)
    },
    // 获取合同详情
    loadContractDetail(param) {
      return this.$services.contract.get(param || {})
        .then(res => res.getData()).catch(this.$error.showErrorMessage)
    },
    // 更新合同
    updateContractDetail(detail) {
      this.loadContractDetail(this.contractDetail.contractId).then((contract) => {
        Object.assign(this.contractDetail, contract)
        this.formatData()
        if (detail && detail.done) {
          detail.done()
        }
      })
    },
    // 激活合同
    activateContractHandler(contract) {
      this.$axios.get('/v1/contracts/initial', {
        params: {
          contractIds: contract.contractId
        }
      }).then((res) => {
        if (res.data.errcode === 0) {
          this.$message.success('成功激活合同')
          this.loadContractDetail(contract.contractId).then((contractDetail) => {
            Object.assign(contract, contractDetail)
            this.$emit('update', ContractUtils.format(contract))
          })
        } else {
          this.$error.showErrorMessage(res.data.msg)
        }
      })
    },
  }
}
