webpackJsonp([9],{

/***/ "+vOg":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user__ = __webpack_require__("ye8Q");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__policy__ = __webpack_require__("/mcc");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resource__ = __webpack_require__("D+Dq");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__g_resources__ = __webpack_require__("2peC");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__presentables__ = __webpack_require__("ZDeK");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__contract__ = __webpack_require__("7N2u");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nodes__ = __webpack_require__("O2QG");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pagebuild__ = __webpack_require__("6m4j");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__other__ = __webpack_require__("NY5L");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pbcontract__ = __webpack_require__("Pms9");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__contractRecords__ = __webpack_require__("P2Md");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__eventTest__ = __webpack_require__("rRVi");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return __WEBPACK_IMPORTED_MODULE_0__user__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PolicyService", function() { return __WEBPACK_IMPORTED_MODULE_1__policy__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ResourceService", function() { return __WEBPACK_IMPORTED_MODULE_2__resource__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "G_ResourcesService", function() { return __WEBPACK_IMPORTED_MODULE_3__g_resources__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PresentablesService", function() { return __WEBPACK_IMPORTED_MODULE_4__presentables__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "NodesService", function() { return __WEBPACK_IMPORTED_MODULE_6__nodes__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ContractService", function() { return __WEBPACK_IMPORTED_MODULE_5__contract__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PagebuildService", function() { return __WEBPACK_IMPORTED_MODULE_7__pagebuild__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "OtherService", function() { return __WEBPACK_IMPORTED_MODULE_8__other__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PbContract", function() { return __WEBPACK_IMPORTED_MODULE_9__pbcontract__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ContractRecords", function() { return __WEBPACK_IMPORTED_MODULE_10__contractRecords__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "eventTest", function() { return __WEBPACK_IMPORTED_MODULE_11__eventTest__["a"]; });
/**
 * Services
 * freelog文档：http://doc.freelog.com/
 * http://www.ruanyifeng.com/blog/2014/05/restful_api.html
 */












// import TokenService from './tokens'

 //事件接口测试




/***/ }),

/***/ "/mcc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fetch__ = __webpack_require__("7B+g");
/**
 * Policy service
 */



/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_0__fetch__["a" /* default */]('v1/resources/policies'));

/***/ }),

/***/ "2O5Q":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_properties__ = __webpack_require__("HSQo");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_properties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_properties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router__ = __webpack_require__("YaEn");



/* harmony default export */ __webpack_exports__["a"] = (function (Vue, options) {
  var items = void 0;

  __WEBPACK_IMPORTED_MODULE_1__router__["a" /* default */].afterEach(function (route) {
    items = route.matched.map(function (item) {
      return item.meta && item.meta.title || item.name || '';
    }).filter(function (v) {
      return !!v;
    });

    document.title = items.join(options.separator);
  });

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_properties___default()(Vue.prototype, {
    $title: {
      set: function set() {
        return function (title, fullname) {
          if (fullname) {
            document.title = title.toUpperCase();
          } else {
            // partial
            items[0] = title.toUpperCase();
            document.title = items.join(options.separator);
          }
        };
      }
    }
  });
});

/***/ }),

/***/ "2mV7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__token__ = __webpack_require__("PL7o");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user__ = __webpack_require__("bREw");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sidebar__ = __webpack_require__("6qrf");




/* harmony default export */ __webpack_exports__["a"] = ({ token: __WEBPACK_IMPORTED_MODULE_0__token__["a" /* default */], user: __WEBPACK_IMPORTED_MODULE_1__user__["a" /* default */], sidebar: __WEBPACK_IMPORTED_MODULE_2__sidebar__["a" /* default */] });

/***/ }),

/***/ "2peC":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fetch__ = __webpack_require__("7B+g");
/**
 * global resource service
 */



/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_0__fetch__["a" /* default */]('v1/resources/warehouse'));

/***/ }),

/***/ "6m4j":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fetch__ = __webpack_require__("7B+g");
/**
 * pagebuild service
 */



/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_0__fetch__["a" /* default */]('v1/nodes/pagebuilds'));

/***/ }),

/***/ "6qrf":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__("bOdI");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);


var _mutations, _actions;

var types = {
  TOGGLE_SIDEBAR: 'toggleSidebar',
  CLOSE_SIDEBAR: 'closeSidebar',
  HIDE_SIDEBAR: 'hideSidebar',
  OPEN_SIDEBAR: 'openSidebar'
};

var sidebar = {
  state: {
    showSidebar: true,
    openSidebar: true
  },

  mutations: (_mutations = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_mutations, types.HIDE_SIDEBAR, function (state) {
    state.showSidebar = false;
  }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_mutations, types.TOGGLE_SIDEBAR, function (state, shouldOpen) {
    if (shouldOpen === undefined) {
      state.openSidebar = !state.openSidebar;
    } else {
      state.openSidebar = shouldOpen;
    }
  }), _mutations),

  actions: (_actions = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_actions, types.HIDE_SIDEBAR, function (_ref, shouldOpen) {
    var commit = _ref.commit;

    commit(types.HIDE_SIDEBAR, shouldOpen);
  }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_actions, types.TOGGLE_SIDEBAR, function (_ref2, shouldOpen) {
    var commit = _ref2.commit;

    commit(types.TOGGLE_SIDEBAR, shouldOpen);
  }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_actions, types.CLOSE_SIDEBAR, function (_ref3) {
    var commit = _ref3.commit;

    commit(types.TOGGLE_SIDEBAR, false);
  }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_actions, types.OPEN_SIDEBAR, function (_ref4) {
    var commit = _ref4.commit;

    commit(types.TOGGLE_SIDEBAR, true);
  }), _actions)
};

