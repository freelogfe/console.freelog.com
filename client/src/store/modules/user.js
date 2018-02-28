import {UserService, OtherService} from '../../services'
import {storage, axios} from '@/lib/index'
import {cookieStore, sessionStore} from '@/lib/storage'

const types = {
  GET_CURRENT_USER: 'getCurrentUser',
  CHANGE_SESSION: 'changeSession',
  DELETE_SESSION: 'deleteSession',
  USER_LOGIN: 'userLogin',
  USER_LOGOUT: 'userLogout',
  CHECK_USER_SESSION: 'checkUserSession'
}

const user = {
  state: {
    session: {user: {}, token: null}, // sessionStore.get('user_session')
  },

  mutations: {
    [types.CHANGE_SESSION](state, data) {
      Object.assign(state.session, data);
      sessionStore.set('user_session', state.session);
    },
    [types.DELETE_SESSION](state) {
      state.session = {user: {}, token: null}
      sessionStore.remove('user_session');
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
    [types.CHECK_USER_SESSION]({commit, getters}) {
      var authInfo = cookieStore.get('authInfo')
      return new Promise((resolve) => {
        if (!authInfo) {
          resolve(false)
        } else {
          var jwt = authInfo.split('.')
          var userInfo = atob(jwt[1])
          try {
            userInfo = JSON.parse(userInfo)
          } catch (err) {
            console.error(err)
            userInfo = {}
          }
          resolve(!(!getters.session || getters.session.user.userId !== userInfo.userId))
        }
      })
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
    [types.USER_LOGOUT]({commit}) {
      return OtherService.logout().then(res => {
        if (res.data.ret === 0 && res.data.errcode == 0) {
          commit(types.DELETE_SESSION)
          commit('deleteNode')
        } else {
          return Promise.reject(res.data.msg);
        }
      });
    }
  }
}

export default user;
export const mutationTypes = types;
