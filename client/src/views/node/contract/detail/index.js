import TransactionEvent from './events/transaction/index.vue'
import LicenseEvent from './events/license/index.vue'
import ContractDetailInfo from '@/components/detail-info/contract.vue'
import ContractContent from './content.vue'
import ContractUtils from '@/data/contract/utils'
import {onloadResourceDetail} from '@/data/resource/loader'

let eventComponentMap = {
  transaction: {
    type: 'transaction-event',
    title: '支付'
  },
  signing: {
    type: 'license-event',
    title: '签署'
  }
}

export default {
  name: 'presentable-contract-detail',
  data() {
    return {
      eventComponent: '',
      dialogTitle: '',
      showEventExecDialog: false,

      contractDetail: {},
      resourceDetail: {},
      account: '',
      options: [],
      password: '',
      selectedContractEvent: ''
    }
  },
  components: {
    TransactionEvent,
    LicenseEvent,
    ContractDetailInfo,
    ContractContent
  },
  props: {
    // contractDetail: Object,
    contractId: String
  },
  watch: {
    // contractDetail: 'formatData',
    contractId: 'initContractDetail'
  },
  mounted() {
    this.initContractDetail()
  },
  methods: {
    initContractDetail() {
      if (!this.contractId) {
        return
      }
      this.loadContractDetail(this.contractId)
        .then(contract => {
          onloadResourceDetail(contract.resourceId)
            .then(resInfo => {
              this.resourceDetail = resInfo
            })
          this.contractDetail = ContractUtils.format(contract)
        })
    },
    handleCloseDialog(done) {
      this.closeDialogHandler()
      done()
    },
    closeDialogHandler(detail) {
      if (detail && detail.shouldUpdate) {
        setTimeout(() => {
          this.updateContractDetail() //由于后端支付存在延迟，临时延迟update，后续根据订单支付状态进行优化展示
        }, 5e2)
      }
      this.eventComponent = ''
      this.dialogTitle = ''
      this.$refs.eventDialog.hide()
    },
    formatData() {
      var detail = Object.assign({}, this.contractDetail)
      detail = ContractUtils.format(detail)
    },
    loadContractDetail(param) {
      return this.$services.contract.get(param || {})
        .then((res) => {
          return res.getData();
        }).catch(this.$error.showErrorMessage)
    },
    updateContractDetail(detail) {
      this.loadContractDetail(this.contractDetail.contractId).then((contract) => {
        Object.assign(this.contractDetail, contract)
        this.formatData()
        if (detail && detail.done) {
          detail.done()
        }
      })
    },
    executeContractHandler(params) {
      var eventComConfig = eventComponentMap[params.type]
      this.selectedContractEvent = params
      this.eventComponent = eventComConfig.type;
      this.dialogTitle = eventComConfig.title
      this.showEventExecDialog = true;
    },
    activateContractHandler(contract) {
      this.$axios.get(`/v1/contracts/initial`, {
        params: {
          contractIds: contract.contractId
        }
      }).then(res => {
        if (res.data.errcode === 0) {
          this.$message.success('成功激活合同')
          this.loadContractDetail(contract.contractId).then(contractDetail => {
            Object.assign(contract, contractDetail);
            this.$emit('update', ContractUtils.format(contract))
          })
        } else {
          this.$error.showErrorMessage(res.data.msg)
        }
      })
    },
  }
}