/* harmony default export */ __webpack_exports__["a"] = (sidebar);

/***/ }),

/***/ "7B+g":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__("pFYg");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__ = __webpack_require__("woOf");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib__ = __webpack_require__("fl6T");




function Fetch(target, otherActions) {
  this.target = target;
  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()(this, otherActions);
}

Fetch.prototype = {
  get: function get(id, options) {
    var url = '/' + this.target;
    if ((typeof id === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(id)) === 'object') {
      options = id;
    } else if (id !== undefined) {
      url += '/' + id;
    }
    return __WEBPACK_IMPORTED_MODULE_2__lib__["a" /* axios */].get(url, options);
  },
  delete: function _delete(id, options) {
    var url = '/' + this.target + '/' + id;
    return __WEBPACK_IMPORTED_MODULE_2__lib__["a" /* axios */].delete(url, options);
  },
  post: function post(options) {
    var url = '/' + this.target;
    return __WEBPACK_IMPORTED_MODULE_2__lib__["a" /* axios */].post(url, options);
  },

  //更新全部
  put: function put(id, options) {
    var url = '/' + this.target + '/' + id;
    return __WEBPACK_IMPORTED_MODULE_2__lib__["a" /* axios */].put(url, options);
  },

  //更新部分
  patch: function patch(id, options) {
    var url = '/' + this.target + '/' + id;
    return __WEBPACK_IMPORTED_MODULE_2__lib__["a" /* axios */].patch(url, options);
  }
};

/* harmony default export */ __webpack_exports__["a"] = (Fetch);

/***/ }),

/***/ "7N2u":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fetch__ = __webpack_require__("7B+g");
/**
 * global resource service
 */



/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_0__fetch__["a" /* default */]('v1/contracts'));

/***/ }),

/***/ "7kJt":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__("//Fk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__("mtWM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__("IcnI");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_element_ui__ = __webpack_require__("zL8q");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_element_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_element_ui__);

/**
 * https://github.com/axios/axios
 * https://github.com/superman66/vue-axios-github
 */
//cors bug :https://github.com/axios/axios/issues/891





var instance = __WEBPACK_IMPORTED_MODULE_1_axios___default.a.create({
  baseURL: '//console.freelog.com/api/',
  timeout: 10e3,
  // crossdomain: true,
  // withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
});

instance.interceptors.request.use(function (config) {
  if (__WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */].getters.session.token) {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */].getters.session.token;
  }

  return config;
}, function (err) {
  return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject(err);
});

instance.interceptors.response.use(function (response) {
  var errorMsg;
  var data = response.data;

  if (response.status === 200 && data.ret === 0) {
    response.getData = function () {
      return data.data;
    };
    return response;
  } else {
    switch (response.status) {
      case 401:
        errorMsg = '未授权！';
        break;
      case 404:
        errorMsg = 'forbidden-禁止访问';
        break;
      case 500:
        errorMsg = '服务器内部异常，请稍后再试！';
        break;
      default:
        errorMsg = data.msg;
    }

    response.errorMsg = errorMsg;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject({ response: response });
  }
}, function (err) {
  err.response = err.response || {};
  return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject(err);
});

/* harmony default export */ __webpack_exports__["a"] = (instance);

/***/ }),

/***/ "8Msd":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "9Cx6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"content"}},[_c('router-view')],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "AmHV":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__axios__ = __webpack_require__("Kkag");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__title__ = __webpack_require__("2O5Q");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__("KLmV");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nprogress__ = __webpack_require__("d9CK");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__authorize__ = __webpack_require__("D7r4");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__filters__ = __webpack_require__("Axgz");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__error__ = __webpack_require__("Ueuj");
/**
 * vue plugins
 */









/* harmony default export */ __webpack_exports__["a"] = ({
  install: function install(Vue) {
    Object(__WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */])(Vue);
    Object(__WEBPACK_IMPORTED_MODULE_1__title__["a" /* default */])(Vue, { property: 'title', separator: ' » ' });
    Object(__WEBPACK_IMPORTED_MODULE_2__services__["a" /* default */])(Vue);
    Object(__WEBPACK_IMPORTED_MODULE_3__nprogress__["a" /* default */])(Vue);
    Object(__WEBPACK_IMPORTED_MODULE_4__authorize__["a" /* default */])(Vue);
    Object(__WEBPACK_IMPORTED_MODULE_5__filters__["a" /* default */])(Vue);
    Object(__WEBPACK_IMPORTED_MODULE_6__error__["a" /* default */])(Vue);
  }
});

/***/ }),

/***/ "Axgz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (Vue, options) {
  Vue.filter('fmtDate', function (value, frm) {
    if (!value) return '';
    var date = new Date(value);
    return date.toLocaleDateString();
  });
});

/***/ }),

/***/ "CY7m":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__("7+uW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_i18n__ = __webpack_require__("TXmL");



__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vue_i18n__["a" /* default */]);

// https://kazupon.github.io/vue-i18n/dynamic.html
/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_i18n__["a" /* default */]({
  locale: 'cn',
  messages: {
    // 'en': require('assets/locales/en'),
    // 'ja': require('assets/locales/ja'),
    // 'cn': require('assets/locales/cn')
  }
}));

