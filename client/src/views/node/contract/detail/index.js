import eventTriggerHandlerMap from './eventTriggerHandler'

let showEventMap = {
  signing (params) {
    return '进入协议签署页面'
  },
  contractGuaranty () {
    return '进入支付保证金'
  },
  period () {
    return '周期性支付'
  },
  arrivalDate (params) {
    if(params[0] == 1) {
      return '到达日期' + params[1]  +'进入下一个状态'
    } else if (params[0] ==0 ) {
      return params[1] + '天后进入下一个状态'
    }
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
      selectValue: '请选择',
      selectedtEventType: '',
      selectedtEventParams: [],
      selectedId: null,
      selectedType: ''
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
      this.eventHtml = [];
      return this.$services.contract.get(param || {})
        .then((res) => {
          let data = res.getData()
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
      if( !this.submitFlag ) {
        return this.$message.warning('当前需要等待时间事件执行')
      }
      const self = this;
      //拿到事件id
      //拿到合同id
      //跳转到事件页面完成事件
      this.$services.eventTest.post({
        contractId:   this.$route.query.contractId,
        eventId: this.selectedId
      }).then(()=> {
        this.load(this.$route.query.contractId)
        this.selectValue = ''
        this.selectedId = null
      })
    },
    showEvents(corresponseEvents) {
      corresponseEvents.forEach((transition) => {

        if (transition.event.type == 'compoundEvents') {
            transition.event.params.forEach((event)=> {

            this.eventHtml.push({
              html: showEventMap[event.type](event.params),
              type: event.type,
              params: event.eventId+','+event.type
            })
          })
        } else {
          this.eventHtml.push({
            html: showEventMap[transition.event.type](transition.event.params),
            type: transition.event.type,
            params: transition.event.eventId+','+ transition.event.type
          })
        }
      })
    },
    selectEvent (params) {
      //select onchange的时候触发，如果是这种等待事件则不能进行提交，而是提示用户要等待
      this.selectedId = params.split(',')[0];
      this.selectedType = params.split(',')[1];

      if (  this.selectedType == 'arrivalDate' ) {
        this.submitFlag = false;
      } else {
        this.submitFlag = true;
      }
    },
    backToList () {
      this.$router.push({
        path: `/node/${this.$route.params.nodeId}/contracts`,
      })
    }
  }
}
