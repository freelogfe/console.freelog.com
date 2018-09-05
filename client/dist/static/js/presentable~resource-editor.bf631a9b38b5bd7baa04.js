(window.webpackJsonp=window.webpackJsonp||[]).push([["presentable~resource-editor"],{"7+cO":function(e,t,s){"use strict";var c=s("LvDl"),r=s("aNms"),i=s("59r6"),n=s("b4GV"),a=s("NKFe"),o=s.n(a),u=s("qTA6"),h=s("VnyS"),l=s("hupZ"),d=1;function m(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}var f={name:"resource-scheme-tree",components:{PolicyEditor:n.a,SchemeDetail:h.a,ResourceIntroInfo:u.a},props:{updateCallback:{type:Function},detail:{type:Object,default:function(){return{dependencies:[]}}},resourceId:{type:String,default:function(){return""}},resource:{type:Object,default:function(){return{}}},contracts:{type:Array,default:function(){return[]}},bubbleResources:{type:Array,default:function(){return[]}},config:{type:Object,default:function(){return{}}}},data:function(){var e=!!this.$route.params.nodeId;return{isNodeDetail:e,schemes:[],dutyStatements:[],viewMode:e?"tree":"list",currentAuthNodeIndex:-1,dutyResourceMap:{},resourcesMap:{},resourceSchemesCache:{},parentResource:null}},mounted:function(){var e=this;this.initView().then(this.fillDutyStatements.bind(this)).then(function(){e.changeViewMode(e.viewMode)})},computed:{unsignPolicyList:function(){return this.dutyStatements.filter(function(e){return!e.contractId})}},watch:{resourceId:function(e,t){t&&(this.resourceSchemesCache[t]?this.resourceSchemesCache[t].schemes=this.schemes:this.resourceSchemesCache[t]={schemes:this.schemes}),this.initView(),this.changeViewMode("tree")},resource:function(e,t){var s=this;e&&t&&e.resourceId===t.resourceId||(t&&t.resourceId&&(this.resourceSchemesCache[t.resourceId]?this.resourceSchemesCache[t.resourceId].schemes=this.schemes:this.resourceSchemesCache[t.resourceId]={schemes:this.schemes}),e.resourceId?this.parentResource=e:this.parentResource={},this.initView().then(this.fillDutyStatements.bind(this)).then(function(){s.changeViewMode("tree")}).catch(function(e){s.schemes=[],s.$error.showErrorMessage(e)}))}},methods:{fillDutyStatements:function(){var e=this;this.schemes.forEach(function(t){return e.onSetResourceDetail(t),e.haveSelectedScheme(t),e.checkResourceActiveStatus(t),t.resourceId}),this.$forceUpdate()},initView:function(){var e=this,t=this.resourceId||this.resource.resourceId;if(!t)return this.schemes=[],Promise.resolve();var s=this.resourceSchemesCache[t];return this.dutyStatements=this.contracts,this.contracts.forEach(function(t){var s=t.resourceId;e.dutyResourceMap[s]=t}),s&&s.schemes?(this.schemes=[],this.pushSchemeDep(s.resource),Promise.resolve()):(this.resource&&this.resource.resourceId?Promise.all([this.loadSchemesForResource(t)]).then(function(t){var s=e.resource;return s.schemes=e.formatSchemes(t[0]),s}):Promise.all([i.a.onloadResourceDetail(t),this.loadSchemesForResource(t)]).then(function(t){var s=t[0];return s.schemes=e.formatSchemes(t[1]),s})).then(function(s){s.activeIndex=0,e.resourceSchemesCache[t]={resource:s},e.schemes=[],e.pushSchemeDep(s)})},loadSchemesForResource:function(e){var t=this;return r.a.onloadSchemesForResource(e,{policyStatus:2}).then(function(s){var c=s.map(function(e){return e.authSchemeId});if(!c.length)return s;var r={authSchemeIds:c.join(",")};return t.$route.params.nodeId&&(r.nodeId=t.$route.params.nodeId),t.$axios.get("/v1/auths/authSchemeIdentityAuth",{params:r}).then(function(c){var r=c.getData(),i={},n=t.dutyResourceMap[e];return r.forEach(function(e){e.policy.forEach(function(t){i["".concat(e.authSchemeId,"_").concat(t.segmentId)]=t.authResult&&t.authResult.isAuth})}),s=s.filter(function(e){var t=e.status===l.a.PUBLISHED,s=n&&n.authSchemeId===e.authSchemeId;if(t||s)return e.policy=e.policy.filter(function(s){if(t&&s.status===d||n.policySegmentId===s.segmentId)return s.isAuth=!!i["".concat(e.authSchemeId,"_").concat(s.segmentId)],s}),e})})})},checkResourceActiveStatus:function(e){var t,s=this,r="resourceId",i=Object(c.intersectionBy)(this.dutyStatements,[e],r);if(!i.length)return(i=Object(c.intersectionBy)(this.bubbleResources,[e],r)).length?e.isResolved=!1:e.activeStatus=l.b.UNHANDLE,!1;var n=Object(c.unionBy)(this.bubbleResources,this.dutyStatements,r);i=Object(c.intersectionBy)(n,e.dependenciesTree,r),t=(i=Object(c.differenceBy)(i,this.dutyStatements,r)).length?l.b.SOME:l.b.ALL,e.activeStatus=t,e.selectedScheme&&e.selectedScheme.authSchemeId&&e.selectedScheme.dependencies.forEach(function(e){s.checkResourceActiveStatus(e)})},formatPolicyText:function(e){var t;try{t=o.a.beautify(e)}catch(s){t=e}return t},changeViewMode:function(e){this.viewMode=e,this.$emit("changeMode",e),"list"===e?(this.hideLineArrow(this.$el),this.showUnSignedPolicyList()):this.showLineArrows()},showUnSignedPolicyList:function(){var e=this,t=[],s=[];this.dutyStatements.forEach(function(c){t.push(c.resourceId),e.onSetResourceDetail(c),c.selectedScheme||s.push(c.resourceId)}),s.length&&r.a.loadAuthSchemes({resourceIds:s,authSchemeStatus:1,policyStatus:1}).then(function(t){var s=[];t.forEach(function(t){var c=e.resourcesMap[t.resourceId];c.schemes?c.schemes.push(t):(c.schemes=[t],s.push(c))}),s.forEach(function(t){e.resolveResourceSchemes(t),e.haveSelectedScheme(t)})}).then(function(){e.$nextTick(function(){e.$forceUpdate()})})},showPublishEditErrorTip:function(){this.$message.warning("已发布授权点，当前操作不可执行")},loadResourcesDetail:function(e){if(e.length)return i.a.loadResources(e).then(function(e){return e})},changePolicy:function(e,t,s){t.selectedPolicySegmentId&&(t.selectedPolicy=function(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{},c=Object.keys(s);"function"==typeof Object.getOwnPropertySymbols&&(c=c.concat(Object.getOwnPropertySymbols(s).filter(function(e){return Object.getOwnPropertyDescriptor(s,e).enumerable}))),c.forEach(function(t){m(e,t,s[t])})}return e}({},s)),this.$forceUpdate()},resetSchemePolicyHandler:function(e,t,s){t.selectedPolicy.segmentId&&t.selectedPolicySegmentId&&(t.selectedPolicy={},t.selectedPolicySegmentId="",this.resetSelectedScheme(e)),this.$forceUpdate()},computeLineArrow:function(e,t){this.$nextTick(function(){var s=t.getBoundingClientRect();e.style.top=t.offsetTop+10+"px",e.style.left=t.offsetLeft+s.width+5+"px",e.style.right="-10px",e.style.display="block"})},cancelBackSchemes:function(e){var t=this,s=e.selectedScheme&&e.selectedScheme.dependencies;s&&s.length&&s.forEach(function(e){e.selectedScheme&&t.resetSelectedScheme(e)})},prevResourcesHandler:function(e,t){for(var s=this.schemes,c=!1,r=s.length-1;r>=0;r--){var i=s[r];if(e.resourceId===i.resourceId&&(c=!0),c&&t(i))break}},selectPrevSchemes:function(e){var t=this;this.prevResourcesHandler(e,function(e){t.setSelectedScheme(e)})},deleteFromDutyStateMents:function(e){var t=this.dutyStatements;this.dutyResourceMap[e.resourceId]&&delete this.dutyResourceMap[e.resourceId];for(var s=0;s<t.length;s++){if(t[s].resourceId===e.resourceId){t.splice(s,1);break}}},resetSelectedScheme:function(e){this.deleteFromDutyStateMents(e),this.cancelBackSchemes(e),e.selectedScheme={},e.selected=!1,this.updateResourceActiveStatus(e)},setSelectedScheme:function(e,t){var s=e.selectedScheme;s&&s.authSchemeId&&s.authSchemeId!==t.authSchemeId&&this.resetSelectedScheme(e),t.selectedPolicy&&(t.selectedPolicySegmentId=t.selectedPolicy.segmentId),this.dutyResourceMap[e.resourceId]=e,e.selected=!0,e.selectedScheme=t,this.dutyStatements.push(e),this.updateResourceActiveStatus(e)},updateResourceActiveStatus:function(e){var t,s=this;if(e.selectedScheme&&e.selectedScheme.authSchemeId){var c=e.selectedScheme.bubbleResources;if(c.length){var r=0;t=l.b.SOME,c.forEach(function(e){var t=s.dutyResourceMap[e.resourceId],c=t&&s.resourcesMap[t.resourceId];t&&c.activeStatus===l.b.ALL&&r++}),r===c.length&&(t=l.b.ALL)}else t=l.b.ALL}else t=!1===e.isResolved?l.b.NONE:l.b.UNHANDLE;e.activeStatus=t,this.parentResource&&this.parentResource.resourceId===e.resourceId&&this.$emit("updateResource",e),this.$forceUpdate()},updatePrevSchemesActiveStatus:function(e){var t=this;this.prevResourcesHandler(e,function(e){t.updateResourceActiveStatus(e)})},checkResourceSelectable:function(e){var t=e-1;return!(t>=0)||this.schemes[t].selected},checkResourceCancelable:function(e){var t=[];if(e.selectedScheme.dependencies.forEach(function(e){(e.selected||e.activeStatus===l.b.ALL||e.activeStatus===l.b.SOME)&&t.push(e)}),t.length){t.map(function(e){return e.resourceName}).join("、");return this.$confirm("取消当前资源的选择会导致后续资源选择的策略都取消，确定吗？",{})}return Promise.resolve()},selectAuthSchemeHandler:function(e,t,s){var c=this;if(this.config.isPublished)return this.showPublishEditErrorTip();if(e.selectedScheme&&e.selectedScheme.authSchemeId===t.authSchemeId)this.checkResourceCancelable(e).then(function(){c.schemes[0].resourceId===t.resourceId&&(c.schemes[0].checked=!1),c.resetSelectedScheme(e),c.updatePrevSchemesActiveStatus(e),c._fireUpdateHandler()}).catch(function(){});else{if(!this.checkResourceSelectable(s))return this.$message.warning("未选择前一级资源策略不可选当前资源的策略");if(!t.selectedPolicySegmentId)return this.$message.warning("未选择当前授权方案的策略");this.setSelectedScheme(e,t),this.updatePrevSchemesActiveStatus(e),this._fireUpdateHandler()}},_fireUpdateHandler:function(){var e=this.dutyStatements;this.updateCallback&&this.updateCallback(e),this.$emit("update",e)},getParent:function(e,t){if(t){var s=e.parentNode,c="#"===t[0];for(t=t.substr(1);!(c&&s.id===t||!c&&s.className.indexOf(t)>-1)&&s!==document.body;)s=s.parentNode;return s}return e.parentNode},selectResourceHandler:function(e,t,s,c){t.activeResource=e,this.updateSchemeList(s),this.pushSchemeDep(e),this.drawLineArrow(t)},updateSchemeList:function(e){e++;var t=this.schemes.length-e;if(this.currentAuthNodeIndex=e,t>0)for(var s=0;s<t;s++)this.schemes.pop()},haveSelectedScheme:function(e){var t=this.dutyResourceMap[e.resourceId];if(t){for(var s=0,c=e.schemes.length;s<c;s++){var r=e.schemes[s];if(r.authSchemeId===t.authSchemeId||t.selectedScheme&&r.authSchemeId===t.selectedScheme.authSchemeId){e.activeScheme=r,e.activeIndex=s,e.selectedScheme=r,e.selected=!0,Object.assign(t,e),r.selectedPolicySegmentId=t.selectedScheme.selectedPolicySegmentId||t.policySegmentId;for(var i=0;i<r.policy.length;i++)r.policy[i].segmentId===t.policySegmentId&&(r.selectedPolicy=r.policy[i],r.policy[i].selected=!0);break}}return!0}return e.selectedScheme={},e.selected=!1,!1},loadResourceSchemes:function(e){var t=this;return e.schemes?Promise.resolve(e):(e.schemes=[],this.loadSchemesForResource(e.resourceId).then(function(s){return e.schemes=s,t.resolveResourceSchemes(e)}))},resolveResourceSchemes:function(e){return this.formatSchemes(e.schemes),this.haveSelectedScheme(e)||(e.activeScheme=e.schemes[0]),this.checkResourceActiveStatus(e),e},pushSchemeDep:function(e){var t=this;this.resourcesMap[e.resourceId]||this.onSetResourceDetail(e),e.schemes?void 0===e.activeStatus&&(this.checkResourceActiveStatus(e),!e.activeScheme&&e.schemes.length&&(e.activeScheme=e.schemes[0])):this.loadResourceSchemes(e).then(function(){t.$forceUpdate()}),e.activeScheme||this.haveSelectedScheme(e)||(e.activeIndex=0,e.activeScheme=e.schemes[0]),this.schemes.push(e),e.activeScheme&&e.activeScheme.activeResource&&this.revertDependencyPanels(e)},onSetResourceDetail:function(e){var t=this,s=e.resourceId;this.resourcesMap[s]||(this.resourcesMap[s]=e),e.resourceInfo||i.a.onloadResourceDetail(s).then(function(s){t.$set(e,"resourceInfo",s)})},revertDependencyPanels:function(e){var t=this,s=e.activeScheme;if(s){var c=s.activeResource,r=[];for(r.push(s);c;)this.currentAuthNodeIndex++,this.schemes.push(c),(c=(s=c.activeScheme)&&s.activeResource)&&r.push(s);this.$nextTick(function(){r.forEach(function(e){t.drawLineArrow(e)})})}},drawLineArrow:function(e){var t=this.$el.querySelector(".js-line-"+e.authSchemeId),s=this.getParent(t,".scheme-detail-panel");this.computeLineArrow(t,s.querySelector(".js-res-"+e.activeResource.resourceId))},formatSchemes:function(e){var t=this,s=this.resourcesMap;return e.forEach(function(e){var c=[];e.dependencies=e.bubbleResources.map(function(e){var r=e.resourceId;return s[r]?s[r]:(t.onSetResourceDetail(e),c.push(e.resourceId),e)}),void 0===e.selectedPolicySegmentId&&(e.selectedPolicy={},e.selectedPolicySegmentId="")}),e},hideLineArrow:function(e){e.querySelectorAll(".line-arrow").forEach(function(e){e.style.display="none"})},showLineArrows:function(){var e=this;this.schemes.slice(0,-1).forEach(function(t){t.activeScheme&&e.$el.querySelectorAll(".js-line-".concat(t.activeScheme.authSchemeId)).forEach(function(e){e.style.display="block"})})},switchSchemeHandler:function(e,t,s,c){e.activeIndex=s,e.activeScheme=t,this.updateSchemeList(c),t.activeResource&&(this.pushSchemeDep(t.activeResource),this.drawLineArrow(t)),this.$forceUpdate()},getDutyStatements:function(){var e=this;return this.dutyStatements.forEach(function(t){var s=e.resourcesMap[t.resourceId];s&&Object.assign(t,s)}),console.log(this.dutyStatements),this.dutyStatements},hideSchemeArrow:function(e){this.$el.querySelector(".js-line-".concat(e.authSchemeId)).style.display="none"},toggleResolveResource:function(e,t){if(this.config.isPublished)return this.showPublishEditErrorTip();void 0===e.isResolved?this.$set(e,"isResolved",!1):e.isResolved=!e.isResolved,!1===e.isResolved&&(this.updateSchemeList(t),this.hideSchemeArrow(e.activeScheme),e.activeScheme.activeResource=null,e.selectedScheme.authSchemeId&&this.selectAuthSchemeHandler(e,e.selectedScheme,t)),this.updateResourceActiveStatus(e)}}},v=(s("Qop/"),s("9YZR"),s("KHd+")),S=Object(v.a)(f,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"auth-scheme-tree-wrap",class:[e.isNodeDetail?"node-presentable-scheme-wrap":"resource-scheme-wrap"]},[s("div",{staticClass:"view-mode-tabs",class:["active-mode-"+e.viewMode]},[s("el-button",{staticClass:"mode-btn",attrs:{type:"text"},on:{click:function(t){e.changeViewMode("list")}}},[s("el-badge",{staticClass:"badge-num",attrs:{value:e.unsignPolicyList.length}},[s("span",[e._v("待签约列表")])])],1),e._v(" "),s("el-button",{staticClass:"mode-btn",attrs:{type:"text"},on:{click:function(t){e.changeViewMode("tree")}}},[e._v("资源授权树")]),e._v(" "),s("span",{staticClass:"active-mask"})],1),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:"list"===e.viewMode,expression:"viewMode==='list'"}],staticClass:"auth-dep-list-wrap"},[e._m(0),e._v(" "),s("el-collapse",{attrs:{accordion:""}},e._l(e.unsignPolicyList,function(t){return s("el-collapse-item",{key:t.authSchemeId,staticClass:"duty-resource",attrs:{name:t.resourceId}},[s("template",{slot:"title"},[s("h4",[e._v(e._s(t.resourceName))]),e._v(" "),t.selectedScheme?s("div",{staticClass:"duty-resource-sub-title"},[e._v("\n            "+e._s(t.selectedScheme.authSchemeName)+"/"+e._s(t.selectedScheme.selectedPolicy.policyName)+"\n          ")]):e._e()]),e._v(" "),t.selectedScheme?s("pre",{staticClass:"policy-segment-text"},[e._v(e._s(e.formatPolicyText(t.selectedScheme.selectedPolicy.segmentText)))]):e._e()],2)}))],1),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:"tree"===e.viewMode,expression:"viewMode==='tree'"}],staticClass:"auth-scheme-wrap"},e._l(e.schemes,function(t,c){return s("div",{key:c,staticClass:"auth-scheme-list-wrap"},[s("el-button",{staticClass:"unhandle-res-btn",class:{"is-unresolved":!1===t.isResolved},on:{click:function(s){e.toggleResolveResource(t,c)}}},[e._v("不处理此资源\n      ")]),e._v(" "),s("resource-intro-info",{attrs:{resource:t.resourceInfo}}),e._v(" "),t.schemes?s("div",{staticClass:"res-auth-schemes-wrap",class:{"is-unresolved":!1===t.isResolved}},[s("h4",{staticClass:"res-auth-schemes-title"},[e._v("授权方案")]),e._v(" "),s("div",{staticClass:"res-auth-schemes"},[t.schemes.length>1?s("ul",{staticClass:"scheme-tabs-header"},e._l(t.schemes,function(r,i){return s("li",{staticClass:"scheme-tab",class:{"is-active":t.activeIndex===i,selected:t.selectedScheme&&t.selectedScheme.authSchemeId===r.authSchemeId},on:{click:function(s){e.switchSchemeHandler(t,r,i,c)}}},[s("i",{staticClass:"dot"}),e._v(e._s(String.fromCharCode(65+i))+"\n            ")])})):e._e(),e._v(" "),s("div",{staticClass:"scheme-detail-panels"},e._l(t.schemes,function(r,i){return s("div",{directives:[{name:"show",rawName:"v-show",value:t.activeIndex===i,expression:"resource.activeIndex === index"}],key:r.authSchemeId,staticClass:"scheme-detail-panel"},[s("p",{staticClass:"auth-scheme-name"},[e._v(e._s(r.authSchemeName))]),e._v(" "),s("ul",{staticClass:"scheme-list"},e._l(r.dependencies,function(t){return s("li",{staticClass:"dep-item",class:["active-status-"+t.activeStatus],on:{click:function(s){e.selectResourceHandler(t,r,c,s)}}},[s("div",{staticClass:"resource-name",class:"js-res-"+t.resourceId},[s("p",[s("i",{staticClass:"dot"}),e._v(e._s(t.resourceName||t.resourceId))])])])})),e._v(" "),r.policy?s("div",{staticClass:"policy-wrap"},[s("h3",{staticStyle:{"margin-bottom":"15px"}},[e._v("授权策略: ")]),e._v(" "),s("div",{staticClass:"policy-content"},[r.policy.length?s("el-radio-group",{model:{value:r.selectedPolicySegmentId,callback:function(t){e.$set(r,"selectedPolicySegmentId",t)},expression:"scheme.selectedPolicySegmentId"}},e._l(r.policy,function(c,i){return s("el-radio",{key:i,staticClass:"policy-radio",attrs:{label:c.segmentId,disabled:!0!==c.isAuth},on:{change:function(s){e.changePolicy(t,r,c)}},nativeOn:{click:function(s){e.resetSchemePolicyHandler(t,r,c)}}},[c.isAuth?e._e():s("el-tooltip",{attrs:{content:"不在授权范围内",placement:"top",effect:"light"}},[s("span",{class:{"selected-segment":c.selected}},[e._v(e._s(c.policyName))])]),e._v(" "),c.isAuth?s("span",{class:{"selected-segment":c.selected}},[e._v(e._s(c.policyName))]):e._e(),e._v(" "),s("pre",{staticClass:"policy-segment-text"},[e._v(e._s(e.formatPolicyText(c.segmentText)))])],1)})):e._e(),e._v(" "),s("div",{staticStyle:{"text-align":"center"}},[s("el-button",{staticClass:"policy-select-btn",class:{selected:t.selectedScheme&&t.selectedScheme.authSchemeId===r.authSchemeId},attrs:{type:"primary",round:""},on:{click:function(s){e.selectAuthSchemeHandler(t,r,c)}}},[s("i",{staticClass:"el-icon-fa-check"}),e._v("预选\n                    ")])],1)],1)]):e._e(),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:c<e.currentAuthNodeIndex,expression:"panelIndex < currentAuthNodeIndex"}],staticClass:"line-arrow",class:"js-line-"+r.authSchemeId},[s("i",{staticClass:"circle"})])])}))])]):e._e()],1)}))])},[function(){var e=this.$createElement,t=this._self._c||e;return t("h4",{staticClass:"policy-input-title"},[t("i",{staticClass:"el-icon-question"}),this._v("待签约列表")])}],!1,null,"6b894d1e",null);t.a=S.exports},"8DIk":function(e,t,s){"use strict";var c=s("xGUn");s.n(c).a},"974a":function(e,t,s){},"9YZR":function(e,t,s){"use strict";var c=s("974a");s.n(c).a},DWbO:function(e,t,s){},"Qop/":function(e,t,s){"use strict";var c=s("tYyu");s.n(c).a},VnyS:function(e,t,s){"use strict";var c=s("aNms"),r=s("NKFe"),i=s.n(r),n=s("ExDf"),a=s("hupZ");var o=[{status:0,desc:"未完成"},{status:1,desc:"已发布"},{status:2,desc:"合约待执行"},{status:3,desc:"发布"}],u={name:"auth-scheme-detail",data:function(){return{curChoice:0,choices:[],selectedPolicy:"",schemes:[],inited:!1,showDialog:!1,currentScheme:{}}},components:{ContractDetail:n.a},props:{selectedCallback:{type:Function},resource:{type:Object}},watch:{resource:function(){this.resource&&this.resource.resourceId&&!this.inited&&(this.init(),this.inited=!0)}},mounted:function(){},methods:{init:function(){var e=this;c.a.onloadSchemesForResource(this.resource.resourceId).then(function(t){t.length&&(e.schemes=e.formatSchemes(t))}).catch(this.$error.showErrorMessage)},changePolicy:function(e,t){this.selectedCallback&&this.selectedCallback(e,t)},formatSchemes:function(e){var t=this;return e=e.filter(function(e,s){return!(!t.resource.isOwner&&a.a.DELETE===e.status)&&(e.dependencies=e.bubbleResources,e.showContracts=e.dutyStatements.length>0,e._contractStatusInfo=o[s],e.policy.forEach(function(e){try{e._fmtSegmentText=i.a.beautify(e.segmentText)}catch(t){e._fmtSegmentText=e.segmentText}}),e)}),this.choices=function(e){e=e||26;for(var t=[],s=0;s<e;s++)t.push(String.fromCharCode(65+s));return t}(e.length).map(function(e,t){return{index:t,label:e}}),e},loadPolicies:function(){return this.$services.authSchemes.get({params:{resourceIds:this.resource.resourceId}}).then(function(e){if(0===e.data.errcode)return e.getData();throw new Error(e)})},gotoResourceSchemeDetailHandler:function(){this.$router.push("/resource/detail/".concat(this.resource.resourceId,"/auth_schemes"))},hideAuthSchemeHandler:function(){this.$emit("close")},updateContractHandler:function(e){for(var t=this.currentScheme.dutyStatements,s=0;s<t.length;s++)if(t[s].contractId===e.contractId){Object.assign(t[s],e);break}},showContractsHandler:function(e){this.currentScheme=e,this.showDialog=!0},expandChangeHandler:function(e,t){t.length>0&&!e.inited&&(e.inited=!0)},expandRowHandler:function(e){this.$refs.contractsTable.toggleRowExpansion(e)}}},h=(s("a2pS"),s("8DIk"),s("KHd+")),l=Object(h.a)(u,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",{staticClass:"auth-scheme-detail-container"},[s("h3",{staticClass:"nav-title"},[e._v("授权方案"),e.resource.isOwner?s("i",{staticClass:"el-icon-edit",on:{click:e.gotoResourceSchemeDetailHandler}}):e._e(),e._v(" "),e.resource.isOwner?e._e():s("el-button",{staticClass:"hide-btn",attrs:{type:"text"},on:{click:e.hideAuthSchemeHandler}},[s("i",{staticClass:"el-icon-close"})])],1),e._v(" "),s("div",{staticClass:"auth-scheme-content"},[s("div",{staticClass:"tabs-header"},[s("el-radio-group",{staticClass:"tab-radio-group",model:{value:e.curChoice,callback:function(t){e.curChoice=t},expression:"curChoice"}},e._l(e.choices,function(t){return s("el-radio-button",{key:t.index,staticClass:"tab-radio-item",attrs:{label:t.index}},[e._v(e._s(t.label)+"\n        ")])}))],1),e._v(" "),s("div",{staticClass:"tabs-content"},e._l(e.schemes,function(t,c){return s("div",{directives:[{name:"show",rawName:"v-show",value:e.curChoice===c,expression:"curChoice===index"}],staticClass:"tab-panel"},[s("p",{staticClass:"scheme-name"},[e._v(e._s(t.authSchemeName))]),e._v(" "),s("ul",{staticClass:"dep-resources"},e._l(t.dependencies,function(t){return s("li",{staticClass:"dep-item"},[s("div",{staticClass:"resource-name"},[s("p",[s("i",{staticClass:"dot",class:{done:t.done}}),e._v(" "),s("a",{staticStyle:{color:"#333","word-break":"break-all"},attrs:{target:"_blank",href:"/resource/detail/"+t.resourceId}},[e._v(e._s(t.resourceName||t.resourceId))])])])])})),e._v(" "),t.policy?s("div",{staticClass:"policy-options"},[s("h3",{staticStyle:{"margin-bottom":"15px",color:"#333333"}},[e._v("授权策略")]),e._v(" "),s("div",{staticClass:"policy-content"},[s("el-collapse",e._l(t.policy,function(t,c){return s("el-collapse-item",{key:c,attrs:{title:t.policyName,name:c}},[s("pre",{staticClass:"policy-segment-text"},[e._v(e._s(t._fmtSegmentText))])])}))],1)]):e._e(),e._v(" "),e.resource.isOwner&&t.showContracts?s("div",{staticClass:"scheme-contract-status-wrap"},[s("div",{staticClass:"contract-status-btn-wrap"},[s("el-button",{staticClass:"scheme-contract-status-btn",class:["contract-status-"+t._contractStatusInfo.status+"-btn"],on:{click:function(s){e.showContractsHandler(t)}}},[e._v("\n              资源合同详情\n            ")])],1)]):e._e()])}))]),e._v(" "),s("el-dialog",{attrs:{width:"800px",title:e.currentScheme.authSchemeName+"-依赖资源合同列表","append-to-body":!0,visible:e.showDialog},on:{"update:visible":function(t){e.showDialog=t}}},[s("div",{staticClass:"scheme-dialog-bd"},[s("el-table",{ref:"contractsTable",staticStyle:{width:"100%"},attrs:{data:e.currentScheme.dutyStatements},on:{"expand-change":e.expandChangeHandler}},[s("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return t.row.inited?[s("contract-detail",{attrs:{contractId:t.row.contractId},on:{update:e.updateContractHandler}})]:void 0}}])}),e._v(" "),s("el-table-column",{attrs:{label:"资源名称",prop:"resourceName"}}),e._v(" "),s("el-table-column",{attrs:{label:"资源合同ID",prop:"contractId"}}),e._v(" "),s("el-table-column",{attrs:{label:"授权方案ID",prop:"authSchemeId"}}),e._v(" "),s("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(s){e.expandRowHandler(t.row,t.$index)}}},[e._v("查看合同")])]}}])})],1)],1)])],1)},[],!1,null,"a1c909ee",null);t.a=l.exports},a2pS:function(e,t,s){"use strict";var c=s("DWbO");s.n(c).a},hupZ:function(e,t,s){"use strict";s.d(t,"b",function(){return c}),s.d(t,"a",function(){return r});var c={NONE:0,SOME:1,ALL:2,UNHANDLE:3},r={INIT:0,PUBLISHED:1,DELETE:4}},tYyu:function(e,t,s){},xGUn:function(e,t,s){}}]);