/***/ }),

/***/ "D+Dq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fetch__ = __webpack_require__("7B+g");
/**
 * resource service
 */



/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_0__fetch__["a" /* default */]('v1/resources'));

/***/ }),

/***/ "D7r4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store__ = __webpack_require__("IcnI");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router__ = __webpack_require__("YaEn");



/* harmony default export */ __webpack_exports__["a"] = (function (Vue) {
  __WEBPACK_IMPORTED_MODULE_1__router__["a" /* default */].beforeHooks.unshift(function (to, from, next) {

    if (!to.meta.requiresAuth) return next();
    __WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */].dispatch('checkToken').then(function (valid) {
      if (valid) return next();

      next({ path: '/user/login', query: { redirect: to.fullPath } });
    });
  });
});

/***/ }),

/***/ "FSMt":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "GU7O":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"app-wrapper"},[_c('transition',{attrs:{"name":"fade"}},[_c('router-view',{staticClass:"wrapper"})],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "H79z":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return nodeItemRoute; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_views_layout_container_vue__ = __webpack_require__("pOb8");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views__ = __webpack_require__("fTIY");




var nodeItemRoute = {
  path: ':nodeId',
  component: __WEBPACK_IMPORTED_MODULE_0_views_layout_container_vue__["a" /* default */],
  hidden: true,
  meta: {
    requiresAuth: true,
    title: ':nodeId节点' //:key 可动态通过route.params上的k-v进行替换
  },
  redirect: '/node/:nodeId/presentables',
  children: [{
    path: 'resources',
    meta: {
      requiresAuth: true,
      title: '资源市场'
    },
    component: __WEBPACK_IMPORTED_MODULE_1__views__["m" /* nodeResourceList */]
  }, {
    path: 'pagebuilds',
    meta: {
      requiresAuth: true,
      title: 'PageBuild管理列表'
    },
    component: __WEBPACK_IMPORTED_MODULE_1__views__["p" /* pagebuildList */]
  }, {
    path: 'presentables',
    meta: {
      requiresAuth: true,
      title: 'presentables'
    },
    component: __WEBPACK_IMPORTED_MODULE_1__views__["r" /* presentablesView */]
  }, {
    path: 'presentable',
    meta: {
      requiresAuth: true,
      title: 'presentable'
    },
    hidden: true,
    component: __WEBPACK_IMPORTED_MODULE_0_views_layout_container_vue__["a" /* default */],
    redirect: '/node/:nodeId/presentables',
    children: [{
      path: 'detail',
      meta: {
        requiresAuth: true,
        title: 'presentable详情'
      },
      component: __WEBPACK_IMPORTED_MODULE_1__views__["q" /* presentableDetail */]
    }, {
      path: 'edit',
      meta: {
        requiresAuth: true,
        title: '编辑presentable'
      },
      component: __WEBPACK_IMPORTED_MODULE_1__views__["d" /* editPresentable */]
    }, {
      path: 'create',
      meta: {
        requiresAuth: true,
        title: '创建presentable'
      },
      component: __WEBPACK_IMPORTED_MODULE_1__views__["c" /* createPresentable */]
    }]
  }, {
    path: 'resource/detail',
    hidden: true,
    meta: {
      requiresAuth: true,
      title: '资源详情'
    },
    component: __WEBPACK_IMPORTED_MODULE_1__views__["u" /* resourceDetail */]
  }, {
    path: 'contract',
    hidden: true,
    meta: {
      requiresAuth: true,
      title: '节点策略操作'
    },
    component: __WEBPACK_IMPORTED_MODULE_0_views_layout_container_vue__["a" /* default */],
    children: [{
      path: 'create',
      meta: {
        requiresAuth: true,
        title: '创建合同'
      },
      component: __WEBPACK_IMPORTED_MODULE_1__views__["i" /* nodeContractCreator */]
    }]
  }]
};

/* harmony default export */ __webpack_exports__["a"] = ({
  path: 'node',
  meta: {
    requiresAuth: true,
    title: '节点管理系统'
  },
  component: __WEBPACK_IMPORTED_MODULE_0_views_layout_container_vue__["a" /* default */],
  redirect: '/node/list',
  children: [{
    path: 'create',
    meta: {
      requiresAuth: true,
      title: '创建节点'
    },
    component: __WEBPACK_IMPORTED_MODULE_1__views__["j" /* nodeCreator */]
  }, {
    path: 'edit',
    hidden: true,
    meta: {
      requiresAuth: true,
      title: '更新节点'
    },
    component: __WEBPACK_IMPORTED_MODULE_1__views__["n" /* nodeUpdator */]
  }, {
    path: 'list',
    meta: {
      requiresAuth: true,
      title: '节点列表'
    },
    component: __WEBPACK_IMPORTED_MODULE_1__views__["l" /* nodeList */]
  }, {
    path: 'detail',
    hidden: true,
    meta: {
      requiresAuth: true,
      title: '节点详情'
    },
    component: __WEBPACK_IMPORTED_MODULE_1__views__["k" /* nodeDetail */]
  }, nodeItemRoute]
});

/***/ }),

/***/ "IcnI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__("7+uW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__("NYxO");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__getters__ = __webpack_require__("UjVw");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules__ = __webpack_require__("2mV7");
/**
 * Vuex docs
 * https://vuex.vuejs.org/zh-cn/getting-started.html
 */






// import global from './global'

__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);

var strict = "production" !== 'production';
//
// Object.assign(modules, {
//   global
// })
var plugins = [];

