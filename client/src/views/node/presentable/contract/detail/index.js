import CONFIG from '@/config/index'

const {CONTRACT_STATUS_TIPS} = CONFIG

let contractEventsMap = {
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
    if (params[0] == 1) {
      return '到达日期' + params[1] + '进入下一个状态'
    } else if (params[0] == 0) {
      return params[1] + '天后进入下一个状态'
    }
  }

}


export default {
  name: 'presentable-contract-detail',
  data() {
    return {
      selectedContractEvent: '',
      formatContractDetail: null
    }
  },
  props: {
    contractDetail: Object
  },
  watch: {
    contractDetail: 'formatData'
  },
  methods: {
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
          type: event.type,
          params: event
        })
      }

      corresponseEvents.forEach((transition) => {
        if (transition.event.type === 'compoundEvents') {
          transition.event.params.forEach(pushEvent)
        } else {
          pushEvent(transition.event)
        }
      })

      console.log(events)
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
      var selectedContractEvent = this.formatContractDetail.events[this.selectedContractEvent]
      console.log(selectedContractEvent)
      //test
      this.$services.eventTest.post({
        contractId: this.contractDetail.contractId,
        eventId: selectedContractEvent.params.eventId
      }).then(() => {
        this.selectedContractEvent = ''
        this.updateContractDetail()
        this.$message.success('执行成功')
      })

      //todo
      // this.$axios.post('//api.freelog.com/v1/contracts/test', {
      //   contractId: this.contractDetail.contractId,
      //   eventId: selectedContractEvent.params.eventId
      // }).then((res) => {
      //   console.log(res.getData())
      //    this.updateContractDetail()
      // }).catch((err) => {
      //   this.$message.error((err.response && err.response.errorMsg) || err)
      // });
    }
  }
}
