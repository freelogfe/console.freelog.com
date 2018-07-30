(window.webpackJsonp=window.webpackJsonp||[]).push([["node~presentable~resource-editor","contract"],{"+LUt":function(e,t,n){"use strict";var a=n("0Bse"),i=(n("1O/z"),n("JlKq"));function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var r={name:"resource-items",data:function(){return{search:"",resources:[],loader:null}},props:{type:{type:String,default:function(){return"all"}}},watch:{type:function(){this.initView()}},components:{ResourceItem:a.a,LazyListView:i.a},mounted:function(){this.initView()},methods:{initView:function(){switch(this.type){case"favor":this.loader=this.getFavorResourcesLoader();break;case"self":this.loader=this.getSelfResourcesLoader()}},fetchData:function(e){var t=this;console.log("fetchData",e);return this.loader?this.loader({page:e}).then(function(e){return t.resources=t.resources.concat(e.dataList),e.dataList.length<10&&(e.canLoadMore=!1),e}):Promise.resolve({canLoadMore:!1,dataList:[]})},getSelfResourcesLoader:function(){var e=this;return this.createResourceLoader(function(t){return e.$services.resource.get(t||{}).then(function(e){return e.getData()})})},getFavorResourcesLoader:function(){var e=this;return this.createResourceLoader(function(t){return e.$services.collections.get(t||{}).then(function(e){return e.getData()})})},createResourceLoader:function(e){return function(t){return"object"===s(t=t||{pageSize:10,page:1})&&(t={params:Object.assign({pageSize:10,page:1},t)}),e(t)}},getAllResourcesLoader:function(e){return"object"===s(e={pageSize:100})&&(e={params:e}),this.$services.resource.get(e||{}).then(function(e){return e.getData()})}}},o=(n("0efm"),n("KHd+")),c=Object(o.a)(r,function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"resource-items"},[t("lazy-list-view",{attrs:{list:this.resources,height:90,fetch:this.fetchData},scopedSlots:this._u([{key:"default",fn:function(e){return[t("resource-item",{attrs:{resource:e.data}})]}}])},[t("div",{staticClass:"empty-resource-tip",attrs:{slot:"empty"},slot:"empty"},[this._v("\n      "+this._s("self"===this.type?"没有自制资源":"未收藏资源")+"\n    ")])])],1)},[],!1,null,"428a1981",null);t.a=c.exports},"+UBe":function(e,t,n){},"0Bse":function(e,t,n){"use strict";var a=n("1O/z"),i={name:"resource-info-item",data:function(){return{}},props:{resource:{type:Object,default:function(){return{}}},type:{type:String,default:"list"}},watch:{},mounted:function(){this.format(this.resource)},methods:{format:function(e){var t=this;this.resource.resourceId&&(e._fileSize=this.humanizeSize(e.systemMeta.fileSize),Object(a.c)(e.userId).then(function(n){t.$set(e,"_userInfo",n)}))},humanizeSize:function(e){var t=["B","KB","MB","GB","TB"];if(e<1)return e+"B";var n=Math.min(Math.floor(Math.log(e)/Math.log(1024)),t.length-1);return(e=Number((e/Math.pow(1024,n)).toPrecision(2)))+t[n]},gotoDetail:function(e){this.$router.push("/resource/detail/".concat(e.resourceId))}}},s=(n("8TdY"),n("KHd+")),r=Object(s.a)(i,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"resource-item-info",class:["resource-item-theme-type-"+e.type],on:{click:function(t){e.gotoDetail(e.resource)}}},[n("h4",{staticClass:"res-title"},[e._v(e._s(e.resource.resourceName))]),e._v(" "),n("div",{staticClass:"res-intro-detail"},[n("div",{staticClass:"res-intro-bd"},[n("span",{staticClass:"res-type"},[e._v("#"+e._s(e.resource.resourceType))]),e._v(" "),n("span",{staticClass:"res-desc"},[e._v(e._s(e.resource.resourceDesc)+" "+e._s(e.resource.resourceId))])]),e._v(" "),n("div",{staticClass:"res-intro-ft"},[n("span",{staticClass:"res-type"},[e._v("#"+e._s(e.resource.resourceType))]),e._v(" "),e.resource._userInfo?n("span",{staticClass:"res-author"},[e._v("by: "+e._s(e.resource._userInfo.nickname))]):e._e(),e._v(" "),n("span",{staticClass:"update-time"},[e._v("最近更新时间："+e._s(e._f("fmtDate")(e.resource.createDate)))])])])])},[],!1,null,"0f5500ee",null);t.a=r.exports},"0efm":function(e,t,n){"use strict";var a=n("8XOY");n.n(a).a},"2cqv":function(e,t,n){"use strict";var a=n("e9wF");n.n(a).a},"59r6":function(e,t,n){"use strict";n.d(t,"b",function(){return s}),n.d(t,"c",function(){return r});var a=n("3eXy"),i=(n("snnE"),n("LvDl"),n("C2Lv"));function s(e){return a.ResourceService.get(e).then(function(e){return 0===e.data.errcode?e.getData():Promise.reject(e.data)})}var r=function(e){return s(e).then(function(e){return e})};t.a={loadDetail:s,loadResources:function(e){return i.a.get("/v1/resources/list",{params:{resourceIds:e.join(",")}}).then(function(e){return e.getData()})},onloadResourceDetail:r}},"6ifa":function(e,t,n){"use strict";n.r(t),n.d(t,"CONTRACT_STATUS",function(){return a}),n.d(t,"CONTRACT_STATUS_TIPS",function(){return i}),n.d(t,"CONTRACT_STATUS_COLORS",function(){return s});var a={uncreated:-1,initial:1,running:2,activated:3,userTerminated:4,sysTerminated:5,terminated:6},i={"-1":"未创建合同",1:"未开始执行",2:"执行中",3:"生效中",4:"用户终止",5:"系统终止",6:"合同已终止"},s={"-1":{type:"danger",desc:"未创建合同"},1:{type:"warning",desc:"未开始执行"},2:{type:"warning",desc:"执行中"},3:{type:"success",desc:"生效中"},4:{type:"info",desc:"用户终止"},5:{type:"info",desc:"系统终止"},6:{type:"info",desc:"合同已终止"}}},"8SHQ":function(e,t,n){"use strict";var a={};n.r(a),n.d(a,"PRESENTABLE_STATUS_TIPS",function(){return r});var i=n("6ifa"),s=n("mL9P"),r=[{text:"测试状态",type:"info"},{text:"未开始执行",type:"danger"},{text:"执行中",type:"danger"},{text:"生效中",type:"success"},{text:"用户终止",type:"info"},{text:"系统终止",type:"info"}],o=n("DAk/");function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}t.a=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},a=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),a.forEach(function(t){c(e,t,n[t])})}return e}({},i,s,a,o)},"8TdY":function(e,t,n){"use strict";var a=n("t2JG");n.n(a).a},"8XOY":function(e,t,n){},AlM9:function(e,t,n){"use strict";var a=n("6tqe"),i={name:"table-view",data:function(){return{loading:!1,tableData:[],total:0}},props:{data:{type:Array,default:function(){return[]}},showPagination:{type:Boolean,default:!0},formatHandler:{type:Function,default:null},paginationOptions:{type:Object,default:function(){return{pageSizes:[10,20,30,50]}}},loader:Function,pageMeta:{type:Object,default:function(){var e=a.c.get("PAGE_".concat(this.$route.fullPath,"_index"))||{};return Object.assign({pageSize:10,page:1},e)}}},beforeDestroy:function(){this.pageMeta&&this.pageMeta.keyWords&&delete this.pageMeta.keyWords,a.c.set("PAGE_".concat(this.pageUrl,"_index"),this.pageMeta)},mounted:function(){this.pageUrl=this.$route.fullPath,this.tableData=this.data,this.total=this.tableData.length,this.load(),this.$on("reload",this.reload.bind(this))},methods:{reload:function(e){this.load(e)},load:function(e){var t=this;Object.assign(this.pageMeta,e||{}),this.loader&&(this.loading=!0,this.loader(this.pageMeta).then(function(e){var n=e.getData();if(t.loading=!1,n){var a=n.dataList||n;t.formatHandler&&(a=t.formatHandler(a)),t.tableData=a,n.dataList?(t.total=n.totalItem,t.pageMeta.page=n.page||1):t.total=a.length}else t.$message.error(n.msg)}).catch(function(e){t.$message.warning("加载失败"),t.loading=!1}))},handleSizeChange:function(e){var t={pageSize:e};this.load(t),this.$emit("sizeChange",t)},handleCurrentChange:function(e){var t={page:e};this.load(t),this.$emit("pageChange",t)}}},s=(n("KOIe"),n("KHd+")),r=Object(s.a)(i,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"loading",rawName:"v-loading.body",value:e.loading,expression:"loading",modifiers:{body:!0}}],staticClass:"table-view-wrapper"},[n("el-table",{staticClass:"table",attrs:{data:e.tableData,stripe:"",border:""}},[e._t("default")],2),e._v(" "),n("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.showPagination,expression:"showPagination"}],staticClass:"pagination",attrs:{background:!0,"current-page":e.pageMeta.page,"page-sizes":[10,20,30,50],"page-size":e.pageMeta.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)},[],!1,null,"361849fa",null);t.a=r.exports},D2qm:function(e,t,n){},"DAk/":function(e,t,n){"use strict";n.r(t),n.d(t,"USER_GROUP_TYPE",function(){return a}),n.d(t,"NODE_GROUP_TYPE",function(){return i}),n.d(t,"GROUP_TYPES",function(){return s});var a=1,i=2,s=[{value:a,label:"用户分组"},{value:i,label:"节点分组"}]},H2zm:function(e,t,n){"use strict";var a=n("0Bse"),i=n("+LUt"),s=n("JlKq");function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var o={name:"search-resource",data:function(){return{searchInput:"",activeName:"favor",favorResources:[],searchResources:[]}},components:{ResourceItem:a.a,ResourceList:i.a,LazyListView:s.a},props:{searchScope:{type:Object,default:function(){return{}}}},watch:{},mounted:function(){this.loader=this.getFavorResourcesLoader()},methods:{addResourceHandler:function(e){this.$emit("add",e)},clearSearchInputHandler:function(){},getFavorResourcesLoader:function(){var e=this;return this.createResourceLoader(function(t){return e.$services.collections.get(t||{}).then(function(e){return e.getData()})})},createResourceLoader:function(e){return function(t){return"object"===r(t=t||{pageSize:10,page:1})&&(t={params:Object.assign({pageSize:10,page:1},t)}),e(t)}},fetchData:function(e){var t=this;return this.loader?this.loader({page:e}).then(function(e){return t.favorResources=t.favorResources.concat(e.dataList),e.dataList.length<10&&(e.canLoadMore=!1),e}):Promise.resolve({canLoadMore:!1,dataList:[]})},searchDataHandler:function(e){var t=this;return this.searchInput?this.$services.g_Resources.get({params:Object.assign({keyWords:encodeURIComponent(this.searchInput)},this.searchScope)}).then(function(e){var n=e.getData()||{};return 0===e.errcode?(t.searchResources=t.searchResources.concat(n.dataList),n.dataList.length<10&&(n.canLoadMore=!1)):n.canLoadMore=!1,n}):Promise.resolve({canLoadMore:!1})},searchHandler:function(){this.activeName="search",this.searchResources=[],this.$refs.searchView.refresh()}}},c=(n("p0A3"),n("2cqv"),n("KHd+")),l=Object(c.a)(o,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"search-resource-wrap"},[n("div",{staticClass:"search-input-area"},[n("el-input",{staticClass:"search-resource-input",attrs:{clearable:"",placeholder:"Search or ID"},on:{clear:e.clearSearchInputHandler},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.searchHandler(t):null}},model:{value:e.searchInput,callback:function(t){e.searchInput=t},expression:"searchInput"}})],1),e._v(" "),n("div",{staticClass:"search-resource-bd"},[n("el-tabs",{model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[n("el-tab-pane",{attrs:{label:"收藏资源",name:"favor"}},[n("lazy-list-view",{staticClass:"search-resource-list",attrs:{list:e.favorResources,height:90,fetch:e.fetchData},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{staticClass:"add-resource-btn",on:{click:function(n){e.addResourceHandler(t.data)}}},[e._v("添加")]),e._v(" "),n("resource-item",{staticStyle:{"margin-right":"80px"},attrs:{resource:t.data,type:"search"}})]}}])})],1),e._v(" "),n("el-tab-pane",{attrs:{label:"搜索资源",name:"search"}},[n("lazy-list-view",{ref:"searchView",staticClass:"search-resource-list",attrs:{list:e.searchResources,height:90,fetch:e.searchDataHandler},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{staticClass:"add-resource-btn",on:{click:function(n){e.addResourceHandler(t.data)}}},[e._v("添加")]),e._v(" "),n("resource-item",{staticStyle:{"margin-right":"80px"},attrs:{resource:t.data,type:"search"}})]}}])})],1)],1)],1)])},[],!1,null,"0783b56b",null);t.a=l.exports},JlKq:function(e,t,n){"use strict";var a={name:"fl-lazy-list-view",props:{list:{type:Array,required:!0,default:[],twoWays:!0},height:{type:Number,default:44},fetch:{type:Function}},data:function(){return{lastScrollTop:null,distance:this.height,lineTopHeight:0,lineBottomHeight:0,previewList:[],displayCount:0,canLoadMore:!0,index:1}},mounted:function(){this.initView(),this.$on("reload",this.refresh.bind(this))},beforeDestroy:function(){this.disconnect()},methods:{initView:function(){var e=this;e.$refs.loading.classList.remove("hide"),e.observer=new IntersectionObserver(function(t){t.forEach(function(t){t.intersectionRatio<=0||!1!==e.canLoadMore&&e.load().catch(function(){e.observer.unobserve(e.$refs.loading),e.$refs.loading.classList.add("hide")})})},{rootMargin:"50px 0px"}),e.observer.observe(this.$refs.loading)},load:function(){var e=this;return e.fetch(e.index++).then(function(t){if(e.canLoadMore=t.canLoadMore,e.scrollHandler(t.dataList||[]),!1===e.canLoadMore)return Promise.reject()})},disconnect:function(){this.observer&&this.observer.disconnect()},refresh:function(){this.canLoadMore=!0,this.previewList=[],this.index=1,this.disconnect(),this.initView()},scrollHandler:function(e){this.previewList=this.previewList.concat(e)}},components:{}},i=(n("U1Xs"),n("KHd+")),s=Object(i.a)(a,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"listView",staticClass:"fl-lazy-list-view"},[e.previewList.length?n("ul",{style:{paddingTop:e.lineTopHeight+"px",paddingBottom:e.lineBottomHeight+"px"}},e._l(e.previewList,function(t,a){return n("li",{key:a,style:{height:e.height+"px"}},[e._t("default",null,{data:t})],2)})):e._e(),e._v(" "),0===e.previewList.length?e._t("empty"):e._e(),e._v(" "),e._t("loading",[n("div",{ref:"loading",staticClass:"load-more-gif"},[e._v("loading...")])])],2)},[],!1,null,"94b4b6d8",null);t.a=s.exports},KOIe:function(e,t,n){"use strict";var a=n("biXf");n.n(a).a},N0Vh:function(e,t,n){"use strict";var a=n("dMN8");n.n(a).a},SkYN:function(e,t,n){"use strict";var a=n("uAan");n.n(a).a},U1Xs:function(e,t,n){"use strict";var a=n("iB2p");n.n(a).a},VBva:function(e,t,n){"use strict";var a={name:"clip-board",data:function(){return{}},props:{value:String},mounted:function(){},methods:{copyHandler:function(){this.$refs.copyText.select();try{var e=document.execCommand("copy");this.$emit("copyDone",e)}catch(e){this.$emit("copyDone",!1)}}}},i=(n("SkYN"),n("KHd+")),s=Object(i.a)(a,function(){var e=this.$createElement,t=this._self._c||e;return t("div",{on:{click:this.copyHandler}},[t("textarea",{ref:"copyText",staticClass:"clip-text",domProps:{value:this.value}}),this._v(" "),this._t("default")],2)},[],!1,null,"53b5aefb",null);t.a=s.exports},YOex:function(e,t,n){"use strict";var a=n("+UBe");n.n(a).a},aNms:function(e,t,n){"use strict";n("snnE");var a=n("LvDl"),i=n("C2Lv"),s={},r={};function o(e){var t=[];return e.resourceIds&&e.resourceIds.length&&(e.resourceIds.forEach(function(e){t.push(e),s[e]||(s[e]=[])}),e.resourceIds=t.join(",")),e.authSchemeIds&&e.authSchemeIds.length&&(e.authSchemeIds=e.authSchemeIds.join(",")),i.a.get("/v1/resources/authSchemes",{params:e}).then(function(n){if(0===n.data.errcode){var i=n.getData();return i.forEach(function(t){r[t.authSchemeId]||(r[t.authSchemeId]=t),e.resourceIds&&s[t.resourceId].push(t)}),t.length&&t.forEach(function(e){s[e]=Object(a.uniqBy)(s[e],"authSchemeId")}),Object(a.cloneDeep)(i)}return Promise.reject(n.data.msg)})}var c=function(e){return o(e)};t.a={onloadSchemesForResource:function(e,t){return(t=t||{}).resourceIds=[e],c(t)},onloadSchemeDetail:function(e){return o({authSchemeIds:[e]}).then(function(e){return Array.isArray(e)&&(e=e[0]),e})},loadAuthSchemes:o}},b4GV:function(e,t,n){"use strict";var a=n("NKFe"),i=n.n(a),s=n("hnv+"),r=n.n(s),o=n("AlM9"),c=n("yfc9");function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u={name:"policy-tpl-select-list",data:function(){return{}},props:{list:{type:Array,default:function(){return[]}},filter:{type:Function}},components:{TableView:o.a},computed:{tplList:function(){return this.filter?this.filter(this.list):this.list}},mounted:function(){},methods:{resolveType:function(e){return c.b(e)},resolveStatus:function(e){return c.a(e)},handleSelect:function(e){this.$emit("select",function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},a=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),a.forEach(function(t){l(e,t,n[t])})}return e}({},e))}}},d=n("KHd+"),p=Object(d.a)(u,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",[n("el-table",{attrs:{data:e.tplList,stripe:"",border:""}},[n("el-table-column",{attrs:{prop:"name",label:"模板名称"}}),e._v(" "),n("el-table-column",{attrs:{label:"",align:"center",width:"200px"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(n){e.handleSelect(t.row)}}},[e._v("选择\n        ")])]}}])})],1)],1)},[],!1,null,null,null).exports,f={resource:[{template:"for nodes:\n    in <init> : terminate\n  ",name:"免费"},{template:"for nodes:\n    in initial :\n      proceed to <signing> on receiving transaction of 199 to feth10000abc\n  ",name:"收费"}],presentable:[{template:"for public:\n    in <init> : terminate\n  ",name:"免费"},{template:"for public:\n    in initial :\n      proceed to <signing> on receiving transaction of 199 to feth10000abc\n  ",name:"收费"}]},h=n("11pw"),m={name:"policy-template-selector",data:function(){return{currentTabName:h.c.get("POLICY_TPL_ACTIVE_TAB_NAME")||"official",policyTpls:[],queryPolicyTpl:"",defaultPolicyTpls:"node"===this.$route.meta.type?f.presentable:f.resource}},props:{callback:{type:Function}},components:{PolicyTplList:p},mounted:function(){var e=this;this.loadCustomPolicyTpl().then(function(t){e.policyTpls=t})},methods:{loadCustomPolicyTpl:function(){return this.$services.policyTemplate.get({params:{templateType:1,pageSize:100}}).then(function(e){var t=e.getData();if(t)return t.dataList;throw new Error(e.data.msg)})},selectPolicyTplHandler:function(e){this.callback&&this.callback({name:"selectPolicyTemplate",data:{template:e.template}})},filterHandler:function(e){var t=this;return e.filter(function(e){return!t.queryPolicyTpl||e.name.indexOf(t.queryPolicyTpl)>-1})},tabClickHandler:function(e){h.c.set("POLICY_TPL_ACTIVE_TAB_NAME",e.name)}}},y=Object(d.a)(m,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticStyle:{"margin-bottom":"15px"}},[n("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入内容"},model:{value:e.queryPolicyTpl,callback:function(t){e.queryPolicyTpl=t},expression:"queryPolicyTpl"}},[n("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})])],1),e._v(" "),n("el-tabs",{attrs:{type:"border-card"},on:{"tab-click":e.tabClickHandler},model:{value:e.currentTabName,callback:function(t){e.currentTabName=t},expression:"currentTabName"}},[n("el-tab-pane",{attrs:{label:"示例模板",name:"official"}},[n("policy-tpl-list",{attrs:{list:e.defaultPolicyTpls,filter:e.filterHandler},on:{select:e.selectPolicyTplHandler}})],1),e._v(" "),n("el-tab-pane",{attrs:{label:"我的模板",name:"mine"}},[n("policy-tpl-list",{attrs:{list:e.policyTpls,filter:e.filterHandler},on:{select:e.selectPolicyTplHandler}})],1)],1)],1)},[],!1,null,null,null).exports,v={name:"query-policy-license",data:function(){return{licenses:[],queryInput:"",licenseContent:"",selectedLicenseId:"",licenseMap:{}}},components:{ClipBoard:n("VBva").a},props:{callback:{type:Function}},mounted:function(){this.licenses=this.loadAll()},methods:{copyDoneHandler:function(){this.selectedLicenseId&&(this.$message.success("已复制"),this.callback&&this.callback({name:"selectLicenseId",data:{licenseId:this.selectedLicenseId}}))},loadAll:function(){var e=this;this.$axios.get("/v1/resources/warehouse?resourceType=license").then(function(t){e.licenses=t.data.data.dataList.map(function(e){return{value:e.resourceName,id:e.resourceId}})})},querySearchAsync:function(e,t){var n=this.licenses;t(e?n.filter(this.createStateFilter(e)):n)},createStateFilter:function(e){var t=e.toLowerCase(),n=new RegExp(t,"i");return function(e){return n.test(e.value)||n.test(e.id)}},handleSelect:function(e){this.selectedLicenseId=e.id,this.showLicenseContent(e)},showLicenseContent:function(e){var t=this,n=e.id;this.licenseMap[n]?this.licenseContent=this.licenseMap[n]:this.$axios.get("/v1/auths/resource/".concat(n,".data")).then(function(e){e.getData()?(t.licenseContent=e.getData(),t.licenseMap[n]=t.licenseContent):t.$message.error(e.data.msg)})}}},g=(n("mQvM"),Object(d.a)(v,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-autocomplete",{staticClass:"search-input",attrs:{"fetch-suggestions":e.querySearchAsync,placeholder:"请输入内容License ID"},on:{select:e.handleSelect},model:{value:e.queryInput,callback:function(t){e.queryInput=t},expression:"queryInput"}},[n("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"prefix"},slot:"prefix"}),e._v(" "),n("clip-board",{staticStyle:{display:"inline-block","margin-left":"-8px"},attrs:{slot:"append",value:e.selectedLicenseId},on:{copyDone:e.copyDoneHandler},slot:"append"},[n("el-button",{attrs:{type:"primary",plain:"",disabled:!e.selectedLicenseId}},[n("i",{staticClass:"el-icon-fa-clipboard"})])],1)],1),e._v(" "),n("pre",{staticClass:"license-content"},[e._v("    "+e._s(e.licenseContent)+"\n  ")])],1)},[],!1,null,"24fba8f2",null).exports),b={resource:i.a,presentable:r.a},_={name:"policy-editor",data:function(){return{submitLoading:!1,policyText:this.value,showCustomPolicyTplDialog:!1,currentTool:"",editingIndex:-1,policyList:[]}},props:{value:{type:[Array,Object],default:function(){return""}},showValidate:{type:Boolean,default:function(){return!0}},config:{type:Object,default:function(){return{type:""}}}},components:{PolicyTemplateSelector:y,QueryPolicyLicense:g},watch:{policyList:{handler:function(e,t){this.$emit("change",this.policyList)},deep:!0},"value.policy":{handler:function(e,t){this.fillPolicyList(this.value)},deep:!0}},mounted:function(){this.config.type||(this.config.type="node"===this.$route.meta.type?"presentable":"resource"),this.fillPolicyList(this.value)},methods:{fillPolicyList:function(e){var t=this;e.policy&&(this.policyList=e.policy.map(function(e){var n=e.segmentText,a=b[t.config.type];return a.compile(n).errorMsg||(n=a.beautify(n)),{policyName:e.policyName||"",policyText:n,policySegmentId:e.segmentId,disabled:0===e.status}})),this.policyList.length||this.addNewPolicy()},validate:function(){var e=b[this.config.type],t=e.compile(this.policyText);t.errorMsg?(this.$emit("validate",{done:!1,error:{message:t.errorMsg}}),this.$message.error(t.errorMsg)):(this.policyText=e.beautify(this.policyText),this.$emit("input",this.policyText),this.$emit("validate",{done:!0}))},addNewPolicy:function(){this.policyList.push({policyName:"未命名策略",policyText:"",disabled:!1})},createHandler:function(e){return this.$services.policy.post(e)},showToolHandler:function(e){this.currentTool=e,this.showCustomPolicyTplDialog=!0},operationCallback:function(e){if(this.showCustomPolicyTplDialog=!1,e&&e.name){var t="".concat(e.name,"Callback");this[t]&&this[t](e.data),this.$emit("input",this.policyText)}},getCurrentEditingPolicy:function(){return this.policyList[this.editingIndex]},selectPolicyTemplateCallback:function(e){this.getCurrentEditingPolicy().policyText=e.template},selectLicenseIdCallback:function(e){this.getCurrentEditingPolicy().policyText+=" ".concat(e.licenseId)},changePolicyText:function(e){},focusInputHandler:function(e,t){this.editingIndex=t},switchPolicyStatusHandler:function(e,t){var n=this;e.policySegmentId?e.disabled=!e.disabled:this.$confirm("确定删除当前未保存策略？").then(function(){n.policyList.splice(t,1)}).catch(function(){})},getChangeData:function(){var e={};return this.policyList.forEach(function(t){t.policySegmentId?(e.updatePolicySegments=e.updatePolicySegments||[],e.updatePolicySegments.push({policySegmentId:t.policySegmentId,policyName:t.policyName,status:t.disabled?0:1})):t.policyText&&(e.addPolicySegments=e.addPolicySegments||[],e.addPolicySegments.push({policyName:t.policyName,policyText:btoa(t.policyText)}))}),e}}},C=(n("YOex"),Object(d.a)(_,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",[n("div",{staticClass:"policy-list"},e._l(e.policyList,function(t,a){return n("div",{staticClass:"policy-input-item",class:{"disabled-policy":t.disabled}},[n("div",{staticClass:"policy-name-input-wrap"},[n("el-button",{staticClass:"del-policy-btn",attrs:{type:"text"},on:{click:function(n){e.switchPolicyStatusHandler(t,a)}}},[n("i",{staticClass:"fl-icon fl-icon-close-hover"}),e._v(" "),n("i",{staticClass:"fl-icon fl-icon-revert-hover"})]),e._v(" "),n("div",{staticClass:"policy-name-input-item"},[n("div",{staticClass:"policy-name-input-placeholder"},[n("pre",{staticClass:"policy-name-pre"},[e._v(e._s(t.policyName))]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.policyName,expression:"policy.policyName"}],staticClass:"policy-name-input",attrs:{type:"text",disabled:t.disabled},domProps:{value:t.policyName},on:{input:function(n){n.target.composing||e.$set(t,"policyName",n.target.value)}}})])])],1),e._v(" "),n("div",{staticClass:"policy-content-input-wrap",class:{"policy-editing":e.editingIndex===a}},[n("div",{staticClass:"policy-toolbar"},[n("ul",{staticClass:"tool-list"},[n("li",[n("el-tooltip",{staticClass:"item",attrs:{effect:"light",content:"使用已有策略模板",placement:"bottom"}},[n("el-button",{staticClass:"op-btn",attrs:{type:"text"},on:{click:function(t){e.showToolHandler("policy-template-selector")}}},[n("i",{staticClass:"el-icon-tickets"})])],1)],1),e._v(" "),n("li",[n("el-tooltip",{staticClass:"item",attrs:{effect:"light",content:"查询license",placement:"bottom"}},[n("el-button",{staticClass:"op-btn",attrs:{type:"text"},on:{click:function(t){e.showToolHandler("query-policy-license")}}},[n("i",{staticClass:"el-icon-search"})])],1)],1)])]),e._v(" "),n("div",{staticClass:"policy-content-input-padding"},[t.policySegmentId?n("pre",{staticClass:"policy-text"},[e._v(e._s(t.policyText))]):[n("pre",{staticClass:"input-placeholder"},[e._v(e._s(t.policyText))]),e._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.policyText,expression:"policy.policyText"}],staticClass:"policy-content-input",attrs:{spellcheck:"false",placeholder:"请输入策略"},domProps:{value:t.policyText},on:{change:function(n){e.changePolicyText(t)},focus:function(t){e.focusInputHandler(t,a)},input:function(n){n.target.composing||e.$set(t,"policyText",n.target.value)}}})]],2)])])})),e._v(" "),n("div",{staticClass:"add-policy-wrap"},[n("el-button",{staticClass:"add-policy-btn",attrs:{type:"text"},on:{click:e.addNewPolicy}},[n("i",{staticClass:"el-icon-plus"}),e._v("添加授权策略\n    ")])],1),e._v(" "),n("div",[n("el-button",{directives:[{name:"show",rawName:"v-show",value:e.showValidate,expression:"showValidate"}],attrs:{type:"primary"},on:{click:e.validate}},[e._v("格式校验\n    ")])],1),e._v(" "),n("el-dialog",{attrs:{title:"选择策略模板",visible:e.showCustomPolicyTplDialog,width:"50%"},on:{"update:visible":function(t){e.showCustomPolicyTplDialog=t}}},[n("keep-alive",[n(e.currentTool,{tag:"component",attrs:{callback:e.operationCallback}})],1)],1)],1)},[],!1,null,"11e28192",null));t.a=C.exports},biXf:function(e,t,n){},dMN8:function(e,t,n){},e9wF:function(e,t,n){},iB2p:function(e,t,n){},mL9P:function(e,t,n){"use strict";n.r(t),n.d(t,"RESOURCE_TYPES",function(){return a}),n.d(t,"RESOURCE_STATUS",function(){return i});var a={widget:"widget",image:"image",audio:"audio",markdown:"markdown",pageBuild:"page_build",revealSlide:"reveal_slide",license:"license"},i=[{desc:"未知状态",type:"danger"},{desc:"未发布",type:"warning"},{desc:"已发布",type:"success"},{desc:"冻结",type:"danger"}]},mQvM:function(e,t,n){"use strict";var a=n("n2xy");n.n(a).a},n2xy:function(e,t,n){},p0A3:function(e,t,n){"use strict";var a=n("D2qm");n.n(a).a},qTA6:function(e,t,n){"use strict";var a={name:"resource-intro",data:function(){return{}},props:{resource:{type:Object,default:function(){return{}}}}},i=(n("N0Vh"),n("KHd+")),s=Object(i.a)(a,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"res-intro-wrapper"},[e._m(0),e._v(" "),n("div",{staticClass:"res-content"},[n("p",{staticClass:"res-name"},[e._v(e._s(e.resource.resourceName))]),e._v(" "),e._t("default"),e._v(" "),n("div",{staticClass:"res-origin"},[n("span",{staticClass:"res-author"},[e._v("by: "+e._s(e.resource.userName))]),e._v(" "),n("span",{staticClass:"res-date"},[e._v(e._s(e._f("fmtDate")(e.resource.updateDate,"YYYY-MM-DD")))])]),e._v(" "),n("div",[n("a",{staticClass:"more-detail-link",attrs:{target:"_blank",href:"/resource/detail/"+e.resource.resourceId}},[e._v("查看更多>>")])])],2)])},[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"user-avatar"},[t("img",{staticClass:"resource-author-img",attrs:{src:"//freelog-image.oss-cn-shenzhen.aliyuncs.com/preview/e9bb1c2d-33ce-4a65-93c1-87c88abb4188.jpg",alt:""}})])}],!1,null,"da8084f6",null);t.a=s.exports},t2JG:function(e,t,n){},uAan:function(e,t,n){},yfc9:function(e,t,n){"use strict";var a;function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"b",function(){return l}),n.d(t,"a",function(){return u});var s=1,r=2,o=(i(a={},s,{value:s,desc:"资源策略模板"}),i(a,r,{value:r,desc:"用户策略模板"}),a),c={0:{value:0,desc:"正常"},1:{value:1,desc:"已删除"}};function l(e){return o[e]?o[e].desc:"策略模板"}function u(e){return c[e]?c[e].desc:"未知"}}}]);