var store = new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store({ getters: __WEBPACK_IMPORTED_MODULE_2__getters__["a" /* default */], modules: __WEBPACK_IMPORTED_MODULE_3__modules__["a" /* default */], strict: strict, plugins: plugins });

/* harmony default export */ __webpack_exports__["a"] = (store);

/***/ }),

/***/ "KLmV":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_properties__ = __webpack_require__("HSQo");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_properties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_properties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__("fZjL");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__("+vOg");




/* harmony default export */ __webpack_exports__["a"] = (function (Vue) {
  // alias
  var services = {};
  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(__WEBPACK_IMPORTED_MODULE_2__services__).forEach(function (name) {
    var sn = name.replace(/service/i, '');
    sn = sn[0].toLowerCase() + sn.substr(1);
    services[sn] = __WEBPACK_IMPORTED_MODULE_2__services__[name];
    services[name] = __WEBPACK_IMPORTED_MODULE_2__services__[name];
  });

  // mount the services to Vue
  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_properties___default()(Vue, {
    services: { get: function get() {
        return services;
      } }
  });

  // mount the services to Vue component instance
  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_properties___default()(Vue.prototype, {
    $services: { get: function get() {
        return services;
      } }
  });
});

/***/ }),

/***/ "Kkag":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_properties__ = __webpack_require__("HSQo");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_properties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_properties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib__ = __webpack_require__("fl6T");



/* harmony default export */ __webpack_exports__["a"] = (function (Vue) {
  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_properties___default()(Vue, {
    axios: { get: function get() {
        return __WEBPACK_IMPORTED_MODULE_1__lib__["a" /* axios */];
      } }
  });

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_properties___default()(Vue.prototype, {
    $axios: { get: function get() {
        return __WEBPACK_IMPORTED_MODULE_1__lib__["a" /* axios */];
      } }
  });
});

/***/ }),

/***/ "M93x":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__("xJD8");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6629241c_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__("GU7O");
function injectStyle (ssrContext) {
  __webpack_require__("8Msd")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6629241c_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "NHnr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__("7+uW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_element_ui__ = __webpack_require__("zL8q");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_element_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_element_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex_router_sync__ = __webpack_require__("9JMe");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex_router_sync___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vuex_router_sync__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__App__ = __webpack_require__("M93x");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_i18n_index__ = __webpack_require__("CY7m");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__router__ = __webpack_require__("YaEn");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__store__ = __webpack_require__("IcnI");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__plugins__ = __webpack_require__("AmHV");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_element_ui_lib_theme_chalk_index_css__ = __webpack_require__("tvR6");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_element_ui_lib_theme_chalk_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_element_ui_lib_theme_chalk_index_css__);











Object(__WEBPACK_IMPORTED_MODULE_2_vuex_router_sync__["sync"])(__WEBPACK_IMPORTED_MODULE_6__store__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__router__["a" /* default */], { moduleName: 'route' });

__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_element_ui___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_7__plugins__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].config.productionTip = false;

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_5__router__["a" /* default */],
  store: __WEBPACK_IMPORTED_MODULE_6__store__["a" /* default */],
  i18n: __WEBPACK_IMPORTED_MODULE_4__lib_i18n_index__["a" /* default */],
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_3__App__["a" /* default */] }
});

/***/ }),

/***/ "NY5L":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__("fl6T");
/**
 * 各种杂七杂八的接口
 */



var apis = {
  login: function login(options) {
    return __WEBPACK_IMPORTED_MODULE_0__lib__["a" /* axios */].post('/v1/passport/login', options);
  },
  logout: function logout(options) {
    return __WEBPACK_IMPORTED_MODULE_0__lib__["a" /* axios */].get('/v1/passport/logout', options);
  },
  resetPassword: function resetPassword(options) {
    return __WEBPACK_IMPORTED_MODULE_0__lib__["a" /* axios */].post('/v1/userinfos/resetPassword', options);
  }
};
/* harmony default export */ __webpack_exports__["a"] = (apis);

/***/ }),

/***/ "O2QG":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fetch__ = __webpack_require__("7B+g");
/**
 * Node service
 */



/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_0__fetch__["a" /* default */]('v1/nodes'));

/***/ }),

/***/ "P2Md":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fetch__ = __webpack_require__("7B+g");
/**
 * global resource service
 */



/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_0__fetch__["a" /* default */]('v1/contracts/contractRecords'));


/***/ }),

/***/ "PL7o":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__("bOdI");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__ = __webpack_require__("//Fk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__("+vOg");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user__ = __webpack_require__("bREw");



var _actions;




var types = {
  CHECK_TOKEN: 'checkToken',
  DELETE_TOKEN: 'deleteToken',
  CREATE_TOKEN: 'createToken'
};

var token = {
  state: {},

  mutations: {},

  actions: (_actions = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_actions, types.CHECK_TOKEN, function (_ref) {
    var commit = _ref.commit,
        getters = _ref.getters;

    return new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
      if (getters.session.user && getters.session.user.userId) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_actions, types.DELETE_TOKEN, function (_ref2) {
    var commit = _ref2.commit,
        getters = _ref2.getters;

    commit(__WEBPACK_IMPORTED_MODULE_3__user__["b" /* mutationTypes */].CHANGE_SESSION, { token: null });
  }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_actions, types.CREATE_TOKEN, function (_ref3, data) {
    var commit = _ref3.commit;

    return this.dispatch('userLogin', data);
  }), _actions)
};

/* harmony default export */ __webpack_exports__["a"] = (token);

/***/ }),

