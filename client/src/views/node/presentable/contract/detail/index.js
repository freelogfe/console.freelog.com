import CONFIG from '@/config/index'
import TransactionEvent from './events/transaction/index.vue'
import LicenseEvent from './events/license/index.vue'
import ContractDetailInfo from '@/components/detail-info/contract.vue'

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
    ContractDetailInfo
  },
  props: {
    contractDetail: Object
  },
  watch: {
    contractDetail: 'formatData'
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
      var detail = this.contractDetail
      var formatContractDetail = {}

      formatContractDetail.statusTip = CONTRACT_STATUS_TIPS[detail.status]
      formatContractDetail.events = this.resolveContractEvents(detail)
      this.formatContractDetail = formatContractDetail
    },
    resolveContractEvents(detail) {
      let events = []
      let fsmState = detail.fsmState;
      let stateTransitionMap = detail.policySegment.fsmDescription;
      let corresponseEvents = [];

      stateTransitionMap.forEach((transition) => {
        if (transition.currentState === fsmState) {
          corresponseEvents.push(transition)
        }
      })

      var pushEvent = (event) => {
        var eventFn = contractEventsMap[event.type] || (() => 'no event handler')
        events.push({
          desc: eventFn(event.type),
          eventId: event.eventId, //用于test，实际要删除
          type: event.type,
          params: event.params
        })
      }

      corresponseEvents.forEach((transition) => {
        if (transition.event.type === 'compoundEvents') {
          transition.event.params.forEach(pushEvent)
        } else {
          pushEvent(transition.event)
        }
      })

      return events
    },
    loadContractDetail(param) {
      return this.$services.contract.get(param || {})
        .then((res) => {
          return res.getData();
        }).catch((err) => {
          this.$message.error(err.response.errorMsg || err)
        })
    },
    updateContractDetail() {
      this.loadContractDetail(this.contractDetail.contractId).then((contract) => {
        Object.assign(this.contractDetail, contract)
        this.formatData()
      })
    },
    executeContractHandler() {
      var selectedContractEvent = this.formatContractDetail.events[this.selectedContractEvent];
      var eventComConfig = eventComponentMap[selectedContractEvent.type]
      this.selectedContractEvent = selectedContractEvent
      this.eventComponent = eventComConfig.type;
      this.dialogTitle = eventComConfig.title
      this.showEventExecDialog = true;
    }
  }
}
