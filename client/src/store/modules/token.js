import {TokenService} from '@/services'

import {mutationTypes} from "./user";

const types = {
  CHECK_TOKEN: 'checkToken',
  DELETE_TOKEN: 'deleteToken',
  CREATE_TOKEN: 'createToken'
};

const token = {
  state: {},

  mutations: {},

  actions: {
    [types.CHECK_TOKEN]({commit, getters}){
      return new Promise((resolve, reject) => {
        if (!getters.session.token) {
          return resolve(false)
        }

        TokenService.get()
          .then(res => resolve(true))
          .catch(err => {
            console.error(err)
            commit(mutationTypes.CHANGE_SESSION, {token: null})
            resolve(false)
          })
      })
    },
    [types.DELETE_TOKEN]({commit, getters}) {
      return TokenService.delete(getters.session.token)
        .then(res => {
          commit(mutationTypes.CHANGE_SESSION, {token: null})
        })
    },
    [types.CREATE_TOKEN]({commit}, data) {
      return TokenService.post(data)
        .then(res => {
          const token = res.headers.authorization;
          commit(mutationTypes.CHANGE_SESSION, {token: token})
        })
    }
  }
}

export default token
