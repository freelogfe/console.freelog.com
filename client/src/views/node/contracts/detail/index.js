import eventTriggerHandlerMap from './eventTriggerHandler'

let showEventMap = {
  signing (params) {
    return '进入协议签署页面'
  },
  contractGuaranty () {
    return '进入支付保证金'
  }

}


export default {
  name: 'contract-detail',
  data() {
    return {
      detail: {},
      cuurentState: '',
      nextState: '',
      eventHtml: [],
      selectValue: '请选择'
    }
  },

  mounted() {
    if (this.$route.query.contractId) {
      this.load(this.$route.query.contractId)
    } else {
      this.$message.error('缺少参数contractId');
    }

    // eventTriggerHandlerMap['signing'](['1','2','3']).then((licenses)=> {
    //   //准备渲染licenses
    // }, (licenses)=>{
    //   console.error('请求失败');
    // })
  },
  methods: {
    load(param) {
      return this.$services.contract.get(param || {})
        .then((res) => {
          var data = res.data
          if (data.ret === 0) {
            this.detail = data.data

            //渲染状态机
            //1.获取当前状态
            //2.找到对应的events及对应的nextstate
            //3.展示所有events，跳转至操作页面
            let fsmState = data.data.fsmState;
            let stateTransitionMap = data.data.policySegment.fsmDescription;
            let corresponseEvents = [];
            stateTransitionMap.forEach((transition)=> {
              if (transition.currentState == fsmState) {
                corresponseEvents.push(transition)
              }
            })
            this.showEvents(corresponseEvents);
          } else {
            this.$message.error(data.msg);
          }
        })
    },
    updateNodeDetail(formName) {
      const self = this;
    },
    showEvents(corresponseEvents) {
      corresponseEvents.forEach((transition) => {
        if (transition.event.type == 'compoundEvents') {
            transition.event.params.forEach((event)=> {
            this.eventHtml.push(showEventMap[event.type](event.params))
          })
        } else {
          this.eventHtml.push(showEventMap[transition.event.type](transition.event.params))
        }

        console.log(this.eventHtml);
      })
    }
  }
}
