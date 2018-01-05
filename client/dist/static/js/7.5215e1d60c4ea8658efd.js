webpackJsonp([7],{

/***/ "1G+u":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__("rQCC");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_361849fa_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__("5b3W");
function injectStyle (ssrContext) {
  __webpack_require__("LoYW")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-361849fa"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_361849fa_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "5b3W":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"loading",rawName:"v-loading.body",value:(_vm.loading),expression:"loading",modifiers:{"body":true}}],staticClass:"table-view-wrapper"},[_c('el-table',{staticClass:"table",attrs:{"data":_vm.tableData,"stripe":"","border":""}},[_vm._t("default")],2),_vm._v(" "),_c('el-pagination',{directives:[{name:"show",rawName:"v-show",value:(_vm.showPagination),expression:"showPagination"}],staticClass:"pagination",attrs:{"background":true,"current-page":_vm.pageMeta.page,"page-sizes":[10, 20, 30, 50],"page-size":_vm.pageMeta.pageSize,"layout":"total, sizes, prev, pager, next, jumper","total":_vm.total},on:{"size-change":_vm.handleSizeChange,"current-change":_vm.handleCurrentChange}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "LoYW":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("O+Ac");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("10c9c684", content, true);

/***/ }),

/***/ "M+MZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',[_c('el-table',{staticClass:"resource-list",attrs:{"data":_vm.pagebuildList,"stripe":"","border":""}},[_c('el-table-column',{attrs:{"prop":"presentableName","label":"presentableName"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"resourceDetail.resourceName","label":"resourceName"}}),_vm._v(" "),_c('el-table-column',{attrs:{"width":"80px","label":"status"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_vm._v("\n        "+_vm._s(scope.row.status==_vm.PAGE_BUILD_STATUS.show? '显示': '隐藏')+"\n      ")]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"presentableId","width":"220px","label":"presentableId(for test)"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"resourceId","width":"350px","label":"resourceId(for test)"}}),_vm._v(" "),_c('el-table-column',{attrs:{"width":"120px","label":"create date"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_vm._v("\n        "+_vm._s(_vm._f("fmtDate")(scope.row.createDate))+"\n      ")]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"resourceUrl"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('a',{attrs:{"href":scope.row.resourceDetail.resourceUrl,"target":"_blank"}},[_vm._v("资源链接")])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","width":"200px"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('el-button',{attrs:{"size":"small"},on:{"click":function($event){_vm.handlePreview(scope.row)}}},[_vm._v("查看详情\n        ")]),_vm._v(" "),_c('el-button',{directives:[{name:"show",rawName:"v-show",value:(scope.row.status==2),expression:"scope.row.status==2"}],attrs:{"size":"small"},on:{"click":function($event){_vm.setDefaultPageBuildHandler(scope.row)}}},[_vm._v("设为显示\n        ")]),_vm._v(" "),_c('el-button',{directives:[{name:"show",rawName:"v-show",value:(scope.row.status==1),expression:"scope.row.status==1"}],attrs:{"size":"small"},on:{"click":function($event){_vm.setDefaultPageBuildHandler(scope.row, 2)}}},[_vm._v("设为隐藏\n        ")])]}}])})],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "O+Ac":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, ".table-view-wrapper .table[data-v-361849fa]{max-height:100%}.table-view-wrapper .pagination[data-v-361849fa]{margin-top:15px;text-align:center}", "", {"version":3,"sources":["/Users/daizecheng/workplace/freelog/console/client/src/components/TableView/index.vue"],"names":[],"mappings":"AACA,4CACE,eAAiB,CAClB,AACD,iDACE,gBAAiB,AACjB,iBAAmB,CACpB","file":"index.vue","sourcesContent":["\n.table-view-wrapper .table[data-v-361849fa] {\n  max-height: 100%;\n}\n.table-view-wrapper .pagination[data-v-361849fa] {\n  margin-top: 15px;\n  text-align: center;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "PExb":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, ".resource-list[data-v-62045a12]{width:100%;min-height:600px}", "", {"version":3,"sources":["/Users/daizecheng/workplace/freelog/console/client/src/views/node/page-build/list/index.vue"],"names":[],"mappings":"AACA,gCACE,WAAY,AACZ,gBAAkB,CACnB","file":"index.vue","sourcesContent":["\n.resource-list[data-v-62045a12] {\n  width: 100%;\n  min-height: 600px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "PG49":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__("woOf");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'table-view',
  data: function data() {
    return {
      loading: false,
      tableData: [],
      total: 0
    };
  },

  props: {
    data: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    formatHandler: {
      type: Function,
      default: null
    },
    paginationOptions: {
      type: Object,
      default: function _default() {
        return {
          pageSizes: [10, 20, 30, 50]
        };
      }
    },
    loader: Function,
    pageMeta: {
      type: Object,
      default: function _default() {
        return {
          pageSize: 10,
          page: 1 //页码
        };
      }
    }
  },
  mounted: function mounted() {
    this.tableData = this.data;
    this.total = this.tableData.length;
    this.load();
  },

  methods: {
    load: function load(pageInfo) {
      var _this = this;

      __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(this.pageMeta, pageInfo || {});
      if (this.loader) {
        this.loading = true;
        this.loader(this.pageMeta).then(function (res) {
          var data = res.getData();
          _this.loading = false;
          if (data) {
            var dataList = data.dataList || data;
            if (_this.formatHandler) {
              dataList = _this.formatHandler(dataList);
            }
            _this.tableData = dataList;
            //分页数据
            if (data.dataList) {
              _this.total = data.totalItem;
              _this.pageMeta.page = data.page || 1;
            } else {
              _this.total = dataList.length;
            }
          } else {
            _this.$message.error(data.msg);
          }
        }).catch(function (res) {
          _this.$message.warning('加载失败');
          _this.loading = false;
        });
      }
    },
    handleSizeChange: function handleSizeChange(val) {
      var data = { pageSize: val };
      this.load(data);
      this.$emit('sizeChange', data);
    },
    handleCurrentChange: function handleCurrentChange(val) {
      var data = { page: val };
      this.load(data);
      this.$emit('pageChange', data);
    }
  }
});

/***/ }),

