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
          var data = res.getData()
          this.detail = data

          //渲染状态机
          //1.获取当前状态
          //2.找到对应的events及对应的nextstate
          //3.展示所有events，跳转至操作页面
          let fsmState = data.fsmState;
          let stateTransitionMap = data.policySegment.fsmDescription;
          let corresponseEvents = [];
          stateTransitionMap.forEach((transition)=> {
            if (transition.currentState == fsmState) {
              corresponseEvents.push(transition)
            }
          })
          this.showEvents(corresponseEvents);
        }).catch((err)=>{
          this.$message.error(err.response.errorMsg || err)
        })
    },
    updateNodeDetail(formName) {
      const self = this;
      //拿到事件类型
      //拿到事件参数
      //拿到合同id
      //跳转到事件页面完成事件
    },
    showEvents(corresponseEvents) {
      corresponseEvents.forEach((transition) => {
        if (transition.event.type == 'compoundEvents') {
            transition.event.params.forEach((event)=> {
            this.eventHtml.push({
              html: showEventMap[event.type](event.params),
              type: event.type,
              params: JSON.stringify(event.params)
            })
          })
        } else {
          this.eventHtml.push({
            html: showEventMap[event.type](event.params),
            type: event.type,
            params: JSON.stringify(event.params)
          })
        }

        console.log(this.eventHtml);
      })
    },
    selectEvent (value) {
      console.log('312312321',a,b,c);
    }
  }
}
