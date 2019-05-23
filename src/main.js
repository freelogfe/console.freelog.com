import Vue from 'vue'
import ElementUI from 'element-ui'
import {sync} from 'vuex-router-sync'
import 'element-ui/lib/theme-chalk/index.css'
import VueLazyload from 'vue-lazyload'

import App from './App.vue'
import i18n from './lib/i18n/index'
import router from './router'
import store from './store'
import plugins from './plugins'

import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

import './styles/element-ui.less'

sync(store, router, {moduleName: 'route'})

function initEnv() {
  const win = window
  // const isTest = /\.testfreelog\.com$/.test(win.location.host)
  // const mainDomain = isTest ? 'testfreelog.com' : 'freelog.com'

  var mainDomain = window.location.host

  const isTestFreelog = _isTestFreelog(mainDomain)
  const isLocalhost = _isLocalhost(mainDomain)

  if(isTestFreelog) {
    mainDomain = `test${mainDomain}`
  }else if(isLocalhost) {
    mainDomain = `testfreelog.com`
  }

  win.g_freelog = win.g_freelog || {}
  win.g_freelog.Env = win.g_freelog.Env || {}

  Object.assign(win.g_freelog.Env, {
    isTest: isTestFreelog || isLocalhost,
    mainDomain
  })

  win.g_freelog.Env.qiOrigin = win.location.protocol + '//qi.' + mainDomain
  document.body.classList.add(win.g_freelog.Env.language || navigator.language)
}


// function initEnv(FreelogApp) {
//   var mainDomain = window.location.host
//
//   const isTestFreelog = _isTestFreelog(mainDomain)
//   const isLocalhost = _isLocalhost(mainDomain)
//
//   if(isTestFreelog) {
//     mainDomain = `test${mainDomain}`
//   }else if(isLocalhost) {
//     mainDomain = `testfreelog.com`
//   }
//   const qiOrigin = `${location.protocol}//qi.${mainDomain}`
//
//   FreelogApp.Env = {
//     isTest: isTestFreelog || isLocalhost,
//     mainDomain,
//     qiOrigin
//   }
//
//   const authInfo = window.__auth_info__
//   if (authInfo) {
//     Object.assign(FreelogApp.Env, {
//       nodeId: authInfo.__auth_node_id__ || '',
//       userId: authInfo.__auth_user_id__ || ''
//     })
//   }
//
//   FreelogApp.$loading = { show(){}, hide(){} }
// }

function _isTestFreelog(mainDomain) {
  return new RegExp(`\\.test${mainDomain}$`).test(location.host)
}

function _isLocalhost(mainDomain) {
  return /^localhost/.test(mainDomain) || /^127\.0\.0\.1/.test(mainDomain)
}


initEnv()
Vue.use(ElementUI, {locale: i18n.locale === 'en' ? enLocale : zhLocale})

Vue.use(plugins)
Vue.use(VueLazyload, {
  lazyComponent: true,
  observer: true
})

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: {App}
})
