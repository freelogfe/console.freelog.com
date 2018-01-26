import {UserService, OtherService} from '../../services'
import {storage, axios} from '@/lib/index'
import router from '@/router'

const types = {
  GET_CURRENT_USER: 'getCurrentUser',
  CHANGE_SESSION: 'changeSession',
  USER_LOGIN: 'userLogin',
  USER_LOGOUT: 'userLogout'
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
      var promise
      if (userId) {
        promise = UserService.get(userId)
      } else {
        promise = axios.get('/v1/userinfos/current')
      }
      return promise.then(res => {
        if (res.data.errcode === 0) {
          commit(types.CHANGE_SESSION, {user: res.data.data});
        }
        return res.data.data
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
    },
    [types.USER_LOGOUT]({commit}, redirect) {
      redirect = redirect || '/'
      return OtherService.logout().then(res => {
        if (res.data.ret === 0 && res.data.errcode == 0) {
          commit('deleteNode')
          setTimeout(() => {
            router.replace({path: '/user/login', query: {redirect: redirect}})
          }, 20)
        } else {
          return Promise.reject(res.data.msg);
        }
      });
    }
  }
}

export default user;
export const mutationTypes = types;
