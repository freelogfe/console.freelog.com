(window.webpackJsonp=window.webpackJsonp||[]).push([["contract~node"],{"2Wqj":function(t,e){},"9K4q":function(t,e,a){"use strict";var n=a("SJTO");a.n(n).a},BAG8:function(t,e,a){"use strict";var n=a("Vxpq");a.n(n).a},Fg1L:function(t,e,a){"use strict";var n=a("Xt4e");a.n(n).a},HGP2:function(t,e,a){"use strict";a.r(e);var n=a("AlM9"),r=a("NKFe"),s=a.n(r),o=a("1O/z"),c=a("tpTV"),i=a("6ifa");a("oCYn");var l={format:function(t){if(t)return t.policySegment&&(t._segmentText=s.a.beautify(t.policySegment.segmentText).trim(),t.forUsers=t.policySegment.users.map(function(t){return{users:t.users.join("、"),type:t.userType}})),t.statusInfo=i.CONTRACT_STATUS_COLORS[t.status],t}},u=a("3eXy");a("snnE");function d(t){return u.ContractService.get(t).then(function(t){return t.getData()})}var f={loadDetail:d,onloadContractDetail:d},p=a("59r6"),h=a("IP6f"),m=a("Po4U"),v=a.n(m),g=a("PPAp"),_=a.n(g),b=a("2Wqj"),y=a.n(b),C=(v.a,_.a,y.a,{contract:f,node:c.a,resource:p.a,user:o.a,presentable:h.a}),D=(a("bTlt"),{name:"transaction-event",data:function(){return{options:[],fromAccountId:"",password:"",tipMsg:"",order:{},showError:!1}},mounted:function(){var t=this;this.$services.accounts.get().then(function(e){t.options=e.data.data}),this.queryOrder().then(this.checkOrderStatus.bind(this))},computed:{unitType:function(){return this.params.params[0].substr(0,4)}},props:["contractDetail","params"],methods:{payResultHandler:function(t){switch(t.status){case 1:this.$message.success("支付进行中，稍后查询支付结果");break;case 2:this.$message.success("支付成功");break;case 3:this.$message.success("支付失败");break;default:this.$message.info("未知的支付状态")}},doneHandler:function(t){this.order&&(t={shouldUpdate:!0}),this.$emit("close",t)},checkOrderStatus:function(t){if(t){var e;switch(this.order=t,t.status){case 1:e="支付进行中";break;case 2:e="已支付成功";break;case 3:e="支付失败"}this.tipMsg=e}},queryOrder:function(){return this.$services.orderInfo.get({params:{targetId:this.contractDetail.contractId}}).then(function(t){return t.getData()})},pay:function(){var t=this;this.$services.pay.post({targetId:this.contractDetail.contractId,orderType:1,fromAccountId:this.fromAccountId,toAccountId:this.params.params[0],amount:this.params.params[1],password:this.password}).then(function(e){0===e.data.errcode?(t.showError=!1,t.payResultHandler(e.data.data),t.doneHandler({shouldUpdate:!0,data:e.data.data})):(t.showError=!0,t.$message.error(e.data.msg))}).catch(this.$error.showErrorMessage)}}}),I=(a("Kj8m"),a("KHd+")),w=Object(I.a)(D,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"transaction-wrap"},[t.tipMsg?a("el-alert",{attrs:{title:t.tipMsg,type:"warning"}}):t._e(),t._v(" "),t.showError?a("el-alert",{attrs:{title:"",type:"warning"}},[t._v("\n      未设置支付密码，"),a("a",{staticStyle:{color:"#409EFF"},attrs:{href:"//www.freelog.com/pages/account/security.html",target:"_blank"}},[t._v("去设置")])]):t._e(),t._v(" "),a("el-form",{staticClass:"small-el-form",attrs:{"label-position":"left","label-width":"80px",model:t.contractDetail}},[a("el-form-item",{attrs:{label:"contractId"}},[t._v("\n        "+t._s(t.contractDetail.contractId)+"\n      ")]),t._v(" "),a("el-form-item",{attrs:{label:"甲方"}},[t._v("\n        "+t._s(t.contractDetail.partyOne)+"\n      ")]),t._v(" "),a("el-form-item",{attrs:{label:"乙方"}},[t._v("\n        "+t._s(t.contractDetail.partyTwo)+"\n      ")]),t._v(" "),a("el-form-item",{attrs:{label:"转入账号"}},[t._v("\n        "+t._s(t.params.params[0])+"\n      ")]),t._v(" "),a("el-form-item",{attrs:{label:"转账金额"}},[t._v("\n        "+t._s(t._f("humanizeCurrency")(t.params.params[1]))+" "+t._s(t.unitType)+"\n      ")]),t._v(" "),a("el-form-item",{attrs:{label:"转出账号"}},[a("el-select",{attrs:{size:"small",placeholder:"请选择"},model:{value:t.fromAccountId,callback:function(e){t.fromAccountId=e},expression:"fromAccountId"}},t._l(t.options,function(t){return a("el-option",{key:t.accountId,attrs:{label:t.accountId,value:t.accountId}})})),t._v(" "),a("el-tooltip",{attrs:{placement:"top"}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("p",[a("a",{staticStyle:{color:"white"},attrs:{href:"//www.freelog.com/pages/account/create.html",target:"_blank"}},[t._v("没有账号？去添加一个")])])]),t._v(" "),a("i",{staticClass:"el-icon-question"})])],1),t._v(" "),a("el-form-item",{attrs:{label:"支付密码"}},[a("el-input",{staticStyle:{"max-width":"300px"},attrs:{type:"password",size:"small",placeholder:"请输入支付密码"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),t._v(" "),a("el-form-item",[a("el-button",{on:{click:t.doneHandler}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary",disabled:1==t.order.status||2==t.order.status},on:{click:t.pay}},[t._v("确 定")])],1)],1)],1)},[],!1,null,null,null).exports,$={name:"license-event",data:function(){return{accepted:!1,licenses:[]}},mounted:function(){this.loadLicenses()},props:["contractDetail","params"],methods:{loadLicenses:function(){var t=this,e=this.params.params.map(function(e){return t.loadLicenseContent(e)});Promise.all(e).then(function(e){t.licenses=e}).catch(this.$error.showErrorMessage)},loadLicenseContent:function(t){var e=this;return this.$axios.get("/v1/auths/resource/".concat(t,".data")).then(function(t){if(15!=t.getData().errcode)return t.getData();e.$message.warning("协议格式不正确，请联系合约作者。")})},signHandler:function(){var t=this;this.$services.signingLicenses.post({contractId:this.contractDetail.contractId,eventId:this.params.eventId,licenseIds:this.params.params,nodeId:this.$route.params.nodeId}).then(function(e){0===e.data.errcode?(t.$message.success("执行成功"),t.doneHandler(!0)):t.$message.error(e.data.msg)})},doneHandler:function(t){this.$emit("close",{shouldUpdate:t})}}},E=(a("q4R6"),Object(I.a)($,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"license-event-wrap"},[a("el-form",{staticClass:"small-el-form",attrs:{"label-position":"left","label-width":"80px",model:t.contractDetail}},[a("el-form-item",{attrs:{label:"协议"}},[a("div",{staticClass:"license-window"},t._l(t.licenses,function(e){return a("pre",{staticClass:"license-format"},[t._v("          "+t._s(e)+"\n        ")])}))]),t._v(" "),a("el-form-item",[a("el-checkbox",{staticClass:"accept-license",model:{value:t.accepted,callback:function(e){t.accepted=e},expression:"accepted"}},[t._v("接受协议")])],1),t._v(" "),a("div",{staticClass:"center"},[a("el-button",{on:{click:t.doneHandler}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary",disabled:!t.accepted},on:{click:t.signHandler}},[t._v("确 定")])],1)],1)],1)},[],!1,null,null,null).exports),S={name:"contract-detail-info",data:function(){return{detail:null,refreshing:!1}},props:{data:{type:Object,default:function(){return{statusInfo:{}}}},shouldShowSegment:{type:Boolean,default:function(){return!0}},labelWidth:{type:Number,default:function(){return 100}},showRefreshing:{type:Boolean,default:function(){return!1}}},mounted:function(){this.render()},watch:{data:"render"},methods:{refreshHandler:function(){var t=this;this.refreshing=!0,this.$emit("refresh",{done:function(){t.refreshing=!1}})},render:function(){this.detail=l.format(this.data)}}},x=(a("BAG8"),Object(I.a)(S,function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.detail?a("el-form",{staticClass:"small-el-form",attrs:{"label-position":"right","label-width":t.labelWidth+"px"}},[a("el-form-item",{attrs:{label:"合同ID"}},[t._v("\n    "+t._s(t.detail.contractId)+"\n  ")]),t._v(" "),a("el-form-item",{attrs:{label:"创建日期"}},[a("span",[t._v(t._s(t._f("fmtDate")(t.detail.createDate)))])]),t._v(" "),t.detail.statusInfo?a("el-form-item",{attrs:{label:"合同状态"}},[a("el-tag",{attrs:{type:t.detail.statusInfo.type}},[t._v("\n      "+t._s(t.detail.statusInfo.desc)+"\n    ")]),t._v(" "),t.showRefreshing&&t.detail.status<3?a("i",{staticClass:"el-icon-refresh",class:{"el-icon-loading":t.refreshing},on:{click:t.refreshHandler}}):t._e()],1):t._e(),t._v(" "),a("el-form-item",{attrs:{label:"状态机状态"}},[a("el-tag",{attrs:{type:3===t.detail.status?"success":"warning"}},[t._v("\n      "+t._s(t.detail.fsmState)+"\n    ")])],1),t._v(" "),a("el-form-item",{attrs:{label:"甲方"}},[t.detail.partyOneInfo?a("span",[t._v(t._s(t.detail.partyOneInfo.nickname))]):a("span",[t._v(t._s(t.detail.partyOne))])]),t._v(" "),a("el-form-item",{attrs:{label:"乙方"}},[t.detail.partyTwoInfo?a("span",[t._v(t._s(t.detail.partyTwoInfo.nodeName))]):a("span",[t._v(t._s(t.detail.partyTwo))])]),t._v(" "),t.detail.policySegment&&t.shouldShowSegment?a("el-form-item",{attrs:{label:"合同详情"}},[a("br"),t._v(" "),a("pre",{staticStyle:{overflow:"auto"}},[t._v(t._s(t.detail._segmentText))])]):t._e(),t._v(" "),t._t("default")],2):t._e()},[],!1,null,"efaf8024",null).exports),O={transaction:function(){return"支付事件"},signing:function(t){return"进入协议签署页面"},contractGuaranty:function(){return"进入支付保证金"},period:function(){return"周期性支付"},arrivalDate:function(t){return 1===t[0]?"到达日期"+t[1]+"进入下一个状态":0===t[0]?t[1]+"天后进入下一个状态":void 0}},H={name:"contract-content",data:function(){return{segmentDetail:""}},props:{data:{type:Object}},watch:{data:"render"},mounted:function(){this.render()},methods:{render:function(){this.currentEvents=this.resolveContractEvents(this.data),this.segmentDetail=this.parseContract(this.data)},cmdHandler:function(t){var e=t.target.dataset.action;this[e]&&this[e](t.target.dataset)},execEvent:function(t){this.$emit("execute",this.currentEvents[t.index])},resolveContractEvents:function(t){var e=[],a=t.fsmState,n=[];t.policySegment.fsmDescription.forEach(function(t){t.currentState===a&&n.push(t)});var r=function(t){var a=O[t.type];a&&e.push({desc:a(t.type),eventId:t.eventId,type:t.type,params:t.params})};return n.forEach(function(t){t.event&&("compoundEvents"===t.event.type?t.event.params.forEach(r):r(t.event))}),e},fillSpace:function(t){return t.replace(/^(\s+)/g,function(t){var e=new Array(t.length);return e.fill("&nbsp;"),e.join("")})},getState:function(t){var e=this.data,a=[];return t===e.fsmState&&a.push("cur-state"),e.policySegment.activatedStates.includes(t)&&a.push("active-state"),a.join(" ")},tagState:function(t){var e=this;return t=t.replace(/in (\S+)\s*:/,function(t,a){var n=e.escapeOutputState(a),r=e.getState(a),s='<span class="from-state '.concat(r,'" data-action="info" data-state="').concat(a,'">').concat(n,'<i class="el-icon-fa-arrow-circle-left cur-step-icon"></i></span>');return t.replace(a,s)})},getEvent:function(t){var e;return this.currentEvents.forEach(function(a,n){a.params.every(function(e){return t.includes(e)})&&((e=a).index=n)}),e},escapeOutputState:function(t){return t=t.replace("<","&lt;").replace(">","&gt;")},tagOperation:function(t){var e=this;return t=t.replace(/proceed\s+to\s+(\S+)\s+on\s+(.+)$/,function(t,a,n){var r=e.getEvent(n),s=-1,o=e.escapeOutputState(a),c='<span class="to-state">'.concat(o,"</span>"),i="";return r?(s=r.index,i='<span class="operation-tag" data-action="execEvent" data-index="'.concat(s,'">').concat(n,'<i class="el-icon-fa-hand-o-left cur-step-icon"></i></span>')):i='<span class="operation-tag">'.concat(n,"</span>"),t=(t=t.replace(a,c)).replace(n,i)})},parseContract:function(t){var e=this,a="";return s.a.beautify(t.policySegment.segmentText).split(/\n/).forEach(function(t){var n=e.fillSpace(t);n=e.tagState(n),n=e.tagOperation(n),a+="<p>".concat(n,"</p>")}),t._segmentDetail=a,a}}},T=(a("9K4q"),{transaction:{type:"transaction-event",title:"支付"},signing:{type:"license-event",title:"签署"}}),k={name:"presentable-contract-detail",data:function(){return{eventComponent:"",dialogTitle:"",showEventExecDialog:!1,contractDetail:{},resourceDetail:{},account:"",options:[],password:"",selectedContractEvent:""}},components:{TransactionEvent:w,LicenseEvent:E,ContractDetailInfo:x,ContractContent:Object(I.a)(H,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"contract-detail-content-wrapper"},[e("div",{domProps:{innerHTML:this._s(this.segmentDetail)},on:{click:this.cmdHandler}})])},[],!1,null,null,null).exports},props:{contractId:String},watch:{contractId:"initContractDetail"},mounted:function(){this.initContractDetail()},methods:{initContractDetail:function(){var t=this;this.contractId&&this.loadContractDetail(this.contractId).then(function(e){Object(p.c)(e.resourceId).then(function(e){t.resourceDetail=e}),t.contractDetail=l.format(e)})},handleCloseDialog:function(t){this.closeDialogHandler(),t()},closeDialogHandler:function(t){var e=this;t&&t.shouldUpdate&&setTimeout(function(){e.updateContractDetail()},500),this.eventComponent="",this.dialogTitle="",this.$refs.eventDialog.hide()},formatData:function(){var t=Object.assign({},this.contractDetail);t=l.format(t)},loadContractDetail:function(t){return this.$services.contract.get(t||{}).then(function(t){return t.getData()}).catch(this.$error.showErrorMessage)},updateContractDetail:function(t){var e=this;this.loadContractDetail(this.contractDetail.contractId).then(function(a){Object.assign(e.contractDetail,a),e.formatData(),t&&t.done&&t.done()})},executeContractHandler:function(t){var e=T[t.type];this.selectedContractEvent=t,this.eventComponent=e.type,this.dialogTitle=e.title,this.showEventExecDialog=!0},activateContractHandler:function(t){var e=this;this.$axios.get("/v1/contracts/initial",{params:{contractIds:t.contractId}}).then(function(a){0===a.data.errcode?(e.$message.success("成功激活合同"),e.loadContractDetail(t.contractId).then(function(a){Object.assign(t,a),e.$emit("update",l.format(t))})):e.$error.showErrorMessage(a.data.msg)})}}},j=(a("ZKxy"),Object(I.a)(k,function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.contractDetail.contractId?a("section",[a("el-dialog",{ref:"eventDialog",attrs:{title:t.dialogTitle,visible:t.showEventExecDialog,"before-close":t.handleCloseDialog,center:!0,width:"40%"},on:{"update:visible":function(e){t.showEventExecDialog=e}}},[a(t.eventComponent,{tag:"component",attrs:{contractDetail:t.contractDetail,params:t.selectedContractEvent},on:{close:t.closeDialogHandler}})],1),t._v(" "),a("div",[a("el-form",{attrs:{"label-width":"120px"}},[a("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{label:"资源名称"}},[t._v("\n        "+t._s(t.resourceDetail.resourceName)+"\n      ")]),t._v(" "),a("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{label:"资源类型"}},[t._v("\n        "+t._s(t.resourceDetail.resourceType)+"\n      ")])],1),t._v(" "),a("contract-detail-info",{attrs:{data:t.contractDetail,showRefreshing:!0,labelWidth:120,shouldShowSegment:!1},on:{refresh:t.updateContractDetail}},[a("el-form-item",{attrs:{label:"合同详情"}},[a("contract-content",{attrs:{data:t.contractDetail},on:{execute:t.executeContractHandler}})],1),t._v(" "),1===t.contractDetail.status?a("el-form-item",{staticClass:"flex-grid",attrs:{label:"激活合同"}},[a("el-button",{attrs:{size:"small"},on:{click:function(e){t.activateContractHandler(t.contractDetail)}}},[t._v("立即激活\n        ")])],1):t._e()],1)],1)],1):t._e()},[],!1,null,"942d410e",null).exports);a("b1je");function q(t){return(q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var P={name:"node-contracts",data:function(){return{contractList:[],query:"",presentables:[],currentContract:{}}},components:{TableView:n.a,ContractDetail:j},mounted:function(){var t=this,e=this.$route.query;this.loadPresentables({nodeId:this.$route.params.nodeId,isOnline:2}).then(function(a){var n=a.map(function(t){return t.presentableId});n.length&&t.loadContractInfos(n).then(function(a){a.forEach(function(a){var n=[],r=[],s={};a.contracts=a.contracts.filter(function(o){if(r.push(o.resourceId),n.push(o.contractId),s[o.contractId]=o,l.format(o),e.contractId&&t.showContractDetailHandler(o),!o.isMasterContract)return o;a.masterContract=o})}),t.presentables=a})})},methods:{loadContractsDetail:function(t){return this.$axios.get("v1/contracts/contractRecords",{params:{contractIds:t.join(",")}}).then(function(t){return t.getData()})},loadContractInfos:function(t){return this.$axios.get("v1/presentables/contractInfos",{params:{nodeId:this.$route.params.nodeId,presentableIds:t.join(",")}}).then(function(t){return t.getData()})},loadResourceData:function(t){return this.$axios.get("/v1/resources/list",{params:{resourceIds:t.join(",")}}).then(function(t){return t.getData()})},loadContracts:function(t){return this.$services.contract.get(t||{}).then(function(t){return t}).catch(this.$error.showErrorMessage)},loadPresentables:function(t){return C.presentable.loadDetail({params:t}).catch(this.$error.showErrorMessage)},mergeDataByResourceId:function(t,e){var a=this,n={};e.forEach(function(t){n[t.resourceId]=t}),t.forEach(function(t){var e=n[t.resourceId]||null;a.$set(t,"resourceDetail",e)})},loader:function(){var t=this,e=this;return function(a){var n=e.$route.params.nodeId;return"object"===q(a)&&(Object.assign(a,{partyTwo:n,contractType:2}),a={params:a}),e.loadContracts(a).then(function(a){if(!a.data.data)return[];var n=a.data.data.dataList;n.map(function(t){return l.format(t),t.contractId});if(!n.length)return a;var r=n.map(function(t){return t.resourceId});return Promise.all([t.loadResourceData(r)]).then(function(t){var a=t[0];return e.mergeDataByResourceId(n,a),console.log(n),n})})}},handlePresentable:function(t){var e=this.$route.params.nodeId;t.presentableDetail?this.$router.push({path:"/node/".concat(e,"/presentable/detail"),query:{presentableId:t.presentableDetail.presentableId}}):this.$router.push({path:"/node/".concat(e,"/presentable/detail#presentable"),query:{contractId:t.contractId}})},previewHandler:function(t){var e={};t.presentableDetail?e.presentableId=t.presentableDetail.presentableId:e.contractId=t.contractId,this.$router.push({path:"/node/".concat(this.$route.params.nodeId,"/presentable/detail#contract"),query:e})},showContractDetailHandler:function(t){t&&t.contractId&&(this.currentContract=t)},resolveContractCreatorLink:function(t){return"/node/".concat(this.$route.params.nodeId,"/presentable/").concat(t.presentableId,"/scheme_detail")},updateContractHandler:function(t){Object.assign(this.currentContract,t)}}},R=(a("Fg1L"),Object(I.a)(P,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"node-contracts-container"},[a("div",{staticClass:"contract-list-wrapper"},[t._m(0),t._v(" "),a("ul",{staticClass:"presentable-list"},t._l(t.presentables,function(e){return a("li",{staticClass:"presentable-item"},[a("div",{staticClass:"presentable-name",class:[e.masterContract?"contract-status-"+e.masterContract.status:""],on:{click:function(a){t.showContractDetailHandler(e.masterContract)}}},[a("i",{staticClass:"dot"}),t._v(t._s(e.presentableName)+"\n          "),e.masterContract?a("span"):a("span",[a("router-link",{attrs:{to:t.resolveContractCreatorLink(e)}},[t._v("未创建合同")])],1)]),t._v(" "),e.contracts.length?a("ul",{staticClass:"contract-list"},t._l(e.contracts,function(e){return a("li",{staticClass:"contract-item",class:["contract-status-"+e.status],on:{click:function(a){t.showContractDetailHandler(e)}}},[a("div",[a("i",{staticClass:"dot"}),t._v("子资源合同ID： "+t._s(e.contractId))]),t._v(" "),e.resourceDetail?a("div",[a("div",[t._v(t._s(e.resourceDetail.resourceName))])]):t._e()])})):t._e()])}))]),t._v(" "),t.currentContract.contractId?a("div",{staticClass:"contract-exec-container"},[a("contract-detail",{attrs:{contractId:t.currentContract.contractId},on:{update:t.updateContractHandler}})],1):t._e()])},[function(){var t=this.$createElement,e=this._self._c||t;return e("h4",{staticClass:"contract-list-title"},[e("i",{staticClass:"el-icon-question"}),this._v("合约列表")])}],!1,null,"08b9b1d6",null));e.default=R.exports},IP6f:function(t,e,a){"use strict";var n=a("3eXy");a("snnE");function r(t){return n.PresentablesService.get(t).then(function(t){return t.getData()})}var s=r;e.a={loadDetail:r,onloadPresentableDetail:s}},Kj8m:function(t,e,a){"use strict";var n=a("dRni");a.n(n).a},Koc6:function(t,e,a){},PPAp:function(t,e){},Po4U:function(t,e){},SJTO:function(t,e,a){},Vxpq:function(t,e,a){},Xt4e:function(t,e,a){},ZKxy:function(t,e,a){"use strict";var n=a("Koc6");a.n(n).a},dRni:function(t,e,a){},q4R6:function(t,e,a){"use strict";var n=a("wO9o");a.n(n).a},wO9o:function(t,e,a){}}]);