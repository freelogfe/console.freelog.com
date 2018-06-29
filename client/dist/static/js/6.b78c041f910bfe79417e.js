webpackJsonp([6],{"+Tf2":function(e,t,a){"use strict";a.d(t,"a",function(){return r}),a.d(t,"b",function(){return n});var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading.body",value:e.loading,expression:"loading",modifiers:{body:!0}}],staticClass:"table-view-wrapper"},[a("el-table",{staticClass:"table",attrs:{data:e.tableData,stripe:"",border:""}},[e._t("default")],2),e._v(" "),a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.showPagination,expression:"showPagination"}],staticClass:"pagination",attrs:{background:!0,"current-page":e.pageMeta.page,"page-sizes":[10,20,30,50],"page-size":e.pageMeta.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)},n=[]},"1G+u":function(e,t,a){"use strict";var r=a("rQCC"),n=a("+Tf2"),o=a("XyMi");var i=function(e){a("FjH5")},s=Object(o.a)(r.a,n.a,n.b,!1,i,"data-v-361849fa",null);t.a=s.exports},"5OCq":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("v6tJ"),n=a("9v0g"),o=a("XyMi");var i=function(e){a("luWi")},s=Object(o.a)(r.a,n.a,n.b,!1,i,"data-v-4681896e",null);t.default=s.exports},"6CML":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),a.d(t,"USER_GROUP_TYPE",function(){return r}),a.d(t,"NODE_GROUP_TYPE",function(){return n}),a.d(t,"GROUP_TYPES",function(){return o});var r=1,n=2,o=[{value:r,label:"用户分组"},{value:n,label:"节点分组"}]},"7qz3":function(e,t,a){"use strict";a.d(t,"a",function(){return r}),a.d(t,"b",function(){return n});var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-select",{staticStyle:{width:"500px"},attrs:{multiple:"",filterable:"",remote:"","multiple-limit":200,placeholder:"请输入","remote-method":t.asyncSearchMembers,loading:t.loading},on:{change:t.changeHandler},model:{value:t.groupMembers,callback:function(e){t.groupMembers=e},expression:"groupMembers"}},t._l(t.asyncMembers,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}},[a("span",{staticStyle:{float:"left"}},[t._v(t._s(e.label))]),t._v(" "),a("span",{staticStyle:{float:"right",color:"#8492a6","font-size":"13px","padding-right":"20px"}},[t._v(t._s(e.value))])])}))},n=[]},"8pDY":function(e,t,a){"use strict";a.d(t,"a",function(){return r}),a.d(t,"b",function(){return n});var r=function(){var a=this,e=a.$createElement,r=a._self._c||e;return r("section",[r("div",{staticClass:"group-top-sec"},[r("router-link",{staticClass:"route-link",attrs:{to:"/group/create"}},[r("el-button",{attrs:{type:"primary"}},[a._v("创建新分组")])],1)],1),a._v(" "),r("table-view",{staticClass:"group-list",attrs:{loader:a.loader()}},[r("el-table-column",{attrs:{prop:"groupName",label:"分组描述"}}),a._v(" "),r("el-table-column",{attrs:{prop:"groupId",label:"分组 Id"}}),a._v(" "),r("el-table-column",{attrs:{label:"分组类型"},scopedSlots:a._u([{key:"default",fn:function(e){return[a._v("\n        "+a._s(a.resolveGroupType(e.row))+"\n      ")]}}])}),a._v(" "),r("el-table-column",{attrs:{label:"成员数量"},scopedSlots:a._u([{key:"default",fn:function(e){return[a._v("\n        "+a._s(a._f("humanizeNumber")(e.row.memberCount))+"\n      ")]}}])}),a._v(" "),r("el-table-column",{attrs:{label:"操作"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{size:"small"},on:{click:function(e){a.groupDetailHandler(t.row)}}},[a._v("管理\n        ")])]}}])})],1)],1)},n=[]},"8sRq":function(e,t,a){"use strict";var r=a("6CML");t.a={name:"group-member-selector",data:function(){return{groupMembers:[],asyncMembers:[],loading:!1}},props:{value:{type:Array},groupType:{type:[Number,String]}},watch:{groupType:function(){this.groupMembers=[]},value:function(){this.groupMembers=this.value}},mounted:function(){},methods:{queryUserInfo:function(e){var a=this;return this.$services.user.get(e).then(function(e){var t=e.data.data;return t&&(a.asyncMembers=[{label:t.nickname||t.userName,value:t.userId}]),t})},queryNodeInfo:function(e){var a=this;return this.$services.nodes.get(e).then(function(e){var t=e.getData();return t&&(a.asyncMembers=[{label:t.nodeName,value:t.nodeId}]),t})},queryMemberInfo:function(t){var a=this,e=this.groupType;return e===r.NODE_GROUP_TYPE?this.queryNodeInfo(t):e===r.USER_GROUP_TYPE?this.queryUserInfo(t):this.queryUserInfo(t).then(function(e){if(!e)return a.queryNodeInfo(t)})},asyncSearchMembers:function(e){var t=this;this.asyncMembers=[],5<=e.length&&(this.loading=!0,this.queryMemberInfo(e).then(function(){t.loading=!1}).catch(function(e){t.$error.showErrorMessage(e),t.loading=!1}))},changeHandler:function(){this.$emit("input",this.groupMembers)}}}},"9/m9":function(e,t,a){var r=a("x4JC");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("rjj0")("1325ae58",r,!0,{})},"9v0g":function(e,t,a){"use strict";a.d(t,"a",function(){return r}),a.d(t,"b",function(){return n});var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"group-form-container"},[a("el-form",{ref:"dataForm",staticClass:"group-form",attrs:{model:t.detail,rules:t.formRules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"分组描述",prop:"groupName",required:""}},[a("el-input",{model:{value:t.detail.groupName,callback:function(e){t.$set(t.detail,"groupName",e)},expression:"detail.groupName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"分组类型",prop:"groupType",required:""}},[a("el-select",{attrs:{placeholder:"请选择"},on:{change:t.changeGroupType},model:{value:t.detail.groupType,callback:function(e){t.$set(t.detail,"groupType",e)},expression:"detail.groupType"}},t._l(t.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"分组成员",prop:"members",required:""}},[a("group-member-selector",{attrs:{"group-type":t.detail.groupType},model:{value:t.detail.members,callback:function(e){t.$set(t.detail,"members",e)},expression:"detail.members"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("dataForm")}}},[t._v("创建分组")]),t._v(" "),a("el-button",{on:{click:t.goBackHandler}},[t._v("取消")])],1)],1)],1)},n=[]},"D+3t":function(e,t,a){"use strict";var r=a("8sRq");t.a=r.a},FjH5:function(e,t,a){var r=a("aJlK");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("rjj0")("2cdf586a",r,!0,{})},Hr7x:function(e,t,a){var r=a("Y6KW");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("rjj0")("2675a100",r,!0,{})},JqPN:function(e,t,a){"use strict";var r=a("zl91");t.a=r.a},PG49:function(e,t,a){"use strict";var r=a("woOf"),n=a.n(r),o=a("kEHT");t.a={name:"table-view",data:function(){return{loading:!1,tableData:[],total:0}},props:{data:{type:Array,default:function(){return[]}},showPagination:{type:Boolean,default:!0},formatHandler:{type:Function,default:null},paginationOptions:{type:Object,default:function(){return{pageSizes:[10,20,30,50]}}},loader:Function,pageMeta:{type:Object,default:function(){var e=o.c.get("PAGE_"+this.$route.fullPath+"_index")||{};return n()({pageSize:10,page:1},e)}}},beforeDestroy:function(){this.pageMeta&&this.pageMeta.keyWords&&delete this.pageMeta.keyWords,o.c.set("PAGE_"+this.pageUrl+"_index",this.pageMeta)},mounted:function(){this.pageUrl=this.$route.fullPath,this.tableData=this.data,this.total=this.tableData.length,this.load(),this.$on("reload",this.reload.bind(this))},methods:{reload:function(e){this.load(e)},load:function(e){var r=this;n()(this.pageMeta,e||{}),this.loader&&(this.loading=!0,this.loader(this.pageMeta).then(function(e){var t=e.getData();if(r.loading=!1,t){var a=t.dataList||t;r.formatHandler&&(a=r.formatHandler(a)),r.tableData=a,t.dataList?(r.total=t.totalItem,r.pageMeta.page=t.page||1):r.total=a.length}else r.$message.error(t.msg)}).catch(function(e){r.$message.warning("加载失败"),r.loading=!1}))},handleSizeChange:function(e){var t={pageSize:e};this.load(t),this.$emit("sizeChange",t)},handleCurrentChange:function(e){var t={page:e};this.load(t),this.$emit("pageChange",t)}}}},Rb58:function(e,t,a){"use strict";a.d(t,"a",function(){return r}),a.d(t,"b",function(){return n});var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[a("el-form",{ref:"dataForm",staticClass:"small-el-form",attrs:{"label-position":"right","label-width":"120px"}},[a("el-form-item",{attrs:{label:"groupName"}},[t._v("\n      "+t._s(t.detail.groupName)+"\n    ")]),t._v(" "),a("el-form-item",{attrs:{label:"分组ID"}},[t._v("\n      "+t._s(t.detail.groupId)+"\n    ")]),t._v(" "),a("el-form-item",{attrs:{label:"创建日期"}},[a("span",[t._v(t._s(t._f("fmtDate")(t.detail.createDate)))])]),t._v(" "),a("el-form-item",{attrs:{label:"分组类型"}},[t._v("\n      "+t._s(1===t.detail.groupType?"用户分组":"节点分组")+"\n    ")]),t._v(" "),a("el-form-item",{attrs:{label:"分组成员列表"}},[a("group-member-selector",{attrs:{"group-type":t.detail.groupType},model:{value:t.groupMembers,callback:function(e){t.groupMembers=e},expression:"groupMembers"}})],1),t._v(" "),a("el-form-item",[a("el-button",{staticStyle:{"margin-top":"15px"},attrs:{type:"primary"},on:{click:t.updateDetail}},[t._v("更新")])],1)],1)],1)},n=[]},Vcm9:function(e,t,a){(e.exports=a("FZ+f")(!0)).push([e.i,".group-top-sec[data-v-244d41a8]{margin-bottom:15px}.route-link[data-v-244d41a8]{color:#fff}","",{version:3,sources:["/Users/daizecheng/workplace/freelog/console.freelog.com/client/src/views/group/list/index.vue"],names:[],mappings:"AACA,gCACE,kBAAoB,CACrB,AACD,6BACE,UAAa,CACd",file:"index.vue",sourcesContent:["\n.group-top-sec[data-v-244d41a8] {\n  margin-bottom: 15px;\n}\n.route-link[data-v-244d41a8] {\n  color: white;\n}\n"],sourceRoot:""}])},WzWd:function(e,t,a){(e.exports=a("FZ+f")(!0)).push([e.i,".group-form[data-v-4681896e]{max-width:800px}","",{version:3,sources:["/Users/daizecheng/workplace/freelog/console.freelog.com/client/src/views/group/create/index.vue"],names:[],mappings:"AACA,6BACE,eAAiB,CAClB",file:"index.vue",sourcesContent:["\n.group-form[data-v-4681896e] {\n  max-width: 800px;\n}\n"],sourceRoot:""}])},Y6KW:function(e,t,a){(e.exports=a("FZ+f")(!0)).push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"index.vue",sourceRoot:""}])},aJlK:function(e,t,a){(e.exports=a("FZ+f")(!0)).push([e.i,".table-view-wrapper .table[data-v-361849fa]{max-height:100%}.table-view-wrapper .pagination[data-v-361849fa]{margin-top:15px;text-align:center}","",{version:3,sources:["/Users/daizecheng/workplace/freelog/console.freelog.com/client/src/components/TableView/index.vue"],names:[],mappings:"AACA,4CACE,eAAiB,CAClB,AACD,iDACE,gBAAiB,AACjB,iBAAmB,CACpB",file:"index.vue",sourcesContent:["\n.table-view-wrapper .table[data-v-361849fa] {\n  max-height: 100%;\n}\n.table-view-wrapper .pagination[data-v-361849fa] {\n  margin-top: 15px;\n  text-align: center;\n}\n"],sourceRoot:""}])},dqmK:function(e,t,a){var r=a("Vcm9");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("rjj0")("250c6aaa",r,!0,{})},fZ7j:function(e,t,a){"use strict";var r=a("33VF"),n=(a("6CML"),a("jEv4"));t.a={name:"group-detail",data:function(){return{detail:{},groupMembers:[],asyncMembers:[],loading:!1}},components:{GroupMemberSelector:n.a},mounted:function(){var a=this,e=this.$route.params.groupId;e?this.load(e).then(function(e){var t=[];a.groupMembers=e.members.map(function(e){return t.push(e.memberId),e.memberName||e.memberId}),a.originalMemberIds=t,a.detail=e}):this.$message.error("缺少参数groupId")},methods:{load:function(e){return this.$services.groups.get(e||{}).then(function(e){return e.getData()}).catch(this.$error.showErrorMessage)},getRemoveMembers:function(){var t=this,a=[];return this.detail.members.forEach(function(e){-1===t.groupMembers.indexOf(e.memberName||e.memberId)&&a.push(e.memberId)}),a},getAddMembers:function(){var t=[],a=this.detail.members.map(function(e){return e.memberName}),r=this.detail.members.map(function(e){return e.memberId});return this.groupMembers.forEach(function(e){-1===a.indexOf(e)&&-1===r.indexOf(e)&&t.push(e)}),t},updateDetail:function(){var t=this,e=this.getAddMembers(),a=this.getRemoveMembers();Object(r.c)(this.$route.params.groupId,{addMembers:e,removeMembers:a}).then(function(e){e.data.data?t.$message.success("分组修改成功"):t.$message.error(e.data.msg)}).catch(function(e){t.$message.error(e.response.errorMsg||e)})}}}},gYPz:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("vmAF"),n=a("Rb58"),o=a("XyMi");var i=function(e){a("Hr7x")},s=Object(o.a)(r.a,n.a,n.b,!1,i,"data-v-9983515a",null);t.default=s.exports},jEv4:function(e,t,a){"use strict";var r=a("D+3t"),n=a("7qz3"),o=a("XyMi");var i=function(e){a("9/m9")},s=Object(o.a)(r.a,n.a,n.b,!1,i,"data-v-76b6e6da",null);t.a=s.exports},luWi:function(e,t,a){var r=a("WzWd");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("rjj0")("3edaae7a",r,!0,{})},oq6A:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("JqPN"),n=a("8pDY"),o=a("XyMi");var i=function(e){a("dqmK")},s=Object(o.a)(r.a,n.a,n.b,!1,i,"data-v-244d41a8",null);t.default=s.exports},rQCC:function(e,t,a){"use strict";var r=a("PG49");t.a=r.a},v6tJ:function(e,t,a){"use strict";var r=a("ygpe");t.a=r.a},vmAF:function(e,t,a){"use strict";var r=a("fZ7j");t.a=r.a},x4JC:function(e,t,a){(e.exports=a("FZ+f")(!0)).push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"index.vue",sourceRoot:""}])},ygpe:function(e,t,a){"use strict";var r=a("6CML"),n=a("jEv4"),o={groupName:[{required:!0,message:"分组描述不能为空",trigger:"blur"},{min:4,max:20,message:"分组描述长度应为4-20字符",trigger:"blur"}],members:[{validator:function(e,t,a){t&&t.length?a():a(new Error("分组成员至少含有一个成员"))},trigger:"manual"}],groupType:[{required:!0,message:"分组类型不能为空",trigger:"blur"}]};t.a={name:"group-creator",data:function(){return{formRules:o,options:r.GROUP_TYPES,detail:{groupName:"",members:[],groupType:""}}},components:{GroupMemberSelector:n.a},mounted:function(){},methods:{goBackHandler:function(){history.back()},changeGroupType:function(){this.detail.members=[]},submitForm:function(e){var t=this,a=this;a.$refs[e].validate(function(e){if(!e)return!1;a.$services.groups.post(a.detail).then(function(e){0!==e.data.errcode?t.$message.error(e.data.msg):(a.$message.success("分组创建成功"),setTimeout(function(){a.$router.push({path:"/group/list"})},1e3))}).catch(t.$error.showErrorMessage)})}}}},zl91:function(e,t,a){"use strict";var r=a("33VF"),n=a("1G+u"),o=a("6CML");t.a={name:"group-list",data:function(){return{}},components:{TableView:n.a},mounted:function(){},methods:{loader:function(){return function(){return r.b().then(function(e){return e})}},groupDetailHandler:function(e){this.$router.push({path:"/group/detail/"+e.groupId})},resolveGroupType:function(e){for(var t=0;t<o.GROUP_TYPES.length;t++)if(o.GROUP_TYPES[t].value===e.groupType)return o.GROUP_TYPES[t].label;return""}}}}});