(window.webpackJsonp=window.webpackJsonp||[]).push([["node~presentable~resource-editor"],{"+LUt":function(e,t,a){"use strict";var i=a("0Bse"),n=(a("1O/z"),a("JlKq"));function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var r={name:"resource-items",data:function(){return{search:"",resources:[],loader:null}},props:{type:{type:String,default:function(){return"all"}}},watch:{type:function(){this.initView()}},components:{ResourceItem:i.a,LazyListView:n.a},mounted:function(){this.initView()},methods:{initView:function(){switch(this.type){case"favor":this.loader=this.getFavorResourcesLoader();break;case"self":this.loader=this.getSelfResourcesLoader()}},fetchData:function(e){var t=this;console.log("fetchData",e);return this.loader?this.loader({page:e}).then(function(e){return t.resources=t.resources.concat(e.dataList),e.dataList.length<10&&(e.canLoadMore=!1),e}):Promise.resolve({canLoadMore:!1,dataList:[]})},getSelfResourcesLoader:function(){var e=this;return this.createResourceLoader(function(t){return e.$services.resource.get(t||{}).then(function(e){return e.getData()})})},getFavorResourcesLoader:function(){var e=this;return this.createResourceLoader(function(t){return e.$services.collections.get(t||{}).then(function(e){return e.getData()})})},createResourceLoader:function(e){return function(t){return"object"===s(t=t||{pageSize:10,page:1})&&(t={params:Object.assign({pageSize:10,page:1},t)}),e(t)}},getAllResourcesLoader:function(e){return"object"===s(e={pageSize:100})&&(e={params:e}),this.$services.resource.get(e||{}).then(function(e){return e.getData()})}}},o=(a("0efm"),a("KHd+")),c=Object(o.a)(r,function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"resource-items"},[t("lazy-list-view",{attrs:{list:this.resources,height:90,fetch:this.fetchData},scopedSlots:this._u([{key:"default",fn:function(e){return[t("resource-item",{attrs:{resource:e.data}})]}}])},[t("div",{staticClass:"empty-resource-tip",attrs:{slot:"empty"},slot:"empty"},[this._v("\n      "+this._s("self"===this.type?"没有自制资源":"未收藏资源")+"\n    ")])])],1)},[],!1,null,"428a1981",null);t.a=c.exports},"+R5k":function(e,t,a){},"/oka":function(e,t,a){},"0Bse":function(e,t,a){"use strict";var i=a("1O/z"),n=a("mL9P"),s={name:"resource-info-item",data:function(){return{}},props:{resource:{type:Object,default:function(){return{}}},type:{type:String,default:"list"}},watch:{},mounted:function(){this.format(this.resource)},methods:{format:function(e){var t=this;this.resource.resourceId&&(e._statusInfo=n.RESOURCE_STATUS[e.status],e._fileSize=this.humanizeSize(e.systemMeta.fileSize),Object(i.c)(e.userId).then(function(a){t.$set(e,"_userInfo",a)}))},humanizeSize:function(e){var t=["B","KB","MB","GB","TB"];if(e<1)return e+"B";var a=Math.min(Math.floor(Math.log(e)/Math.log(1024)),t.length-1);return(e=Number((e/Math.pow(1024,a)).toPrecision(2)))+t[a]},gotoDetail:function(e){this.$router.push("/resource/detail/".concat(e.resourceId))}}},r=(a("r3ZZ"),a("KHd+")),o=Object(r.a)(s,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"resource-item-info",class:["resource-item-theme-type-"+e.type],on:{click:function(t){e.gotoDetail(e.resource)}}},[a("h4",{staticClass:"res-title"},[e._v(e._s(e.resource.resourceName))]),e._v(" "),a("div",{staticClass:"res-intro-detail"},[a("div",{staticClass:"res-intro-bd"},[a("span",{staticClass:"res-type"},[e._v("#"+e._s(e.resource.resourceType))]),e._v(" "),a("span",{staticClass:"res-desc"},[e._v(e._s(e.resource.resourceDesc)+" "+e._s(e.resource.resourceId))])]),e._v(" "),a("div",{staticClass:"res-intro-ft"},[a("span",{staticClass:"res-type"},[e._v("#"+e._s(e.resource.resourceType))]),e._v(" "),e.resource._userInfo?a("span",{staticClass:"res-author"},[e._v("by: "+e._s(e.resource._userInfo.nickname))]):e._e(),e._v(" "),a("span",{staticClass:"update-time"},[e._v("最近更新时间："+e._s(e._f("fmtDate")(e.resource.createDate)))]),e._v(" "),e.resource._statusInfo?a("span",{staticStyle:{"margin-left":"6px"}},[e._v("状态："+e._s(e.resource._statusInfo.desc))]):e._e()])])])},[],!1,null,"0a6a009e",null);t.a=o.exports},"0Nxv":function(e,t,a){},"0efm":function(e,t,a){"use strict";var i=a("uefJ");a.n(i).a},"2cqv":function(e,t,a){"use strict";var i=a("7zp4");a.n(i).a},"3zXT":function(e,t,a){},"6ydb":function(e,t,a){},"7zp4":function(e,t,a){},AlM9:function(e,t,a){"use strict";var i=a("6tqe"),n={name:"table-view",data:function(){return{loading:!1,tableData:[],total:0}},props:{data:{type:Array,default:function(){return[]}},showPagination:{type:Boolean,default:!0},formatHandler:{type:Function,default:null},paginationOptions:{type:Object,default:function(){return{pageSizes:[10,20,30,50]}}},loader:Function,pageMeta:{type:Object,default:function(){var e=i.c.get("PAGE_".concat(this.$route.fullPath,"_index"))||{};return Object.assign({pageSize:10,page:1},e)}}},beforeDestroy:function(){this.pageMeta&&this.pageMeta.keyWords&&delete this.pageMeta.keyWords,i.c.set("PAGE_".concat(this.pageUrl,"_index"),this.pageMeta)},mounted:function(){this.pageUrl=this.$route.fullPath,this.tableData=this.data,this.total=this.tableData.length,this.load(),this.$on("reload",this.reload.bind(this))},methods:{reload:function(e){this.load(e)},load:function(e){var t=this;Object.assign(this.pageMeta,e||{}),this.loader&&(this.loading=!0,this.loader(this.pageMeta).then(function(e){var a=e.getData();if(t.loading=!1,a){var i=a.dataList||a;t.formatHandler&&(i=t.formatHandler(i)),t.tableData=i,a.dataList?(t.total=a.totalItem,t.pageMeta.page=a.page||1):t.total=i.length}else t.$message.error(a.msg)}).catch(function(e){t.$message.warning("加载失败"),t.loading=!1}))},handleSizeChange:function(e){var t={pageSize:e};this.load(t),this.$emit("sizeChange",t)},handleCurrentChange:function(e){var t={page:e};this.load(t),this.$emit("pageChange",t)}}},s=(a("KOIe"),a("KHd+")),r=Object(s.a)(n,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading.body",value:e.loading,expression:"loading",modifiers:{body:!0}}],staticClass:"table-view-wrapper"},[a("el-table",{staticClass:"table",attrs:{data:e.tableData,stripe:"",border:""}},[e._t("default")],2),e._v(" "),a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.showPagination,expression:"showPagination"}],staticClass:"pagination",attrs:{background:!0,"current-page":e.pageMeta.page,"page-sizes":[10,20,30,50],"page-size":e.pageMeta.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)},[],!1,null,"361849fa",null);t.a=r.exports},H2zm:function(e,t,a){"use strict";var i=a("0Bse"),n=a("+LUt"),s=a("JlKq");function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var o={name:"search-resource",data:function(){return{searchInput:"",activeName:"favor",favorResources:[],searchResources:[]}},components:{ResourceItem:i.a,ResourceList:n.a,LazyListView:s.a},props:{searchScope:{type:Object,default:function(){return{}}}},watch:{},mounted:function(){this.loader=this.getFavorResourcesLoader()},methods:{addResourceHandler:function(e){this.$emit("add",e)},clearSearchInputHandler:function(){},getFavorResourcesLoader:function(){var e=this;return this.createResourceLoader(function(t){return e.$services.collections.get(t||{}).then(function(e){return e.getData()})})},createResourceLoader:function(e){return function(t){return"object"===r(t=t||{pageSize:10,page:1})&&(t={params:Object.assign({pageSize:10,page:1},t)}),e(t)}},fetchData:function(e){var t=this;return this.loader?this.loader({page:e}).then(function(e){return t.favorResources=t.favorResources.concat(e.dataList),e.dataList.length<10&&(e.canLoadMore=!1),e}):Promise.resolve({canLoadMore:!1,dataList:[]})},searchDataHandler:function(e){var t=this;return this.searchInput?this.$services.g_Resources.get({params:Object.assign({keyWords:encodeURIComponent(this.searchInput)},this.searchScope)}).then(function(e){var a=e.getData()||{};return 0===e.errcode?(t.searchResources=t.searchResources.concat(a.dataList),a.dataList.length<10&&(a.canLoadMore=!1)):a.canLoadMore=!1,a}):Promise.resolve({canLoadMore:!1})},searchHandler:function(){this.activeName="search",this.searchResources=[],this.$refs.searchView.refresh()}}},c=(a("p0A3"),a("2cqv"),a("KHd+")),l=Object(c.a)(o,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"search-resource-wrap"},[a("div",{staticClass:"search-input-area"},[a("el-input",{staticClass:"search-resource-input",attrs:{clearable:"",placeholder:"Search or ID"},on:{clear:e.clearSearchInputHandler},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.searchHandler(t):null}},model:{value:e.searchInput,callback:function(t){e.searchInput=t},expression:"searchInput"}})],1),e._v(" "),a("div",{staticClass:"search-resource-bd"},[a("el-tabs",{model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"收藏资源",name:"favor"}},[a("lazy-list-view",{staticClass:"search-resource-list",attrs:{list:e.favorResources,height:90,fetch:e.fetchData},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{staticClass:"add-resource-btn",on:{click:function(a){e.addResourceHandler(t.data)}}},[e._v("添加")]),e._v(" "),a("resource-item",{staticStyle:{"margin-right":"80px"},attrs:{resource:t.data,type:"search"}})]}}])})],1),e._v(" "),a("el-tab-pane",{attrs:{label:"搜索资源",name:"search"}},[a("lazy-list-view",{ref:"searchView",staticClass:"search-resource-list",attrs:{list:e.searchResources,height:90,fetch:e.searchDataHandler},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{staticClass:"add-resource-btn",on:{click:function(a){e.addResourceHandler(t.data)}}},[e._v("添加")]),e._v(" "),a("resource-item",{staticStyle:{"margin-right":"80px"},attrs:{resource:t.data,type:"search"}})]}}])})],1)],1)],1)])},[],!1,null,"0783b56b",null);t.a=l.exports},"I/Ta":function(e,t,a){},JlKq:function(e,t,a){"use strict";var i={name:"fl-lazy-list-view",props:{list:{type:Array,required:!0,default:[],twoWays:!0},height:{type:Number,default:44},fetch:{type:Function}},data:function(){return{lastScrollTop:null,distance:this.height,lineTopHeight:0,lineBottomHeight:0,previewList:[],displayCount:0,canLoadMore:!0,index:1}},mounted:function(){this.initView(),this.$on("reload",this.refresh.bind(this))},beforeDestroy:function(){this.disconnect()},methods:{initView:function(){var e=this;e.$refs.loading.classList.remove("hide"),e.observer=new IntersectionObserver(function(t){t.forEach(function(t){t.intersectionRatio<=0||!1!==e.canLoadMore&&e.load().catch(function(){e.observer.unobserve(e.$refs.loading),e.$refs.loading.classList.add("hide")})})},{rootMargin:"50px 0px"}),e.observer.observe(this.$refs.loading)},load:function(){var e=this;return e.fetch(e.index++).then(function(t){if(e.canLoadMore=t.canLoadMore,e.scrollHandler(t.dataList||[]),!1===e.canLoadMore)return Promise.reject()})},disconnect:function(){this.observer&&this.observer.disconnect()},refresh:function(){this.canLoadMore=!0,this.previewList=[],this.index=1,this.disconnect(),this.initView()},scrollHandler:function(e){this.previewList=this.previewList.concat(e)}},components:{}},n=(a("U1Xs"),a("KHd+")),s=Object(n.a)(i,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{ref:"listView",staticClass:"fl-lazy-list-view"},[e.previewList.length?a("ul",{style:{paddingTop:e.lineTopHeight+"px",paddingBottom:e.lineBottomHeight+"px"}},e._l(e.previewList,function(t,i){return a("li",{key:i,style:{height:e.height+"px"}},[e._t("default",null,{data:t})],2)})):e._e(),e._v(" "),0===e.previewList.length?e._t("empty"):e._e(),e._v(" "),e._t("loading",[a("div",{ref:"loading",staticClass:"load-more-gif"},[e._v("loading...")])])],2)},[],!1,null,"94b4b6d8",null);t.a=s.exports},KOIe:function(e,t,a){"use strict";var i=a("0Nxv");a.n(i).a},N0Vh:function(e,t,a){"use strict";var i=a("/oka");a.n(i).a},SkYN:function(e,t,a){"use strict";var i=a("Uxwp");a.n(i).a},U1Xs:function(e,t,a){"use strict";var i=a("I/Ta");a.n(i).a},Uxwp:function(e,t,a){},VBva:function(e,t,a){"use strict";var i={name:"clip-board",data:function(){return{}},props:{value:String},mounted:function(){},methods:{copyHandler:function(){this.$refs.copyText.select();try{var e=document.execCommand("copy");this.$emit("copyDone",e)}catch(e){this.$emit("copyDone",!1)}}}},n=(a("SkYN"),a("KHd+")),s=Object(n.a)(i,function(){var e=this.$createElement,t=this._self._c||e;return t("div",{on:{click:this.copyHandler}},[t("textarea",{ref:"copyText",staticClass:"clip-text",domProps:{value:this.value}}),this._v(" "),this._t("default")],2)},[],!1,null,"53b5aefb",null);t.a=s.exports},YOex:function(e,t,a){"use strict";var i=a("uEsI");a.n(i).a},aNms:function(e,t,a){"use strict";a("snnE");var i=a("LvDl"),n=a("C2Lv"),s={},r={};function o(e){var t=[];return e.resourceIds&&e.resourceIds.length&&(e.resourceIds.forEach(function(e){t.push(e),s[e]||(s[e]=[])}),e.resourceIds=t.join(",")),e.authSchemeIds&&e.authSchemeIds.length&&(e.authSchemeIds=e.authSchemeIds.join(",")),n.a.get("/v1/resources/authSchemes",{params:e}).then(function(a){if(0===a.data.errcode){var n=a.getData();return n.forEach(function(t){r[t.authSchemeId]||(r[t.authSchemeId]=t),e.resourceIds&&s[t.resourceId].push(t)}),t.length&&t.forEach(function(e){s[e]=Object(i.uniqBy)(s[e],"authSchemeId")}),Object(i.cloneDeep)(n)}return Promise.reject(a.data.msg)})}var c=function(e){return o(e)};t.a={onloadSchemesForResource:function(e,t){return(t=t||{}).resourceIds=[e],c(t)},onloadSchemeDetail:function(e){return o({authSchemeIds:[e]}).then(function(e){return Array.isArray(e)&&(e=e[0]),e})},loadAuthSchemes:o}},b4GV:function(e,t,a){"use strict";var i=a("NKFe"),n=a.n(i),s=a("hnv+"),r=a.n(s),o=a("AlM9"),c=a("yfc9");function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var u={name:"policy-tpl-select-list",data:function(){return{}},props:{list:{type:Array,default:function(){return[]}},filter:{type:Function}},components:{TableView:o.a},computed:{tplList:function(){return this.filter?this.filter(this.list):this.list}},mounted:function(){},methods:{resolveType:function(e){return c.b(e)},resolveStatus:function(e){return c.a(e)},handleSelect:function(e){this.$emit("select",function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},i=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(a).filter(function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),i.forEach(function(t){l(e,t,a[t])})}return e}({},e))}}},p=a("KHd+"),d=Object(p.a)(u,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("el-table",{attrs:{data:e.tplList,stripe:"",border:""}},[a("el-table-column",{attrs:{prop:"name",label:"模板名称"}}),e._v(" "),a("el-table-column",{attrs:{label:"",align:"center",width:"200px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(a){e.handleSelect(t.row)}}},[e._v("选择\n        ")])]}}])})],1)],1)},[],!1,null,null,null).exports,h={resource:[{template:"for nodes:\n    in <init> : terminate\n  ",name:"免费"},{template:"for nodes:\n    in initial :\n      proceed to <signing> on receiving transaction of 199 to feth10000abc\n  ",name:"收费"}],presentable:[{template:"for public:\n    in <init> : terminate\n  ",name:"免费"},{template:"for public:\n    in initial :\n      proceed to <signing> on receiving transaction of 199 to feth10000abc\n  ",name:"收费"}]},f=a("11pw"),m={name:"policy-template-selector",data:function(){return{currentTabName:f.c.get("POLICY_TPL_ACTIVE_TAB_NAME")||"official",policyTpls:[],queryPolicyTpl:"",defaultPolicyTpls:"node"===this.$route.meta.type?h.presentable:h.resource}},props:{callback:{type:Function}},components:{PolicyTplList:d},mounted:function(){var e=this;this.loadCustomPolicyTpl().then(function(t){e.policyTpls=t})},methods:{loadCustomPolicyTpl:function(){return this.$services.policyTemplate.get({params:{templateType:1,pageSize:100}}).then(function(e){var t=e.getData();if(t)return t.dataList;throw new Error(e.data.msg)})},selectPolicyTplHandler:function(e){this.callback&&this.callback({name:"selectPolicyTemplate",data:{template:e.template}})},filterHandler:function(e){var t=this;return e.filter(function(e){return!t.queryPolicyTpl||e.name.indexOf(t.queryPolicyTpl)>-1})},tabClickHandler:function(e){f.c.set("POLICY_TPL_ACTIVE_TAB_NAME",e.name)}}},y=Object(p.a)(m,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticStyle:{"margin-bottom":"15px"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入内容"},model:{value:e.queryPolicyTpl,callback:function(t){e.queryPolicyTpl=t},expression:"queryPolicyTpl"}},[a("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})])],1),e._v(" "),a("el-tabs",{attrs:{type:"border-card"},on:{"tab-click":e.tabClickHandler},model:{value:e.currentTabName,callback:function(t){e.currentTabName=t},expression:"currentTabName"}},[a("el-tab-pane",{attrs:{label:"示例模板",name:"official"}},[a("policy-tpl-list",{attrs:{list:e.defaultPolicyTpls,filter:e.filterHandler},on:{select:e.selectPolicyTplHandler}})],1),e._v(" "),a("el-tab-pane",{attrs:{label:"我的模板",name:"mine"}},[a("policy-tpl-list",{attrs:{list:e.policyTpls,filter:e.filterHandler},on:{select:e.selectPolicyTplHandler}})],1)],1)],1)},[],!1,null,null,null).exports,v={name:"query-policy-license",data:function(){return{licenses:[],queryInput:"",licenseContent:"",selectedLicenseId:"",licenseMap:{}}},components:{ClipBoard:a("VBva").a},props:{callback:{type:Function}},mounted:function(){this.licenses=this.loadAll()},methods:{copyDoneHandler:function(){this.selectedLicenseId&&(this.$message.success("已复制"),this.callback&&this.callback({name:"selectLicenseId",data:{licenseId:this.selectedLicenseId}}))},loadAll:function(){var e=this;this.$axios.get("/v1/resources/warehouse?resourceType=license").then(function(t){e.licenses=t.data.data.dataList.map(function(e){return{value:e.resourceName,id:e.resourceId}})})},querySearchAsync:function(e,t){var a=this.licenses;t(e?a.filter(this.createStateFilter(e)):a)},createStateFilter:function(e){var t=e.toLowerCase(),a=new RegExp(t,"i");return function(e){return a.test(e.value)||a.test(e.id)}},handleSelect:function(e){this.selectedLicenseId=e.id,this.showLicenseContent(e)},showLicenseContent:function(e){var t=this,a=e.id;this.licenseMap[a]?this.licenseContent=this.licenseMap[a]:this.$axios.get("/v1/auths/resource/".concat(a,".data")).then(function(e){e.getData()?(t.licenseContent=e.getData(),t.licenseMap[a]=t.licenseContent):t.$message.error(e.data.msg)})}}},g=(a("mQvM"),Object(p.a)(v,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-autocomplete",{staticClass:"search-input",attrs:{"fetch-suggestions":e.querySearchAsync,placeholder:"请输入内容License ID"},on:{select:e.handleSelect},model:{value:e.queryInput,callback:function(t){e.queryInput=t},expression:"queryInput"}},[a("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"prefix"},slot:"prefix"}),e._v(" "),a("clip-board",{staticStyle:{display:"inline-block","margin-left":"-8px"},attrs:{slot:"append",value:e.selectedLicenseId},on:{copyDone:e.copyDoneHandler},slot:"append"},[a("el-button",{attrs:{type:"primary",plain:"",disabled:!e.selectedLicenseId}},[a("i",{staticClass:"el-icon-fa-clipboard"})])],1)],1),e._v(" "),a("pre",{staticClass:"license-content"},[e._v("    "+e._s(e.licenseContent)+"\n  ")])],1)},[],!1,null,"24fba8f2",null).exports),b={resource:n.a,presentable:r.a},_={name:"policy-editor",data:function(){return{submitLoading:!1,policyText:this.value,showCustomPolicyTplDialog:!1,currentTool:"",editingIndex:-1,policyList:[]}},props:{value:{type:[Array,Object],default:function(){return""}},showValidate:{type:Boolean,default:function(){return!0}},config:{type:Object,default:function(){return{type:""}}}},components:{PolicyTemplateSelector:y,QueryPolicyLicense:g},watch:{policyList:{handler:function(e,t){this.$emit("change",this.policyList)},deep:!0},"value.policy":{handler:function(e,t){this.fillPolicyList(this.value)},deep:!0}},mounted:function(){this.config.type||(this.config.type="node"===this.$route.meta.type?"presentable":"resource"),this.fillPolicyList(this.value)},methods:{fillPolicyList:function(e){var t=this;e.policy&&(this.policyList=e.policy.map(function(e){var a=e.segmentText,i=b[t.config.type];return i.compile(a).errorMsg||(a=i.beautify(a)),{policyName:e.policyName||"",policyText:a,policySegmentId:e.segmentId,disabled:0===e.status}})),this.policyList.length||this.addNewPolicy()},validate:function(){var e=b[this.config.type],t=e.compile(this.policyText);t.errorMsg?(this.$emit("validate",{done:!1,error:{message:t.errorMsg}}),this.$message.error(t.errorMsg)):(this.policyText=e.beautify(this.policyText),this.$emit("input",this.policyText),this.$emit("validate",{done:!0}))},addNewPolicy:function(){this.policyList.push({policyName:"未命名策略",policyText:"",disabled:!1})},createHandler:function(e){return this.$services.policy.post(e)},showToolHandler:function(e){this.currentTool=e,this.showCustomPolicyTplDialog=!0},operationCallback:function(e){if(this.showCustomPolicyTplDialog=!1,e&&e.name){var t="".concat(e.name,"Callback");this[t]&&this[t](e.data),this.$emit("input",this.policyText)}},getCurrentEditingPolicy:function(){return this.policyList[this.editingIndex]},selectPolicyTemplateCallback:function(e){this.getCurrentEditingPolicy().policyText=e.template},selectLicenseIdCallback:function(e){this.getCurrentEditingPolicy().policyText+=" ".concat(e.licenseId)},changePolicyText:function(e){},focusInputHandler:function(e,t){this.editingIndex=t},switchPolicyStatusHandler:function(e,t){var a=this;e.policySegmentId?e.disabled=!e.disabled:this.$confirm("确定删除当前未保存策略？").then(function(){a.policyList.splice(t,1)}).catch(function(){})},getChangeData:function(){var e={};return this.policyList.forEach(function(t){t.policySegmentId?(e.updatePolicySegments=e.updatePolicySegments||[],e.updatePolicySegments.push({policySegmentId:t.policySegmentId,policyName:t.policyName,status:t.disabled?0:1})):t.policyText&&(e.addPolicySegments=e.addPolicySegments||[],e.addPolicySegments.push({policyName:t.policyName,policyText:btoa(t.policyText)}))}),e}}},C=(a("YOex"),Object(p.a)(_,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("div",{staticClass:"policy-list"},e._l(e.policyList,function(t,i){return a("div",{staticClass:"policy-input-item",class:{"disabled-policy":t.disabled}},[a("div",{staticClass:"policy-name-input-wrap"},[a("el-button",{staticClass:"del-policy-btn",attrs:{type:"text"},on:{click:function(a){e.switchPolicyStatusHandler(t,i)}}},[a("i",{staticClass:"fl-icon fl-icon-close-hover"}),e._v(" "),a("i",{staticClass:"fl-icon fl-icon-revert-hover"})]),e._v(" "),a("div",{staticClass:"policy-name-input-item"},[a("div",{staticClass:"policy-name-input-placeholder"},[a("pre",{staticClass:"policy-name-pre"},[e._v(e._s(t.policyName))]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.policyName,expression:"policy.policyName"}],staticClass:"policy-name-input",attrs:{type:"text",disabled:t.disabled},domProps:{value:t.policyName},on:{input:function(a){a.target.composing||e.$set(t,"policyName",a.target.value)}}})])])],1),e._v(" "),a("div",{staticClass:"policy-content-input-wrap",class:{"policy-editing":e.editingIndex===i}},[a("div",{staticClass:"policy-toolbar"},[a("ul",{staticClass:"tool-list"},[a("li",[a("el-tooltip",{staticClass:"item",attrs:{effect:"light",content:"使用已有策略模板",placement:"bottom"}},[a("el-button",{staticClass:"op-btn",attrs:{type:"text"},on:{click:function(t){e.showToolHandler("policy-template-selector")}}},[a("i",{staticClass:"el-icon-tickets"})])],1)],1),e._v(" "),a("li",[a("el-tooltip",{staticClass:"item",attrs:{effect:"light",content:"查询license",placement:"bottom"}},[a("el-button",{staticClass:"op-btn",attrs:{type:"text"},on:{click:function(t){e.showToolHandler("query-policy-license")}}},[a("i",{staticClass:"el-icon-search"})])],1)],1)])]),e._v(" "),a("div",{staticClass:"policy-content-input-padding"},[t.policySegmentId?a("pre",{staticClass:"policy-text"},[e._v(e._s(t.policyText))]):[a("pre",{staticClass:"input-placeholder"},[e._v(e._s(t.policyText))]),e._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.policyText,expression:"policy.policyText"}],staticClass:"policy-content-input",attrs:{spellcheck:"false",placeholder:"请输入策略"},domProps:{value:t.policyText},on:{change:function(a){e.changePolicyText(t)},focus:function(t){e.focusInputHandler(t,i)},input:function(a){a.target.composing||e.$set(t,"policyText",a.target.value)}}})]],2)])])})),e._v(" "),a("div",{staticClass:"add-policy-wrap"},[a("el-button",{staticClass:"add-policy-btn",attrs:{type:"text"},on:{click:e.addNewPolicy}},[a("i",{staticClass:"el-icon-plus"}),e._v("添加授权策略\n    ")])],1),e._v(" "),a("div",[a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.showValidate,expression:"showValidate"}],attrs:{type:"primary"},on:{click:e.validate}},[e._v("格式校验\n    ")])],1),e._v(" "),a("el-dialog",{attrs:{title:"选择策略模板",visible:e.showCustomPolicyTplDialog,width:"50%"},on:{"update:visible":function(t){e.showCustomPolicyTplDialog=t}}},[a("keep-alive",[a(e.currentTool,{tag:"component",attrs:{callback:e.operationCallback}})],1)],1)],1)},[],!1,null,"11e28192",null));t.a=C.exports},mL9P:function(e,t,a){"use strict";a.r(t),a.d(t,"RESOURCE_TYPES",function(){return i}),a.d(t,"RESOURCE_STATUS",function(){return n});var i={widget:"widget",image:"image",audio:"audio",markdown:"markdown",pageBuild:"page_build",revealSlide:"reveal_slide",license:"license"},n=[{desc:"未知状态",type:"danger"},{desc:"未发布",type:"warning"},{desc:"已发布",type:"success"},{desc:"冻结",type:"danger"}]},mQvM:function(e,t,a){"use strict";var i=a("+R5k");a.n(i).a},p0A3:function(e,t,a){"use strict";var i=a("6ydb");a.n(i).a},qTA6:function(e,t,a){"use strict";var i={name:"resource-intro",data:function(){return{}},props:{resource:{type:Object,default:function(){return{}}}}},n=(a("N0Vh"),a("KHd+")),s=Object(n.a)(i,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"res-intro-wrapper"},[e._m(0),e._v(" "),a("div",{staticClass:"res-content"},[a("p",{staticClass:"res-name"},[e._v(e._s(e.resource.resourceName))]),e._v(" "),e._t("default"),e._v(" "),a("div",{staticClass:"res-origin"},[a("span",{staticClass:"res-author"},[e._v("by: "+e._s(e.resource.userName))]),e._v(" "),a("span",{staticClass:"res-date"},[e._v(e._s(e._f("fmtDate")(e.resource.updateDate,"YYYY-MM-DD")))])]),e._v(" "),a("div",[a("a",{staticClass:"more-detail-link",attrs:{target:"_blank",href:"/resource/detail/"+e.resource.resourceId}},[e._v("查看更多>>")])])],2)])},[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"user-avatar"},[t("img",{staticClass:"resource-author-img",attrs:{src:"//freelog-image.oss-cn-shenzhen.aliyuncs.com/preview/e9bb1c2d-33ce-4a65-93c1-87c88abb4188.jpg",alt:""}})])}],!1,null,"da8084f6",null);t.a=s.exports},r3ZZ:function(e,t,a){"use strict";var i=a("3zXT");a.n(i).a},uEsI:function(e,t,a){},uefJ:function(e,t,a){},yfc9:function(e,t,a){"use strict";var i;function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.d(t,"b",function(){return l}),a.d(t,"a",function(){return u});var s=1,r=2,o=(n(i={},s,{value:s,desc:"资源策略模板"}),n(i,r,{value:r,desc:"用户策略模板"}),i),c={0:{value:0,desc:"正常"},1:{value:1,desc:"已删除"}};function l(e){return o[e]?o[e].desc:"策略模板"}function u(e){return c[e]?c[e].desc:"未知"}}}]);