/***/ "WJxV":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__("jWBi");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__index__["a" /* default */]);

/***/ }),

/***/ "jWBi":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__("//Fk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_TableView_index_vue__ = __webpack_require__("1G+u");



var PAGE_BUILD_STATUS = {
  show: 1,
  hide: 2
};
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'node-page-build-list',
  data: function data() {
    return {
      pagebuildList: [],
      PAGE_BUILD_STATUS: PAGE_BUILD_STATUS
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.loader().then(function (data) {
      console.log(data);
      _this.pagebuildList = data;
    });
  },

  methods: {
    loader: function loader() {
      var self = this;
      var param = {
        nodeId: this.$route.params.nodeId
      };
      return this.$services.pagebuild.get({
        params: param
      }).then(function (res) {
        var presentables = res.getData();
        var promises = [];
        presentables.forEach(function (p) {
          var promise = self.$services.resource.get(p.resourceId).then(function (resourceRes) {
            p.resourceDetail = resourceRes.getData();
            return resourceRes;
          });
          promises.push(promise);
        });

        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.all(promises).then(function (resources) {
          return res.getData();
        });
      });
    },
    updateStatus: function updateStatus() {
      this.pagebuildList.forEach(function (item) {
        item.status = PAGE_BUILD_STATUS.hide;
      });
    },
    setDefaultPageBuildHandler: function setDefaultPageBuildHandler(presentable, status) {
      var _this2 = this;

      status = status || PAGE_BUILD_STATUS.show;
      this.$services.pagebuild.put(presentable.id, {
        nodeId: parseInt(this.$route.params.nodeId),
        status: status
      }).then(function (res) {
        if (res.data.errcode === 0) {
          if (status === PAGE_BUILD_STATUS.show) {
            _this2.updateStatus();
          }
          presentable.status = status;
          _this2.$message.success('设置成功');
        } else {
          _this2.$message.error(res.data.msg);
        }
      }).catch(function (res) {
        _this2.$message.error(res.response.errorMsg);
      });
    },
    handlePreview: function handlePreview(presentable) {
      this.$router.push({
        path: '/node/' + this.$route.params.nodeId + '/presentable/detail',
        query: { presentableId: presentable.presentableId }
      });
    }
  }
});

/***/ }),

/***/ "oYWP":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("PExb");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("7253c832", content, true);

/***/ }),

/***/ "rQCC":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__("PG49");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__index__["a" /* default */]);

/***/ }),

/***/ "rbfI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__("WJxV");
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_62045a12_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__("M+MZ");
function injectStyle (ssrContext) {
  __webpack_require__("oYWP")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-62045a12"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_62045a12_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ })

});
//# sourceMappingURL=7.5215e1d60c4ea8658efd.js.map