import TransactionEvent from './events/transaction/index.vue'
import LicenseEvent from './events/license/index.vue'
import ContractDetailInfo from '@/components/detail-info/contract.vue'
import ContractContent from './content.vue'
import ContractUtils from '@/data/contract/utils'

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

      account: '',
      options: [],
      password: '',
      selectedContractEvent: '',
      formatContractDetail: null
    }
  },
  components: {
    TransactionEvent,
    LicenseEvent,
    ContractDetailInfo,
    ContractContent
  },
  props: {
    contractDetail: Object
  },
  watch: {
    contractDetail: 'formatData'
  },
  mounted() {
  },
  methods: {
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
      this.formatContractDetail = detail
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
    }
  }
}
