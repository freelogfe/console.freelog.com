import CONFIG from '@/config/index'
import TransactionEvent from '@/components/events/transaction/index.vue'
import LicenseEvent from '@/components/events/license/index.vue'

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
    if (params[0] == 1) {
      return '到达日期' + params[1] + '进入下一个状态'
    } else if (params[0] == 0) {
      return params[1] + '天后进入下一个状态'
    }
  }
}

let eventComponentMap = {
  transaction : 'transaction-event',
  license: 'license-event'
}


export default {
  name: 'presentable-contract-detail',
  data() {
    return {
      component:'',
      ok: false,
      dialogVisible:false,
      account:'',
      options:[],
      password: '',
      selectedContractEvent: '',
      formatContractDetail: null
    }
  },
  components: {
    TransactionEvent,
    LicenseEvent
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
    // pay() {
    //     var self = this;
    //     var selectedContractEvent = this.formatContractDetail.events[this.selectedContractEvent];
    //
    //     this.$services.pay.post({
    //       "targetId": self.contractDetail.contractId,
    //       "orderType": 1,
    //       "fromAccountId": self.account,
    //       "toAccountId": selectedContractEvent.params[0],
    //       "amount": selectedContractEvent.params[1],
    //       "password": self.password
    //     })
    // },
    executeContractHandler() {
      var self = this;

      var selectedContractEvent = this.formatContractDetail.events[this.selectedContractEvent];
      this.selectedContractEvent = selectedContractEvent
      console.log('selectedContractEvent',selectedContractEvent.type);
      this.component = eventComponentMap[selectedContractEvent.type];
      console.log(this.ok)
      this.ok = false;

      setTimeout(function() {
        this.ok = true;
      }.bind(this), 10)




      //test
      // this.$services.eventTest.post({
      //   contractId: this.contractDetail.contractId,
      //   eventId: selectedContractEvent.params.eventId
      // }).then(() => {
      //   this.selectedContractEvent = ''
      //   this.updateContractDetail()
      //   this.$message.success('执行成功')
      // })

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
