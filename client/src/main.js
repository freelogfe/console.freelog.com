import Vue from 'vue'
import ElementUI from 'element-ui'
import {sync} from 'vuex-router-sync'
import App from './App'
import i18n from './lib/i18n/index'
import router from './router'
import store from './store'
import plugins from './plugins'

import 'element-ui/lib/theme-chalk/index.css'
import './styles/element-ui.less'

sync(store, router, {moduleName: 'route'})

Vue.use(ElementUI);
Vue.use(plugins)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n: i18n,
  template: '<App/>',
  components: {App}
})