/***/ "Pms9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fetch__ = __webpack_require__("7B+g");
/**
 * global resource service
 */



/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_0__fetch__["a" /* default */]('v1/contracts/createPageBuildContracts'));

/***/ }),

/***/ "QGCz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__("fZjL");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);

//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'fl-container',
  beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {
    var toPath = to.fullPath;
    var params = this.$route.params;
    var matched = false;

    //适配多级嵌套参数解析
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(params).forEach(function (key) {
      var match = ':' + key;
      if (toPath.indexOf(match) > -1) {
        matched = true;
        toPath = toPath.replace(match, params[key]);
      }
    });
    matched ? next({ path: toPath }) : next();
  }
});

/***/ }),

/***/ "Rlrl":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_index__ = __webpack_require__("fTIY");


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'account',
  path: '/account',
  meta: {
    requiresAuth: true,
    title: '账户'
  },
  component: __WEBPACK_IMPORTED_MODULE_0__views_index__["g" /* layout */],
  redirect: '/account/settings',
  children: [{
    path: 'settings',
    meta: {
      requiresAuth: true,
      title: '账户设置'
    },
    component: __WEBPACK_IMPORTED_MODULE_0__views_index__["A" /* userSetting */]
  }]
});

/***/ }),

/***/ "UVIz":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "Ueuj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_properties__ = __webpack_require__("HSQo");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_properties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_properties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_element_ui__ = __webpack_require__("zL8q");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_element_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_element_ui__);



/* harmony default export */ __webpack_exports__["a"] = (function (Vue) {
  var Error = {
    showErrorMessage: function showErrorMessage(err) {
      if (!err) {
        return;
      }

      var msg = typeof err === 'string' ? err : err.response && err.response.errorMsg || err.message || err;
      __WEBPACK_IMPORTED_MODULE_1_element_ui__["Message"].error(msg);
    }
  };
  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_properties___default()(Vue.prototype, {
    $error: {
      get: function get() {
        return Error;
      }
    }
  });
});

/***/ }),

/***/ "UjVw":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

var getters = {
  session: function session(state) {
    return state.user.session;
  },
  sidebar: function sidebar(state) {
    return state.sidebar;
  },
  serverTime: function serverTime(state) {
    return +new Date();
  } //mock
};

/* harmony default export */ __webpack_exports__["a"] = (getters);

/***/ }),

/***/ "YaEn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__("7+uW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__("/ocq");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node__ = __webpack_require__("H79z");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__account__ = __webpack_require__("Rlrl");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__resource__ = __webpack_require__("uPg4");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__user__ = __webpack_require__("jnTS");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__event__ = __webpack_require__("xMAM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_views_layout_container_vue__ = __webpack_require__("pOb8");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__views_index__ = __webpack_require__("fTIY");
/**
 * meta 配置
 * hidden=true表示在导航上默认不展示
 * requiresAuth=true 表示需要身份验证即需要登录
 * scrollTop=true 切换路由时，页面滚动到顶部，默认是true
 */









__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);



var scrollBehavior = function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition;
  } else {
    var position = {};
    if (to.hash) {
      position.selector = to.hash;
    }

    if (to.meta.scrollToTop !== false) {
      position.x = 0;
      position.y = 0;
    }
    return position;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  mode: 'history',
  scrollBehavior: scrollBehavior,
  routes: [__WEBPACK_IMPORTED_MODULE_3__account__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__user__["a" /* default */], __WEBPACK_IMPORTED_MODULE_6__event__["a" /* default */], {
    path: '/resource/create/preview',
    meta: { requiresAuth: true, title: 'page build预览' },
    component: __WEBPACK_IMPORTED_MODULE_7_views_layout_container_vue__["a" /* default */],
    hidden: true,
    children: [{
      path: '/',
      hidden: true,
      meta: {
        requiresAuth: false,
        title: 'page build预览'
      },
      component: __WEBPACK_IMPORTED_MODULE_8__views_index__["o" /* pageBuildPreview */]
    }]
  }, {
    path: '/',
    meta: { requiresAuth: true, title: '首页' },
    component: __WEBPACK_IMPORTED_MODULE_8__views_index__["g" /* layout */],
    children: [__WEBPACK_IMPORTED_MODULE_4__resource__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__node__["a" /* default */], {
      path: 'about',
      hidden: true,
      meta: {
        requiresAuth: false,
        title: '关于freelog'
      },
      component: __WEBPACK_IMPORTED_MODULE_8__views_index__["a" /* aboutView */]
    }, {
      path: 'help',
      hidden: true,
      meta: {
        requiresAuth: false,
        title: '帮助中心'
      },
      component: __WEBPACK_IMPORTED_MODULE_8__views_index__["f" /* helpView */]
    }]
  }, {
    path: '*',
    meta: {
      requiresAuth: false,
      title: 'not found'
    },
    component: __WEBPACK_IMPORTED_MODULE_8__views_index__["g" /* layout */],
    children: [{
      name: '404',
      path: '',
      meta: {
        requiresAuth: false,
        title: '404'
      },
      component: __WEBPACK_IMPORTED_MODULE_8__views_index__["e" /* error */]
    }]
  }]
}));

/***/ }),

/***/ "ZDeK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fetch__ = __webpack_require__("7B+g");
/**
 * presentables service
 */



