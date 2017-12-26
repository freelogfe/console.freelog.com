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
      commit(types.CHANGE_SESSION, {user: data});
    },
    [types.USER_LOGIN]({commit}, data) {

      return OtherService.login(data).then(res => {
        if (res.data.ret === 0 && res.data.errcode == 0) {
          const token = res.headers.authorization;
          //未能解决跨域获取header或者cookie的问题
          // const token = 'Bearer eyJhbGciOiJSU0EtU0hBMjU2IiwidHlwIjoiSldUIn0=.eyJ1c2VySWQiOjEwMDI0LCJ1c2VyTmFtZSI6IiIsIm5pY2tuYW1lIjoicGhpbHlvdW5nIiwiZW1haWwiOiIiLCJtb2JpbGUiOiIxMzQ4MDEyNTgxMCIsInRva2VuU24iOiJhM2ExYWJiZmQwYTU0MWU5ODUzMDczZTVhYjAxMzJmZiIsInVzZXJSb2xlIjoxLCJzdGF0dXMiOjEsImNyZWF0ZURhdGUiOiIyMDE3LTEwLTI1VDEyOjI3OjMyLjAwMFoiLCJ1cGRhdGVEYXRlIjoiMjAxNy0xMS0wMVQxNjoyNDoyMC4wMDBaIiwiZXhwIjoxNTEyNTQ4MzI4LCJpYXQiOjE1MTEyNTIzMjgsImp0aSI6ImEzYTFhYmJmZDBhNTQxZTk4NTMwNzNlNWFiMDEzMmZmIiwiaXNzIjoiRlJFRS1MT0ctSURFTlRJVFktUFJPVklERVIiLCJzdWIiOiJ1c2VyIiwiYXVkIjoiZnJlZUxvZ1dlYlNpdGUifQ==.5b947de0d46cadebfc1c9fca13fbeeaab76c6f3edf2cbce480d640855dbafdfa4b297215ce835a253949b1dde4f389d4d4e774372f1fa039e9cc8b4f8dacfbf53456de32b1301cbe47f8b9877b5508c0e58a656256bf88254d4786f4fc1b748c966b0e8507db4be234f3d90b0c72edd83ea67b8503fa1b3d94966492ae42e08d'  //暂行办法

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
