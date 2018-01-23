import CONFIG from '@/config/index'
import TransactionEvent from './events/transaction/index.vue'
import LicenseEvent from './events/license/index.vue'
import ContractDetailInfo from '@/components/detail-info/contract.vue'
import ContractContent from './content.vue'

const {CONTRACT_STATUS_TIPS} = CONFIG

let contractEventsMap = {
  transaction() {
    return '支付事件'
  },
  signing(params) {
    return '进入协议签署页面'
  },
  contractGuaranty() {
    return '进入支付保证金'
  },
  period() {
    return '周期性支付'
  },
  arrivalDate(params) {
    if (params[0] === 1) {
      return '到达日期' + params[1] + '进入下一个状态'
    } else if (params[0] === 0) {
      return params[1] + '天后进入下一个状态'
    }
  }
}

let eventComponentMap = {
  transaction: {
    type: 'transaction-event',
    title: '支付'
  },
  signing: {
    type: 'license-event',
    title: '签约license'
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
      detail.statusTip = CONTRACT_STATUS_TIPS[detail.status]
      this.formatContractDetail = detail
    },
    loadContractDetail(param) {
      return this.$services.contract.get(param || {})
        .then((res) => {
          return res.getData();
        }).catch(this.$error.showErrorMessage)
    },
    updateContractDetail() {
      this.loadContractDetail(this.contractDetail.contractId).then((contract) => {
        Object.assign(this.contractDetail, contract)
        this.formatData()
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