/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_0__fetch__["a" /* default */]('v1/presentables'));

/***/ }),

/***/ "bREw":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return mutationTypes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__("//Fk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__("bOdI");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign__ = __webpack_require__("woOf");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services__ = __webpack_require__("+vOg");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_index__ = __webpack_require__("fl6T");




var _actions;




var types = {
  GET_CURRENT_USER: 'getCurrentUser',
  CHANGE_SESSION: 'changeSession',
  USER_LOGIN: 'userLogin'
};

var user = {
  state: {
    session: __WEBPACK_IMPORTED_MODULE_4__lib_index__["c" /* storage */].get('user_session') || { user: {}, token: null }
  },

  mutations: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()({}, types.CHANGE_SESSION, function (state, data) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign___default()(state.session, data);
    __WEBPACK_IMPORTED_MODULE_4__lib_index__["c" /* storage */].set('user_session', state.session);
  }),

  actions: (_actions = {}, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_actions, types.GET_CURRENT_USER, function (_ref, userId) {
    var commit = _ref.commit;

    return __WEBPACK_IMPORTED_MODULE_3__services__["UserService"].get(userId).then(function (res) {
      commit(types.CHANGE_SESSION, { user: res.data });
      return res.data;
    });
  }), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_actions, types.CHANGE_SESSION, function (_ref2, data) {
    var commit = _ref2.commit;

    commit(types.CHANGE_SESSION, { user: data });
  }), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_actions, types.USER_LOGIN, function (_ref3, data) {
    var commit = _ref3.commit;


    return __WEBPACK_IMPORTED_MODULE_3__services__["OtherService"].login(data).then(function (res) {
      if (res.data.ret === 0 && res.data.errcode == 0) {
        var token = res.headers.authorization;

        commit(types.CHANGE_SESSION, { user: res.data.data, token: token });
        return res.data.data;
      } else {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject(res.data.msg);
      }
    });
  }), _actions)
};

/* harmony default export */ __webpack_exports__["a"] = (user);
var mutationTypes = types;

/***/ }),

/***/ "d9CK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_properties__ = __webpack_require__("HSQo");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_properties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_properties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__ = __webpack_require__("//Fk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__("YaEn");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib__ = __webpack_require__("fl6T");


/**
 * Inject NProgress into Vue component
 * Show progressbar when route & ajax
 */




/* harmony default export */ __webpack_exports__["a"] = (function (Vue) {

  __WEBPACK_IMPORTED_MODULE_2__router__["a" /* default */].beforeEach(function (to, from, next) {
    __WEBPACK_IMPORTED_MODULE_3__lib__["b" /* nprogress */].start();
    next();
  });
  __WEBPACK_IMPORTED_MODULE_2__router__["a" /* default */].afterEach(function (route) {
    __WEBPACK_IMPORTED_MODULE_3__lib__["b" /* nprogress */].done();
  });

  __WEBPACK_IMPORTED_MODULE_3__lib__["a" /* axios */].interceptors.request.use(function (config) {
    __WEBPACK_IMPORTED_MODULE_3__lib__["b" /* nprogress */].start();
    return config;
  });

  __WEBPACK_IMPORTED_MODULE_3__lib__["a" /* axios */].interceptors.response.use(function (response) {
    __WEBPACK_IMPORTED_MODULE_3__lib__["b" /* nprogress */].done();
    return response;
  }, function (err) {
    __WEBPACK_IMPORTED_MODULE_3__lib__["b" /* nprogress */].done();
    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.reject(err);
  });

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_properties___default()(Vue.prototype, {
    $nprogress: { get: function get() {
        return __WEBPACK_IMPORTED_MODULE_3__lib__["b" /* nprogress */];
      } }
  });
});

/***/ }),

/***/ "f9QZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nprogress_nprogress_css__ = __webpack_require__("UVIz");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nprogress_nprogress_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_nprogress_nprogress_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nprogress__ = __webpack_require__("Y81h");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nprogress___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nprogress__);
/**
 * Wrapper NProgress with style
 */




// // config
// nprogress.configure({
//   minimum: 0.1,
//   easing: 'ease',
//   speed: 50,
//   trickle: false,
//   trickleRate: 0.02,
//   trickleSpeed: 800,
//   showSpinner: false,
//   parent: '#content'
// })

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_nprogress___default.a);

/***/ }),

/***/ "fTIY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return layout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return error; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return login; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return signup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return resetPassword; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return userSetting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return resourceCreator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return resourceUpdator; });
/* unused harmony export resourcePolicyUpdator */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return resourceList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return resourceDetail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return resourceDetailEditor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return nodeCreator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return nodeUpdator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return nodeList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return nodeDetail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return nodeContractCreator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return nodeResourceList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createPresentable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return editPresentable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return presentableDetail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return pagebuildList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return aboutView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return helpView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return signmentView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return contractGuarantyView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return pageBuildPreview; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return presentablesView; });
//resolve => require.ensure([], () => resolve(require('xxx')), 'common') webpack静态语法分析
//import(/* webpackChunkName: "lodash" */ 'lodash');
//https://github.com/PanJiaChen/vue-element-admin/tree/master/src/router

