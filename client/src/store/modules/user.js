import {UserService} from '../../services'
import {storage} from '@/lib'

const types = {
  GET_CURRENT_USER: 'getCurrentUser',
  CHANGE_SESSION: 'changeSession',
  USER_LOGIN: 'userLogin'
}

const user = {
  state: {
    session: storage.get('user_session') || {user: {}, token: {}},
  },

  mutations: {
    [types.CHANGE_SESSION](state, data){
      Object.assign(state.session, data);
      storage.set('user_session', state.session);
    }
  },

  actions: {
    // 用户名登录
    [types.GET_CURRENT_USER]({commit}) {
      return UserService.get()
        .then(res => {
          commit(types.CHANGE_SESSION, {user: res.data});
          return res.data
        })
    },
    [types.USER_LOGIN]({commit}, data) {
      return UserService.get({
        params: data
      })
        .then(res => {
          if (res.data.ret === 0) {
            commit(types.CHANGE_SESSION, {user: res.data.data});
            return res.data.data
          } else {
            return Promise.reject('登录失败');
          }
        })
    }
  }
}

export default user;
export const mutationTypes = types;
