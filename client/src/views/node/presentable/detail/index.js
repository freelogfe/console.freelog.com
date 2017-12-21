import {CONTRACT_STATUS_TIPS} from '@/config/view-config'
import compiler from 'presentable_policy_compiler'
import PresentableSteps from '@/views/node/presentable/steps/index.vue'

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
  name: 'presentable-detail',
  data() {
    return {
      tabPosition: 'left',
      detail: {},
      activeTabName: 'resource',
      selectedContractEvent: ''
    }
  },
  components: {PresentableSteps},

  mounted() {
    const query = this.$route.query

    if (this.$route.hash) {
      this.activeTabName = this.$route.hash.slice(1)
    }

    if (query.presentableId) {
      this.loadPresentableDetail(query.presentableId)
        .then(this.loadDetail.bind(this))
        .then(this.formatData.bind(this))
    } else if (query.contractId) {
      this.loadDetail(query)
        .then(this.formatData.bind(this))
    } else {
      this.$message.error('缺少参数');
    }
  },
  methods: {
    debugHandler() {
      debugger
    },
    loadDetail(detail) {
      return this.loadContractDetail(detail.contractId).then((contract) => {
        return this.loadResourceDetail(contract.resourceId).then((resource) => {
          detail._contractDetail = contract
          detail._resourceDetail = resource
          return detail
        })
      })
    },
    beautifySegmentText(text) {
      if (text) {
        return compiler.compile(text, 'beautify').stringArray.splice(1).join(' ').replace(/\n\s/g, '\n');
      } else {
        return ''
      }
    },
    formatData(detail) {
      detail._contractDetail.statusTip = CONTRACT_STATUS_TIPS[detail._contractDetail.status]

      if (detail.presentableId) {
        detail.policy.forEach((segment) => {
          segment._formatSegmentText = this.beautifySegmentText(segment.segmentText, 'beautify')
        })
      }

      detail._contractDetail.policySegment._formatSegmentText = this.beautifySegmentText(detail._contractDetail.policySegment.segmentText)

      this.resolveContractEvents(detail)
      this.detail = detail
      console.log('detail', detail)
    },
    resolveContractEvents(detail) {
      let events = []
      let fsmState = detail._contractDetail.fsmState;
      let stateTransitionMap = detail._contractDetail.policySegment.fsmDescription;
      let corresponseEvents = [];

      stateTransitionMap.forEach((transition) => {
        if (transition.currentState === fsmState) {
          corresponseEvents.push(transition)
        }
      })

      var pushEvent = (event) => {
        events.push({
          desc: contractEventsMap[event.type](event.params),
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
      detail._contractDetail.events = events
    },
    loadResourceDetail(resId) {
      return this.$services.resource.get(resId).then((res) => {
        return res.getData()
      })
    },
    loadPresentableDetail(param) {
      return this.$services.presentables.get(param || {})
        .then((res) => {
          return res.getData();
        }).catch((err) => {
          this.$message.error(err.response.errorMsg || err)
        })
    },
    loadContractDetail(param) {
      return this.$services.contract.get(param || {})
        .then((res) => {
          return res.getData();
        }).catch((err) => {
          this.$message.error(err.response.errorMsg || err)
        })
    },
    createUserPolicyHandler() {
      var path = `/node/${this.$route.params.nodeId}/presentable/create`
      this.$router.push({
        path: path,
        query: {
          contractId: this.detail._contractDetail.contractId
        }
      })
    },
    updateContractDetail(formName) {
      const self = this;
    },
    executeContractHandler() {
      var selectedContractEvent = this.selectedContractEvent
      console.log(selectedContractEvent)
      //test
      this.$services.eventTest.post({
        contractId: this.detail._contractDetail.contractId,
        eventId: selectedContractEvent.params.eventId
      }).then(() => {
        this.selectedContractEvent = ''
        this.$message.info('执行成功')
      })

      //todo
      // this.$axios.post('//api.freelog.com/v1/contracts/test', {
      //   contractId: this.detail._contractDetail.contractId,
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
