import {OtherService} from '@/services'

const types = {
  CHECK_TOKEN: 'checkToken'
};

const token = {
  state: {},

  mutations: {},

  actions: {
    [types.CHECK_TOKEN]({commit, getters}) {
      return new Promise((resolve, reject) => {
        var ignore = (location.hostname === 'localhost') && (process.env.NODE_ENV === 'development')
        if (ignore) {
          resolve(false)
        } else if (getters.session.user && getters.session.user.userId) {
          resolve(true)
        } else {
          this.dispatch('getCurrentUser').then((data) => {
            resolve(!!data)
          })
        }
      })
    }
  }
}

export default token
