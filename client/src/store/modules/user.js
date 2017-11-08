import {UserService, OtherService} from '../../services'
import {storage} from '@/lib/index'

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
      commit(types.CHANGE_SESSION, {user: data});
    },
    [types.USER_LOGIN]({commit}, data) {

      return OtherService.login(data).then(res => {

        if (res.data.ret === 0) {

          //const token = res.headers.authorization;
          const token = 'Bearer eyJhbGciOiJSU0EtU0hBMjU2IiwidHlwIjoiSldUIn0=.eyJ1c2VySWQiOjEwMDI0LCJ1c2VyTmFtZSI6IiIsIm5pY2tuYW1lIjoicGhpbHlvdW5nIiwiZW1haWwiOiIiLCJtb2JpbGUiOiIxMzQ4MDEyNTgxMCIsInRva2VuU24iOiJhM2ExYWJiZmQwYTU0MWU5ODUzMDczZTVhYjAxMzJmZiIsInVzZXJSb2xlIjoxLCJzdGF0dXMiOjEsImNyZWF0ZURhdGUiOiIyMDE3LTEwLTI1VDEyOjI3OjMyLjAwMFoiLCJ1cGRhdGVEYXRlIjoiMjAxNy0xMS0wMVQxNjoyNDoyMC4wMDBaIiwiZXhwIjoxNTExMzQ0MDcxLCJpYXQiOjE1MTAwNDgwNzEsImp0aSI6ImEzYTFhYmJmZDBhNTQxZTk4NTMwNzNlNWFiMDEzMmZmIiwiaXNzIjoiRlJFRS1MT0ctSURFTlRJVFktUFJPVklERVIiLCJzdWIiOiJ1c2VyIiwiYXVkIjoiZnJlZUxvZ1dlYlNpdGUifQ==.bca2f9c3d7305669824e86847a7e664996895794ca160d626c89e03051709c6f0d13977f5c4d67c676819ba8ae2ce3e673cf74801fede56c1db752899d85fdf1ba126d9ae2087bf62e182d31f0088854d075e3bcf7f628f963fa6eb46e903f75f78d8540315cdb25ebea991bf9faf9e7a437b3d77f07d42e93a57da78dd64dfd'  //暂行办法

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
