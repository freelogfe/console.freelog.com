(window.webpackJsonp=window.webpackJsonp||[]).push([["node~presentable"],{"+cXM":function(e,t,s){"use strict";s.r(t);var n=s("8SHQ"),a=s("vNxF"),i={name:"fl-switch",data:function(){return{checked:!1}},props:{width:{type:String,default:function(){return"50px"}},value:{type:[Boolean,String,Number],default:!1},activeText:String,inactiveText:String},watch:{},mounted:function(){this.checked=this.value},computed:{},methods:{switchHandler:function(){this.checked=!this.checked,this.$emit("input",this.checked),this.$emit("change",this.checked)}}},r=(s("0T9k"),s("KHd+")),l=Object(r.a)(i,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"fl-switch-wrap"},[s("div",{staticClass:"switch-container",class:[e.checked?"active-switch":"inactive-switch"],on:{click:e.switchHandler}},[s("i",{staticClass:"switch-mesh"}),e._v(" "),s("span",{staticClass:"switch-label"},[e._v(e._s(e.checked?e.activeText:e.inactiveText))])])])},[],!1,null,"7ac8082e",null).exports,c=s("H2zm"),o=n.a.PRESENTABLE_STATUS_TIPS,u={name:"presentables",data:function(){return{showSearchResource:!1,presentableList:[],currentPresentable:{index:-1,detail:{}}}},components:{PresentableDetail:a.default,FreelogSwitch:l,SearchResource:c.a},watch:{$route:function(){this.initView(this.$route.params.nodeId)}},mounted:function(){this.initView(this.$route.params.nodeId)},methods:{queryHandler:function(){this.$message.warning("待开发")},initView:function(e){var t=this;e?(Object.assign(this.currentPresentable,{index:-1,detail:{}}),this.loadPresentables({nodeId:e,isOnline:2}).then(this.formatHandler.bind(this)).then(function(e){t.presentableList=e})):this.$message.error("缺失节点ID参数")},formatHandler:function(e){var t=this;return e&&e.length?(e.forEach(function(e){t.resolvePresentable(e)}),e):[]},resolvePresentable:function(e){e.isOnlineChecked=!!e.isOnline,e._statusInfo=o[e.status],e.isReady=3==(3&e.status)},loadPresentables:function(e){return this.$services.presentables.get({params:e}).then(function(e){return e.getData()}).catch(this.$error.showErrorMessage)},changePresentableHandler:function(e,t){this.currentPresentable.index=t,this.currentPresentable.detail=e},changePresentableOnlineHandler:function(e){var t=this;e.isOnlineChecked?e.isOnline=1:e.isOnline=0,this.$services.presentables.put(e.presentableId,{isOnline:e.isOnline}).then(function(s){0===s.data.errcode||(e.isOnline=0,e.isOnlineChecked=!1,t.$message.error(s.data.msg||"更新失败"))}).catch(function(s){e.isOnline=0,e.isOnlineChecked=!1,t.$error.showErrorMessage(s)})},showSearchResourceHandler:function(){this.showSearchResource=!0},beforeCloseDialogHandler:function(){this.showSearchResource=!1},addResourceHandler:function(e){var t=this;this.createPresentable({nodeId:this.$route.params.nodeId,presentableName:e.resourceName,resourceId:e.resourceId}).then(function(e){t.presentableList.push(e),t.showSearchResource=!1}).catch(this.$error.showErrorMessage)},createPresentable:function(e){return this.$services.presentables.post(e).then(function(e){return 0!==e.data.errcode?Promise.reject(e.data.msg):e.getData()})},updatePresentableHandler:function(e){var t=this.currentPresentable.detail;Object.assign(t,e),this.resolvePresentable(t)}}},d=(s("PuKU"),Object(r.a)(u,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",{staticClass:"presentables-wrapper"},[s("div",{staticClass:"presentable-list-container"},[e._m(0),e._v(" "),s("ul",{staticClass:"presentable-list"},[e._l(e.presentableList,function(t,n){return s("li",{staticClass:"presentable-item",class:[t.isReady?"active-status-2":"active-status-0",{active:e.currentPresentable.index===n,"is-presentable-online":t.isOnlineChecked}],on:{click:function(s){e.changePresentableHandler(t,n)}}},[s("i",{staticClass:"dot"}),e._v(" "),s("freelog-switch",{staticClass:"node-res-status-switch",attrs:{"active-text":"上线","inactive-text":"下线"},on:{change:function(s){e.changePresentableOnlineHandler(t)}},model:{value:t.isOnlineChecked,callback:function(s){e.$set(t,"isOnlineChecked",s)},expression:"presentable.isOnlineChecked"}}),e._v(" "),s("span",{staticClass:"p-title"},[e._v(e._s(t.presentableName))])],1)}),e._v(" "),s("li",{staticClass:"presentable-item add-presentable-btn",on:{click:e.showSearchResourceHandler}},[s("i",{staticClass:"el-icon-plus"}),e._v("添加节点资源")])],2)]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.currentPresentable.detail.presentableId,expression:"currentPresentable.detail.presentableId"}],staticClass:"presentable-detail-container"},[s("presentable-detail",{tag:"component",staticClass:"presentable-detail-content",attrs:{detail:e.currentPresentable.detail},on:{update:e.updatePresentableHandler}})],1),e._v(" "),s("el-dialog",{attrs:{visible:e.showSearchResource,width:"840px","close-on-click-modal":!1,"before-close":e.beforeCloseDialogHandler,top:"10vh",center:""},on:{"update:visible":function(t){e.showSearchResource=t}}},[s("p",{staticClass:"dialog-title",attrs:{slot:"title"},slot:"title"},[e._v("添加资源")]),e._v(" "),s("search-resource",{staticClass:"add-resource-input",on:{add:e.addResourceHandler}})],1)],1)},[function(){var e=this.$createElement,t=this._self._c||e;return t("h4",[t("i",{staticClass:"el-icon-question"}),this._v("节点资源")])}],!1,null,"4713e4a5",null));t.default=d.exports},"0T9k":function(e,t,s){"use strict";var n=s("A/tM");s.n(n).a},"3YKn":function(e,t,s){},"A/tM":function(e,t,s){},ESlw:function(e,t,s){"use strict";var n={name:"freelog-tags",data:function(){return{tags:[],inputVisible:!1,inputValue:""}},props:{value:{type:Array,default:function(){return[]}},actionText:{type:String,default:function(){return"New Tag"}}},watch:{value:function(e){this.setCurrentValue(e)}},mounted:function(){this.setCurrentValue(this.value)},methods:{setCurrentValue:function(e){this.tags=e},handleClose:function(e){this.tags.splice(this.tags.indexOf(e),1),console.log(this.tags),this.$emit("input",this.tags)},showInput:function(){var e=this;this.inputVisible=!0,this.$nextTick(function(t){e.$refs.saveTagInput.$refs.input.focus()})},handleInputConfirm:function(){var e=this.inputValue;e&&(this.tags.push(e),this.$emit("input",this.tags)),this.inputVisible=!1,this.inputValue=""}}},a=(s("kFP0"),s("KHd+")),i=Object(a.a)(n,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[e._l(e.tags,function(t){return s("el-tag",{key:t,staticClass:"user-defined-tag",attrs:{closable:"","disable-transitions":!1},on:{close:function(s){e.handleClose(t)}}},[e._v("\n    "+e._s(t)+"\n  ")])}),e._v(" "),e.inputVisible?s("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",attrs:{size:"small"},on:{blur:e.handleInputConfirm},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleInputConfirm(t):null}},model:{value:e.inputValue,callback:function(t){e.inputValue=t},expression:"inputValue"}}):s("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:e.showInput}},[s("i",{staticClass:"el-icon-plus"}),e._v(" "+e._s(e.actionText))])],2)},[],!1,null,"03cf44fc",null);t.a=i.exports},G2YG:function(e,t,s){"use strict";var n=s("kXmV");s.n(n).a},NPCl:function(e,t,s){"use strict";var n=s("p/bd");s.n(n).a},PuKU:function(e,t,s){"use strict";var n=s("pZ3u");s.n(n).a},"R+Kc":function(e,t,s){},kFP0:function(e,t,s){"use strict";var n=s("R+Kc");s.n(n).a},kXmV:function(e,t,s){},"n8+z":function(e,t,s){"use strict";var n=s("3YKn");s.n(n).a},"p/bd":function(e,t,s){},pZ3u:function(e,t,s){},rfs2:function(e,t,s){"use strict";var n=s("ESlw"),a=(s("mL9P"),s("b4GV")),i=(s("hnv+"),s("LvDl"),s("8SHQ").a.PRESENTABLE_STATUS_TIPS),r={name:"presentable-editor",data:function(){return{rules:{name:[{required:!0,message:"请输入presentable name",trigger:"blur"}]},inputData:{presentableName:"",policy:[],userDefinedTags:[]},userDefinedTags:[]}},components:{TagsEditor:n.a,PresentablePolicy:a.a},props:{data:{type:Object}},watch:{data:function(){this.initView()}},computed:{isValidPolicy:function(){return this.inputData.policy.some(function(e){return 1===e.status})}},mounted:function(){this.initView()},methods:{initView:function(){this.data.presentableId&&(Object.assign(this.inputData,this.data),this.userDefinedTags=this.inputData.userDefinedTags)},validatePolicyHandler:function(e){e.done&&this.$message.success("校验通过")},changePolicyHandler:function(){},formatPresentable:function(e){e._statusInfo=i[e.status],e.isReady=3==(3&e.status)},savePresentableHandler:function(){var e=this,t=this.$refs.editor.getChangeData(),s={presentableName:this.inputData.presentableName};s.userDefinedTags=this.userDefinedTags,Object.keys(t).length&&(s.policies=t),this.$services.presentables.put(this.data.presentableId,s).then(function(t){if(0===t.data.errcode){var s=t.getData();delete s.resourceInfo,Object.assign(e.inputData,s),e.formatPresentable(e.inputData),e.$emit("onSaveEnd",s),e.$message.success("更新成功")}else e.$message.error(t.data.msg||"更新失败")}).catch(this.$error.showErrorMessage)}}},l=(s("n8+z"),s("KHd+")),c=Object(l.a)(r,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",{staticClass:"presentable-input-info"},[s("div",{staticClass:"presentable-input-item"},[e._m(0),e._v(" "),s("div",{staticClass:"p-input-item-content"},[s("el-input",{staticClass:"presentable-name-input",attrs:{placeholder:"输入节点资源名称"},model:{value:e.inputData.presentableName,callback:function(t){e.$set(e.inputData,"presentableName",t)},expression:"inputData.presentableName"}})],1)]),e._v(" "),s("div",{staticClass:"presentable-input-item"},[e._m(1),e._v(" "),s("div",{staticClass:"p-input-item-content"},[s("tags-editor",{attrs:{actionText:"新标签"},model:{value:e.userDefinedTags,callback:function(t){e.userDefinedTags=t},expression:"userDefinedTags"}})],1)]),e._v(" "),s("div",{staticClass:"presentable-input-item"},[s("p",{staticClass:"p-input-item-title",class:[e.isValidPolicy?"active-status-2":"active-status-0"]},[s("i",{staticClass:"dot"}),e._v("节点资源授权策略")]),e._v(" "),s("presentable-policy",{ref:"editor",attrs:{showValidate:!1},on:{change:e.changePolicyHandler},model:{value:e.inputData,callback:function(t){e.inputData=t},expression:"inputData"}})],1),e._v(" "),s("div",{staticClass:"presentable-input-ft"},[s("el-button",{staticClass:"p-input-btn",on:{click:e.savePresentableHandler}},[e._v("保存")])],1)])},[function(){var e=this.$createElement,t=this._self._c||e;return t("p",{staticClass:"p-input-item-title active-status-0"},[t("i",{staticClass:"dot",staticStyle:{visibility:"hidden"}}),this._v("节点资源名称")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",{staticClass:"p-input-item-title"},[t("i",{staticClass:"dot",staticStyle:{visibility:"hidden"}}),this._v("节点资源标签")])}],!1,null,"0bfc1d14",null);t.a=c.exports},vNxF:function(e,t,s){"use strict";s.r(t);s("hnv+");var n=s("b4GV"),a=s("ESlw"),i=(s("mL9P"),s("rfs2")),r=s("qTA6"),l=s("59r6"),c=s("aNms");function o(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}var u={name:"presentable-detail",data:function(){return{showBindWidgetDialog:!1,loading:!1,bindWidget:{},presentableDetail:{},activeTabName:"resource",nodeId:this.$route.params.nodeId,editPresentable:{name:"",policyText:"",userDefinedTags:[]},presentableData:{resourceInfo:{}}}},props:{detail:{type:Object}},components:{PresentablePolicy:n.a,FreelogTags:a.a,PresentableEditor:i.a,ResourceIntroInfo:r.a},computed:{},watch:{"detail.presentableId":function(){this.initView()}},mounted:function(){this.initView()},methods:{initView:function(){var e=this;this.detail.resourceId&&(this.presentableData=this.detail,l.a.onloadResourceDetail(this.detail.resourceId).then(function(t){e.presentableData.resourceInfo=function(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{},n=Object.keys(s);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(s).filter(function(e){return Object.getOwnPropertyDescriptor(s,e).enumerable}))),n.forEach(function(t){o(e,t,s[t])})}return e}({},t)}),this.loadPresentableScheme())},loadPresentableScheme:function(){var e=this,t=this.getPresentableContract();t&&c.a.onloadSchemeDetail(t.authSchemeId).then(function(s){if(s){for(var n=0;n<s.policy.length;n++){var a=s.policy[n];if(a.segmentId===t.policySegmentId){s.selectedPolicy=a;break}}e.$set(e.presentableData,"scheme",s)}})},getPresentableContract:function(){var e=this.presentableData.contracts||[];if(e.length)for(var t,s=0;s<e.length;s++)if((t=e[s]).resourceId===this.presentableData.resourceId)return t;return null},gotoSchemeDetailHandler:function(){this.$router.push({path:"/node/".concat(this.$route.params.nodeId,"/presentable/").concat(this.detail.presentableId,"/scheme_detail"),query:{resourceId:this.detail.resourceId}})},savePresentableEnd:function(e){this.$emit("update",e)}}},d=(s("G2YG"),s("NPCl"),s("KHd+")),h=Object(d.a)(u,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",{staticClass:"presentable-detail-wrapper"},[s("resource-intro-info",{staticClass:"res-intro-info",attrs:{resource:e.presentableData.resourceInfo}},[s("div",{staticClass:"presentable-auth-intro",class:{"active-status-2":e.presentableData.scheme},on:{click:e.gotoSchemeDetailHandler}},[s("i",{staticClass:"dot"}),e._v(" "),e.presentableData.scheme&&e.presentableData.scheme.selectedPolicy?s("span",[e._v("\n        "+e._s(e.presentableData.scheme.authSchemeName)+"/"+e._s(e.presentableData.scheme.selectedPolicy.policyName)+"\n      ")]):s("span",[e._v("未选择授权方案及授权策略")]),e._v(" "),s("i",{staticClass:"el-icon-edit"})])]),e._v(" "),s("presentable-editor",{attrs:{data:e.presentableData},on:{onSaveEnd:e.savePresentableEnd}})],1)},[],!1,null,"9d68f8de",null);t.default=h.exports}}]);