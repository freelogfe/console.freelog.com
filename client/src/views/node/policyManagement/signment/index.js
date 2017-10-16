export default {
  name: 'node-policy-signment',
  data() {
    return {
      table:  [ { currentState: 'initial',
        event: { type: 'compoundEvents', params: [Array] },
        nextState: 'activatetwo' },
      { currentState: 'activatetwo',
        event:
         { type: 'arrivalDate',
           params: [Array],
           eventName: 'arrivalDate_1_2012-12-12_event' },
        nextState: 'activate' },
      { currentState: 'activate',
        event:
         { type: 'period',
           params: [Array],
           eventName: 'period_day_event' },
        nextState: 'activatetwo' },
      { currentState: 'activatetwo',
        event:
         { type: 'arrivalDate',
           params: [Array],
           eventName: 'arrivalDate_0_10_day_event' },
        nextState: 'activate' } ],
        format: []
    }
  },
  mounted() {
  },
  created () {
    if (!this.$route.query.policyId) {
      this.$message.error('没有资源Id, 请重新选择');
    } else {
      console.log(this.$route.query.policyId);
    }

  let users =   [ { userType: 'individuals', users: [ 'userA', 'userB' ] } ];
  users.forEach((obj) => {
    if( obj.userType == 'individuals') {
      console.log('对用户');
      obj.users.forEach ((name) => {
        console.log(name);
      })
    }
  })
let stateNameMap = {
  "initial": "开始",
  "terminate": "终止",
  "activate": "授权"
};
let eventMap = {
  "compoundEvents": function (t) {
    let resultStr = [];
    t.params.forEach((event)=> {
      resultStr.push(eventMap[event.type](event));
    })
    return resultStr.join("以及");
  },
  "arrivalDate" : function (e) {
    if( e.params[0] == 1) {
      return "当日期为"+ e.params[1];
    }else {
      return "合同生效"+  e.params[1]+ "后";
    }
  },
  "period": function (e) {
    return "周期"+e.params[0]+"结束后"
  },
  "signing": function (e) {
    return "签署协议"
  },
  "contractGuaranty": function (e) {
    return '合约保证金'
  }
};
  let table =[
    {
        "currentState": "initial",
        "event": {
            "type": "compoundEvents",
            "params": [
                {
                    "type": "signing",
                    "params": [
                        "licenseA",
                        "licenseB"
                    ],
                    "eventName": "signing_licenseA_licenseB"
                },
                {
                    "type": "contractGuaranty",
                    "params": [
                        "5000",
                        "1",
                        "day"
                    ],
                    "eventName": "contractGuaranty_5000_1_event"
                }
            ]
        },
        "nextState": "activatetwo"
    },
    {
        "currentState": "activatetwo",
        "event": {
            "type": "arrivalDate",
            "params": [
                1,
                "2012-12-12"
            ],
            "eventName": "arrivalDate_1_2012-12-12_event"
        },
        "nextState": "activate"
    },
    {
        "currentState": "activate",
        "event": {
            "type": "period",
            "params": [
                "day"
            ],
            "eventName": "period_day_event"
        },
        "nextState": "activatetwo"
    },
    {
        "currentState": "activatetwo",
        "event": {
            "type": "arrivalDate",
            "params": [
                0,
                10,
                "day"
            ],
            "eventName": "arrivalDate_0_10_day_event"
        },
        "nextState": "activate"
    }
]

    table.forEach((transition) => {
      let temp= {};
      stateNameMap[transition.currentState]?temp.currentState=stateNameMap[transition.currentState]: temp.currentState=transition.currentState;
      stateNameMap[transition.nextState]?temp.nextState=stateNameMap[transition.nextState]: temp.nextState=transition.nextState;
      temp.event = eventMap[transition.event.type](transition.event);
      console.log(temp);
      this.format.push(temp)
    })
  // `
  // 【初始】：
  //     接受协议A和协议B， 以及 同意支付合约保证金5000元（支付后成功1天后归还）， 则进入【已支付】
  // 【已支付】：
  //     当时间为2017-12-12日，则进入【生效】
  // 【生效】，
  //     合同生效10天后，则进入【待生效】
  // `


  },
  methods: {

  }
}
