import {UserService, OtherService} from '../../services'
import {storage} from '@/lib/index'


const types = {
  GET_CURRENT_USER: 'getCurrentUser',
  CHANGE_SESSION: 'changeSession',
  USER_LOGIN: 'userLogin'
}

const user = {
  state: {
    session: storage.get('user_session') || {user: {}, token: null},
  },

  mutations: {
    [types.CHANGE_SESSION](state, data) {
      Object.assign(state.session, data);
      storage.set('user_session', state.session);
    }
  },

  actions: {
    [types.GET_CURRENT_USER]({commit}, userId) {
      return UserService.get(userId)
        .then(res => {
          commit(types.CHANGE_SESSION, {user: res.data});
          return res.data
        })
    },
    [types.CHANGE_SESSION]({commit}, data) {
      commit(types.CHANGE_SESSION, data);
    },
    [types.USER_LOGIN]({commit}, data) {
      return OtherService.login(data).then(res => {
        if (res.data.ret === 0 && res.data.errcode == 0) {
          const token = res.headers.authorization;
          commit(types.CHANGE_SESSION, {user: res.data.data, token: token});
          return res.data.data
        } else {
          return Promise.reject(res.data.msg);
        }
      });
    }
  }
}

export default user;
export const mutationTypes = types;
