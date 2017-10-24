import store from '../store'
import router from '../router'

export default Vue => {
  router.beforeHooks.unshift((to, from, next) => {

    if (!to.meta.requiresAuth) return next()

    store.dispatch('checkToken')
      .then(valid => {
        if (valid) return next()

        next({ path: '/user/login', query: { redirect: to.fullPath } })
      })
  })
}
