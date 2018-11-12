import store from '../store'
import router from '../router'
import {gotoLogin} from '../lib/utils'
export default (Vue) => {
  router.beforeHooks.unshift((to, from, next) => {
    if (!to.meta.requiresAuth) {
      return next()
    }
    store.dispatch('checkToken')
      .then((valid) => {
        if (valid) return next()
        gotoLogin(location.href)
      })
  })
}
