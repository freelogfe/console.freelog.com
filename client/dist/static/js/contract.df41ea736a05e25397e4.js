(window.webpackJsonp=window.webpackJsonp||[]).push([["contract"],{"59r6":function(e,t,a){"use strict";a.d(t,"b",function(){return r}),a.d(t,"c",function(){return o});var n=a("3eXy"),i=(a("snnE"),a("LvDl"),a("C2Lv"));function r(e){return n.ResourceService.get(e).then(function(e){return 0===e.data.errcode?e.getData():Promise.reject(e.data)})}var o=function(e){return r(e).then(function(e){return e})};t.a={loadDetail:r,loadResources:function(e){return i.a.get("/v1/resources/list",{params:{resourceIds:e.join(",")}}).then(function(e){return e.getData()})},onloadResourceDetail:o}},"6ifa":function(e,t,a){"use strict";a.r(t),a.d(t,"CONTRACT_STATUS",function(){return n}),a.d(t,"CONTRACT_STATUS_TIPS",function(){return i}),a.d(t,"CONTRACT_STATUS_COLORS",function(){return r});var n={uncreated:-1,initial:1,running:2,activated:3,userTerminated:4,sysTerminated:5,terminated:6},i={"-1":"未创建合同",1:"未开始执行",2:"执行中",3:"生效中",4:"用户终止",5:"系统终止",6:"合同已终止"},r={"-1":{type:"danger",desc:"未创建合同"},1:{type:"warning",desc:"未开始执行"},2:{type:"warning",desc:"执行中"},3:{type:"success",desc:"生效中"},4:{type:"info",desc:"用户终止"},5:{type:"info",desc:"系统终止"},6:{type:"info",desc:"合同已终止"}}},AlM9:function(e,t,a){"use strict";var n=a("6tqe"),i={name:"table-view",data:function(){return{loading:!1,tableData:[],total:0}},props:{data:{type:Array,default:function(){return[]}},showPagination:{type:Boolean,default:!0},formatHandler:{type:Function,default:null},paginationOptions:{type:Object,default:function(){return{pageSizes:[10,20,30,50]}}},loader:Function,pageMeta:{type:Object,default:function(){var e=n.c.get("PAGE_".concat(this.$route.fullPath,"_index"))||{};return Object.assign({pageSize:10,page:1},e)}}},beforeDestroy:function(){this.pageMeta&&this.pageMeta.keyWords&&delete this.pageMeta.keyWords,n.c.set("PAGE_".concat(this.pageUrl,"_index"),this.pageMeta)},mounted:function(){this.pageUrl=this.$route.fullPath,this.tableData=this.data,this.total=this.tableData.length,this.load(),this.$on("reload",this.reload.bind(this))},methods:{reload:function(e){this.load(e)},load:function(e){var t=this;Object.assign(this.pageMeta,e||{}),this.loader&&(this.loading=!0,this.loader(this.pageMeta).then(function(e){var a=e.getData();if(t.loading=!1,a){var n=a.dataList||a;t.formatHandler&&(n=t.formatHandler(n)),t.tableData=n,a.dataList?(t.total=a.totalItem,t.pageMeta.page=a.page||1):t.total=n.length}else t.$message.error(a.msg)}).catch(function(e){t.$message.warning("加载失败"),t.loading=!1}))},handleSizeChange:function(e){var t={pageSize:e};this.load(t),this.$emit("sizeChange",t)},handleCurrentChange:function(e){var t={page:e};this.load(t),this.$emit("pageChange",t)}}},r=(a("KOIe"),a("KHd+")),o=Object(r.a)(i,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading.body",value:e.loading,expression:"loading",modifiers:{body:!0}}],staticClass:"table-view-wrapper"},[a("el-table",{staticClass:"table",attrs:{data:e.tableData,stripe:"",border:""}},[e._t("default")],2),e._v(" "),a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.showPagination,expression:"showPagination"}],staticClass:"pagination",attrs:{background:!0,"current-page":e.pageMeta.page,"page-sizes":[10,20,30,50],"page-size":e.pageMeta.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)},[],!1,null,"361849fa",null);t.a=o.exports},KOIe:function(e,t,a){"use strict";var n=a("biXf");a.n(n).a},biXf:function(e,t,a){}}]);