webpackJsonp([6],{"1G+u":function(e,t,r){"use strict";var a=r("rQCC"),n=r("de1j"),o=r("XyMi");var i=function(e){r("r+A+")},s=Object(o.a)(a.a,n.a,n.b,!1,i,"data-v-361849fa",null);t.a=s.exports},"2hOb":function(e,t,r){"use strict";r.d(t,"a",function(){return a}),r.d(t,"b",function(){return n});var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"group-form-container"},[r("el-form",{ref:"dataForm",staticClass:"group-form",attrs:{model:t.detail,rules:t.formRules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"分组描述",prop:"groupName",required:""}},[r("el-input",{model:{value:t.detail.groupName,callback:function(e){t.$set(t.detail,"groupName",e)},expression:"detail.groupName"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"分组类型",prop:"groupType",required:""}},[r("el-select",{attrs:{placeholder:"请选择"},on:{change:t.changeGroupType},model:{value:t.detail.groupType,callback:function(e){t.$set(t.detail,"groupType",e)},expression:"detail.groupType"}},t._l(t.options,function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),t._v(" "),r("el-form-item",{attrs:{label:"分组成员",prop:"members",required:""}},[r("group-member-selector",{attrs:{"group-type":t.detail.groupType},model:{value:t.detail.members,callback:function(e){t.$set(t.detail,"members",e)},expression:"detail.members"}})],1),t._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("dataForm")}}},[t._v("创建分组")]),t._v(" "),r("el-button",{on:{click:t.goBackHandler}},[t._v("取消")])],1)],1)],1)},n=[]},"5OCq":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("v6tJ"),n=r("2hOb"),o=r("XyMi");var i=function(e){r("Oq28")},s=Object(o.a)(a.a,n.a,n.b,!1,i,"data-v-4681896e",null);t.default=s.exports},"6CML":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),r.d(t,"USER_GROUP_TYPE",function(){return a}),r.d(t,"NODE_GROUP_TYPE",function(){return n}),r.d(t,"GROUP_TYPES",function(){return o});var a=1,n=2,o=[{value:a,label:"用户分组"},{value:n,label:"节点分组"}]},"80qg":function(e,t,r){(e.exports=r("FZ+f")(!0)).push([e.i,".group-top-sec[data-v-244d41a8]{margin-bottom:15px}.route-link[data-v-244d41a8]{color:#fff}","",{version:3,sources:["/Users/daizecheng/workplace/freelog/console.freelog.com/client/src/views/group/list/index.vue"],names:[],mappings:"AACA,gCACE,kBAAoB,CACrB,AACD,6BACE,UAAa,CACd",file:"index.vue",sourcesContent:["\n.group-top-sec[data-v-244d41a8] {\n  margin-bottom: 15px;\n}\n.route-link[data-v-244d41a8] {\n  color: white;\n}\n"],sourceRoot:""}])},"85NV":function(e,t,r){(e.exports=r("FZ+f")(!0)).push([e.i,".group-form[data-v-4681896e]{max-width:800px}","",{version:3,sources:["/Users/daizecheng/workplace/freelog/console.freelog.com/client/src/views/group/create/index.vue"],names:[],mappings:"AACA,6BACE,eAAiB,CAClB",file:"index.vue",sourcesContent:["\n.group-form[data-v-4681896e] {\n  max-width: 800px;\n}\n"],sourceRoot:""}])},"8sRq":function(e,t,r){"use strict";var a=r("6CML");t.a={name:"group-member-selector",data:function(){return{groupMembers:[],asyncMembers:[],loading:!1}},props:{value:{type:Array},groupType:{type:[Number,String]}},watch:{groupType:function(){this.groupMembers=[]},value:function(){this.groupMembers=this.value}},mounted:function(){},methods:{queryUserInfo:function(e){var r=this;return this.$services.user.get(e).then(function(e){var t=e.data.data;return t&&(r.asyncMembers=[{label:t.nickname||t.userName,value:t.userId}]),t})},queryNodeInfo:function(e){var r=this;return this.$services.nodes.get(e).then(function(e){var t=e.getData();return t&&(r.asyncMembers=[{label:t.nodeName,value:t.nodeId}]),t})},queryMemberInfo:function(t){var r=this,e=this.groupType;return e===a.NODE_GROUP_TYPE?this.queryNodeInfo(t):e===a.USER_GROUP_TYPE?this.queryUserInfo(t):this.queryUserInfo(t).then(function(e){if(!e)return r.queryNodeInfo(t)})},asyncSearchMembers:function(e){var t=this;this.asyncMembers=[],5<=e.length&&(this.loading=!0,this.queryMemberInfo(e).then(function(){t.loading=!1}).catch(function(e){t.$error.showErrorMessage(e),t.loading=!1}))},changeHandler:function(){this.$emit("input",this.groupMembers)}}}},"D+3t":function(e,t,r){"use strict";var a=r("8sRq");t.a=a.a},Fp8n:function(e,t,r){var a=r("q4Ea");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r("rjj0")("e856653a",a,!0,{})},Glwz:function(e,t,r){"use strict";r.d(t,"a",function(){return a}),r.d(t,"b",function(){return n});var a=function(){var r=this,e=r.$createElement,a=r._self._c||e;return a("section",[a("div",{staticClass:"group-top-sec"},[a("router-link",{staticClass:"route-link",attrs:{to:"/group/create"}},[a("el-button",{attrs:{type:"primary"}},[r._v("创建新分组")])],1)],1),r._v(" "),a("table-view",{staticClass:"group-list",attrs:{loader:r.loader()}},[a("el-table-column",{attrs:{prop:"groupName",label:"分组描述"}}),r._v(" "),a("el-table-column",{attrs:{prop:"groupId",label:"分组 Id"}}),r._v(" "),a("el-table-column",{attrs:{label:"分组类型"},scopedSlots:r._u([{key:"default",fn:function(e){return[r._v("\n        "+r._s(r.resolveGroupType(e.row))+"\n      ")]}}])}),r._v(" "),a("el-table-column",{attrs:{label:"成员数量"},scopedSlots:r._u([{key:"default",fn:function(e){return[r._v("\n        "+r._s(r._f("humanizeNumber")(e.row.memberCount))+"\n      ")]}}])}),r._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:r._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"small"},on:{click:function(e){r.groupDetailHandler(t.row)}}},[r._v("管理\n        ")])]}}])})],1)],1)},n=[]},JqPN:function(e,t,r){"use strict";var a=r("zl91");t.a=a.a},Oq28:function(e,t,r){var a=r("85NV");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r("rjj0")("67bc3947",a,!0,{})},PG49:function(e,t,r){"use strict";var a=r("woOf"),n=r.n(a),o=r("kEHT");t.a={name:"table-view",data:function(){return{loading:!1,tableData:[],total:0}},props:{data:{type:Array,default:function(){return[]}},showPagination:{type:Boolean,default:!0},formatHandler:{type:Function,default:null},paginationOptions:{type:Object,default:function(){return{pageSizes:[10,20,30,50]}}},loader:Function,pageMeta:{type:Object,default:function(){var e=o.c.get("PAGE_"+this.$route.fullPath+"_index")||{};return n()({pageSize:10,page:1},e)}}},beforeDestroy:function(){this.pageMeta&&this.pageMeta.keyWords&&delete this.pageMeta.keyWords,o.c.set("PAGE_"+this.pageUrl+"_index",this.pageMeta)},mounted:function(){this.pageUrl=this.$route.fullPath,this.tableData=this.data,this.total=this.tableData.length,this.load(),this.$on("reload",this.reload.bind(this))},methods:{reload:function(e){this.load(e)},load:function(e){var a=this;n()(this.pageMeta,e||{}),this.loader&&(this.loading=!0,this.loader(this.pageMeta).then(function(e){var t=e.getData();if(a.loading=!1,t){var r=t.dataList||t;a.formatHandler&&(r=a.formatHandler(r)),a.tableData=r,t.dataList?(a.total=t.totalItem,a.pageMeta.page=t.page||1):a.total=r.length}else a.$message.error(t.msg)}).catch(function(e){a.$message.warning("加载失败"),a.loading=!1}))},handleSizeChange:function(e){var t={pageSize:e};this.load(t),this.$emit("sizeChange",t)},handleCurrentChange:function(e){var t={page:e};this.load(t),this.$emit("pageChange",t)}}}},RG2i:function(e,t,r){(e.exports=r("FZ+f")(!0)).push([e.i,".table-view-wrapper .table[data-v-361849fa]{max-height:100%}.table-view-wrapper .pagination[data-v-361849fa]{margin-top:15px;text-align:center}","",{version:3,sources:["/Users/daizecheng/workplace/freelog/console.freelog.com/client/src/components/TableView/index.vue"],names:[],mappings:"AACA,4CACE,eAAiB,CAClB,AACD,iDACE,gBAAiB,AACjB,iBAAmB,CACpB",file:"index.vue",sourcesContent:["\n.table-view-wrapper .table[data-v-361849fa] {\n  max-height: 100%;\n}\n.table-view-wrapper .pagination[data-v-361849fa] {\n  margin-top: 15px;\n  text-align: center;\n}\n"],sourceRoot:""}])},WDId:function(e,t,r){(e.exports=r("FZ+f")(!0)).push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"index.vue",sourceRoot:""}])},Wce7:function(e,t,r){var a=r("80qg");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r("rjj0")("3c6eb3ce",a,!0,{})},de1j:function(e,t,r){"use strict";r.d(t,"a",function(){return a}),r.d(t,"b",function(){return n});var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{directives:[{name:"loading",rawName:"v-loading.body",value:e.loading,expression:"loading",modifiers:{body:!0}}],staticClass:"table-view-wrapper"},[r("el-table",{staticClass:"table",attrs:{data:e.tableData,stripe:"",border:""}},[e._t("default")],2),e._v(" "),r("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.showPagination,expression:"showPagination"}],staticClass:"pagination",attrs:{background:!0,"current-page":e.pageMeta.page,"page-sizes":[10,20,30,50],"page-size":e.pageMeta.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)},n=[]},fZ7j:function(e,t,r){"use strict";var a=r("33VF"),n=(r("6CML"),r("jEv4"));t.a={name:"group-detail",data:function(){return{detail:{},groupMembers:[],asyncMembers:[],loading:!1}},components:{GroupMemberSelector:n.a},mounted:function(){var r=this,e=this.$route.params.groupId;e?this.load(e).then(function(e){var t=[];r.groupMembers=e.members.map(function(e){return t.push(e.memberId),e.memberName||e.memberId}),r.originalMemberIds=t,r.detail=e}):this.$message.error("缺少参数groupId")},methods:{load:function(e){return this.$services.groups.get(e||{}).then(function(e){return e.getData()}).catch(this.$error.showErrorMessage)},getRemoveMembers:function(){var t=this,r=[];return this.detail.members.forEach(function(e){-1===t.groupMembers.indexOf(e.memberName||e.memberId)&&r.push(e.memberId)}),r},getAddMembers:function(){var t=[],r=this.detail.members.map(function(e){return e.memberName}),a=this.detail.members.map(function(e){return e.memberId});return this.groupMembers.forEach(function(e){-1===r.indexOf(e)&&-1===a.indexOf(e)&&t.push(e)}),t},updateDetail:function(){var t=this,e=this.getAddMembers(),r=this.getRemoveMembers();Object(a.c)(this.$route.params.groupId,{addMembers:e,removeMembers:r}).then(function(e){e.data.data?t.$message.success("分组修改成功"):t.$message.error(e.data.msg)}).catch(function(e){t.$message.error(e.response.errorMsg||e)})}}}},fy5h:function(e,t,r){"use strict";r.d(t,"a",function(){return a}),r.d(t,"b",function(){return n});var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-select",{staticStyle:{width:"500px"},attrs:{multiple:"",filterable:"",remote:"","multiple-limit":200,placeholder:"请输入","remote-method":t.asyncSearchMembers,loading:t.loading},on:{change:t.changeHandler},model:{value:t.groupMembers,callback:function(e){t.groupMembers=e},expression:"groupMembers"}},t._l(t.asyncMembers,function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}},[r("span",{staticStyle:{float:"left"}},[t._v(t._s(e.label))]),t._v(" "),r("span",{staticStyle:{float:"right",color:"#8492a6","font-size":"13px","padding-right":"20px"}},[t._v(t._s(e.value))])])}))},n=[]},gYPz:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("vmAF"),n=r("qL5u"),o=r("XyMi");var i=function(e){r("Fp8n")},s=Object(o.a)(a.a,n.a,n.b,!1,i,"data-v-9983515a",null);t.default=s.exports},jEv4:function(e,t,r){"use strict";var a=r("D+3t"),n=r("fy5h"),o=r("XyMi");var i=function(e){r("qnuA")},s=Object(o.a)(a.a,n.a,n.b,!1,i,"data-v-76b6e6da",null);t.a=s.exports},oq6A:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("JqPN"),n=r("Glwz"),o=r("XyMi");var i=function(e){r("Wce7")},s=Object(o.a)(a.a,n.a,n.b,!1,i,"data-v-244d41a8",null);t.default=s.exports},q4Ea:function(e,t,r){(e.exports=r("FZ+f")(!0)).push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"index.vue",sourceRoot:""}])},qL5u:function(e,t,r){"use strict";r.d(t,"a",function(){return a}),r.d(t,"b",function(){return n});var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",[r("el-form",{ref:"dataForm",staticClass:"small-el-form",attrs:{"label-position":"right","label-width":"120px"}},[r("el-form-item",{attrs:{label:"groupName"}},[t._v("\n      "+t._s(t.detail.groupName)+"\n    ")]),t._v(" "),r("el-form-item",{attrs:{label:"分组ID"}},[t._v("\n      "+t._s(t.detail.groupId)+"\n    ")]),t._v(" "),r("el-form-item",{attrs:{label:"创建日期"}},[r("span",[t._v(t._s(t._f("fmtDate")(t.detail.createDate)))])]),t._v(" "),r("el-form-item",{attrs:{label:"分组类型"}},[t._v("\n      "+t._s(1===t.detail.groupType?"用户分组":"节点分组")+"\n    ")]),t._v(" "),r("el-form-item",{attrs:{label:"分组成员列表"}},[r("group-member-selector",{attrs:{"group-type":t.detail.groupType},model:{value:t.groupMembers,callback:function(e){t.groupMembers=e},expression:"groupMembers"}})],1),t._v(" "),r("el-form-item",[r("el-button",{staticStyle:{"margin-top":"15px"},attrs:{type:"primary"},on:{click:t.updateDetail}},[t._v("更新")])],1)],1)],1)},n=[]},qnuA:function(e,t,r){var a=r("WDId");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r("rjj0")("6bfcc354",a,!0,{})},"r+A+":function(e,t,r){var a=r("RG2i");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r("rjj0")("01e329ae",a,!0,{})},rQCC:function(e,t,r){"use strict";var a=r("PG49");t.a=a.a},v6tJ:function(e,t,r){"use strict";var a=r("ygpe");t.a=a.a},vmAF:function(e,t,r){"use strict";var a=r("fZ7j");t.a=a.a},ygpe:function(e,t,r){"use strict";var a=r("6CML"),n=r("jEv4"),o={groupName:[{required:!0,message:"分组描述不能为空",trigger:"blur"},{min:4,max:20,message:"分组描述长度应为4-20字符",trigger:"blur"}],members:[{validator:function(e,t,r){t&&t.length?r():r(new Error("分组成员至少含有一个成员"))},trigger:"manual"}],groupType:[{required:!0,message:"分组类型不能为空",trigger:"blur"}]};t.a={name:"group-creator",data:function(){return{formRules:o,options:a.GROUP_TYPES,detail:{groupName:"",members:[],groupType:""}}},components:{GroupMemberSelector:n.a},mounted:function(){},methods:{goBackHandler:function(){history.back()},changeGroupType:function(){this.detail.members=[]},submitForm:function(e){var t=this,r=this;r.$refs[e].validate(function(e){if(!e)return!1;r.$services.groups.post(r.detail).then(function(e){0!==e.data.errcode?t.$message.error(e.data.msg):(r.$message.success("分组创建成功"),setTimeout(function(){r.$router.push({path:"/group/list"})},1e3))}).catch(t.$error.showErrorMessage)})}}}},zl91:function(e,t,r){"use strict";var a=r("33VF"),n=r("1G+u"),o=r("6CML");t.a={name:"group-list",data:function(){return{}},components:{TableView:n.a},mounted:function(){},methods:{loader:function(){return function(){return a.b().then(function(e){return e})}},groupDetailHandler:function(e){this.$router.push({path:"/group/detail/"+e.groupId})},resolveGroupType:function(e){for(var t=0;t<o.GROUP_TYPES.length;t++)if(o.GROUP_TYPES[t].value===e.groupType)return o.GROUP_TYPES[t].label;return""}}}}});