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
module.exports = {
  stateNameMap: stateNameMap,
  eventMap : eventMap
}