var layout = function layout(resolve) {
  return __webpack_require__.e/* require.ensure */(5).then((function () {
    return resolve(__webpack_require__("4Lha"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var error = function error(resolve) {
  return __webpack_require__.e/* require.ensure */(5).then((function () {
    return resolve(__webpack_require__("qZa5"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};

//用户登录、注册、退出登录等
var login = function login(resolve) {
  return __webpack_require__.e/* require.ensure */(3).then((function () {
    return resolve(__webpack_require__("y0re"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var signup = function signup(resolve) {
  return __webpack_require__.e/* require.ensure */(3).then((function () {
    return resolve(__webpack_require__("1+Pj"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var resetPassword = function resetPassword(resolve) {
  return __webpack_require__.e/* require.ensure */(3).then((function () {
    return resolve(__webpack_require__("JPh7"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var userSetting = function userSetting(resolve) {
  return __webpack_require__.e/* require.ensure */(3).then((function () {
    return resolve(__webpack_require__("lojQ"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};

//资源管理
var resourceCreator = function resourceCreator(resolve) {
  return __webpack_require__.e/* require.ensure */(1).then((function () {
    return resolve(__webpack_require__("guEL"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};

var resourceUpdator = function resourceUpdator(resolve) {
  return __webpack_require__.e/* require.ensure */(6).then((function () {
    return resolve(__webpack_require__("jw7m"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var resourcePolicyUpdator = function resourcePolicyUpdator(resolve) {
  return __webpack_require__.e/* require.ensure */(6).then((function () {
    return resolve(__webpack_require__("jw7m"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var resourceList = function resourceList(resolve) {
  return __webpack_require__.e/* require.ensure */(1).then((function () {
    return resolve(__webpack_require__("Jjq5"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var resourceDetail = function resourceDetail(resolve) {
  return __webpack_require__.e/* require.ensure */(0).then((function () {
    return resolve(__webpack_require__("1K/3"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var resourceDetailEditor = function resourceDetailEditor(resolve) {
  return __webpack_require__.e/* require.ensure */(1).then((function () {
    return resolve(__webpack_require__("Reur"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};

//node管理
var nodeCreator = function nodeCreator(resolve) {
  return __webpack_require__.e/* require.ensure */(0).then((function () {
    return resolve(__webpack_require__("YxDi"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var nodeUpdator = function nodeUpdator(resolve) {
  return __webpack_require__.e/* require.ensure */(0).then((function () {
    return resolve(__webpack_require__("YxDi"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var nodeList = function nodeList(resolve) {
  return __webpack_require__.e/* require.ensure */(0).then((function () {
    return resolve(__webpack_require__("HC2d"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var nodeDetail = function nodeDetail(resolve) {
  return __webpack_require__.e/* require.ensure */(0).then((function () {
    return resolve(__webpack_require__("Q5It"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var nodeContractCreator = function nodeContractCreator(resolve) {
  return __webpack_require__.e/* require.ensure */(0).then((function () {
    return resolve(__webpack_require__("wgg2"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var nodeResourceList = function nodeResourceList(resolve) {
  return __webpack_require__.e/* require.ensure */(0).then((function () {
    return resolve(__webpack_require__("VaEZ"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var createPresentable = function createPresentable(resolve) {
  return __webpack_require__.e/* require.ensure */(2).then((function () {
    return resolve(__webpack_require__("lISv"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var editPresentable = function editPresentable(resolve) {
  return __webpack_require__.e/* require.ensure */(2).then((function () {
    return resolve(__webpack_require__("NJ0E"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};

var presentableDetail = function presentableDetail(resolve) {
  return __webpack_require__.e/* require.ensure */(2).then((function () {
    return resolve(__webpack_require__("rBJF"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};

var pagebuildList = function pagebuildList(resolve) {
  return __webpack_require__.e/* require.ensure */(7).then((function () {
    return resolve(__webpack_require__("rbfI"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};

var aboutView = function aboutView(resolve) {
  return __webpack_require__.e/* require.ensure */(4).then((function () {
    return resolve(__webpack_require__("oF1k"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var helpView = function helpView(resolve) {
  return __webpack_require__.e/* require.ensure */(4).then((function () {
    return resolve(__webpack_require__("yNDj"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};

//合同事件触发
var signmentView = function signmentView(resolve) {
  return __webpack_require__.e/* require.ensure */(4).then((function () {
    return resolve(__webpack_require__("5iA7"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
}; //signmentEvent
var contractGuarantyView = function contractGuarantyView(resolve) {
  return __webpack_require__.e/* require.ensure */(4).then((function () {
    return resolve(__webpack_require__("wrSy"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
}; //signmentEvent


var pageBuildPreview = function pageBuildPreview(resolve) {
  return __webpack_require__.e/* require.ensure */(1).then((function () {
    return resolve(__webpack_require__("vZM5"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
}; //signmentEvent

var presentablesView = function presentablesView(resolve) {
  return __webpack_require__.e/* require.ensure */(2).then((function () {
    return resolve(__webpack_require__("kQ4V"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};

/* unused harmony default export */ var _unused_webpack_default_export = ({
  layout: layout,
  login: login,
  signup: signup,
  resetPassword: resetPassword,
  userSetting: userSetting,
  aboutView: aboutView,
  helpView: helpView,
  error: error,
  resourceCreator: resourceCreator,
  resourceUpdator: resourceUpdator,
  resourcePolicyUpdator: resourcePolicyUpdator,
  resourceList: resourceList,
  resourceDetail: resourceDetail,
  pageBuildPreview: pageBuildPreview,
  nodeCreator: nodeCreator,
  nodeUpdator: nodeUpdator,
  nodeList: nodeList,
  nodeDetail: nodeDetail,
  nodeResourceList: nodeResourceList,
  nodeContractCreator: nodeContractCreator,
  createPresentable: createPresentable,
  editPresentable: editPresentable,
  presentableDetail: presentableDetail,
  pagebuildList: pagebuildList,
  presentablesView: presentablesView,
  contractGuarantyView: contractGuarantyView,
  signmentView: signmentView
});

/***/ }),

/***/ "fl6T":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__axios__ = __webpack_require__("7kJt");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__storage__ = __webpack_require__("kEHT");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nprogress__ = __webpack_require__("f9QZ");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__axios__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__storage__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__nprogress__["a"]; });
/**
 * Utils
 */







/***/ }),

/***/ "hVPn":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "jnTS":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_views_layout_container_vue__ = __webpack_require__("pOb8");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_index__ = __webpack_require__("fTIY");




/* harmony default export */ __webpack_exports__["a"] = ({
  path: '/user',
  meta: {
    requiresAuth: false,
    title: '节点管理系统'
  },
  component: __WEBPACK_IMPORTED_MODULE_0_views_layout_container_vue__["a" /* default */],
  redirect: '/user/login',
  children: [{
    path: 'login',
    meta: {
      requiresAuth: false,
      title: '用户登录'
    },
    component: __WEBPACK_IMPORTED_MODULE_1__views_index__["h" /* login */]
  }, {
    path: 'reset_pw',
    hidden: true,
    meta: {
      requiresAuth: false,
      title: '重置密码'
    },
    component: __WEBPACK_IMPORTED_MODULE_1__views_index__["s" /* resetPassword */]
  }, {
    path: 'signup',
    meta: {
      requiresAuth: false,
      title: '注册新账户'
    },
    component: __WEBPACK_IMPORTED_MODULE_1__views_index__["z" /* signup */]
  }]
});

/***/ }),

/***/ "kEHT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_store__ = __webpack_require__("Y4FN");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_store__);
/**
 * Storage
 * > - https://github.com/marcuswestin/store.js
 * > - https://github.com/marcuswestin/store.js#make-your-own-build
 // Example custom storage
 var storage = {
	name: 'myStorage',
	read: function(key) { ... },
	write: function(key, value) { ... },
	each: function(fn) { ... },
	remove: function(key) { ... },
	clearAll: function() { ... }
}
 var store = require('store').createStore(storage)
 */



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_store___default.a);

/***/ }),

/***/ "pOb8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_container_vue__ = __webpack_require__("QGCz");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_178219b1_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_container_vue__ = __webpack_require__("9Cx6");
function injectStyle (ssrContext) {
  __webpack_require__("FSMt")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_container_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_178219b1_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_container_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "pyoj":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "rRVi":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fetch__ = __webpack_require__("7B+g");
/**
 * global resource service
 */



/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_0__fetch__["a" /* default */]('v1/contracts/test'));

/***/ }),

/***/ "tvR6":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "uPg4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_views_layout_container_vue__ = __webpack_require__("pOb8");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views__ = __webpack_require__("fTIY");




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'resource',
  path: 'resource',
  meta: {
    requiresAuth: true,
    title: '资源管理系统'
  },
  component: __WEBPACK_IMPORTED_MODULE_0_views_layout_container_vue__["a" /* default */],
  redirect: '/resource/list',
  children: [{
    path: 'create',
    meta: {
      requiresAuth: true,
      title: '创建资源'
    },
    component: __WEBPACK_IMPORTED_MODULE_1__views__["t" /* resourceCreator */]
  }, {
    path: 'update',
    hidden: true,
    meta: {
      requiresAuth: true,
      title: '更新资源'
    },
    component: __WEBPACK_IMPORTED_MODULE_1__views__["x" /* resourceUpdator */]
  }, {
    path: 'list',
    meta: {
      requiresAuth: true,
      title: '我的资源'
    },
    component: __WEBPACK_IMPORTED_MODULE_1__views__["w" /* resourceList */]
  }, {
    path: 'detail',
    hidden: true,
    meta: {
      requiresAuth: true,
      title: '编辑资源详情'
    },
    component: __WEBPACK_IMPORTED_MODULE_1__views__["v" /* resourceDetailEditor */]
  }]
});

/***/ }),

/***/ "xJD8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_reset_css__ = __webpack_require__("pyoj");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_reset_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__styles_reset_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_global_less__ = __webpack_require__("hVPn");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_global_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__styles_global_less__);
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'app'
});

/***/ }),

/***/ "xMAM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_index__ = __webpack_require__("fTIY");


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'event',
  path: '/event',
  meta: {
    requiresAuth: true,
    title: '事件处理'
  },
  component: __WEBPACK_IMPORTED_MODULE_0__views_index__["g" /* layout */],
  children: [{
    path: 'signment',
    meta: {
      requiresAuth: true,
      title: '签署协议'
    },
    component: __WEBPACK_IMPORTED_MODULE_0__views_index__["y" /* signmentView */]
  }, {
    path: 'contractGuaranty',
    meta: {
      requiresAuth: true,
      title: '支付保证金'
    },
    component: __WEBPACK_IMPORTED_MODULE_0__views_index__["b" /* contractGuarantyView */]
  }]
});

/***/ }),

/***/ "ye8Q":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fetch__ = __webpack_require__("7B+g");
/**
 * Users service
 */



/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_0__fetch__["a" /* default */]('v1/userinfos'));

/***/ })

},["NHnr"]);
//# sourceMappingURL=app.589b8043845df8b913b1.js.map