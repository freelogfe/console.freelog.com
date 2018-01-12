/**
 * 各种杂七杂八的接口
 */

import {axios} from '@/lib'

const apis = {
  login: function (options) {
    return axios.post('/v1/passport/login', options)
  },
  logout: function (options) {
    return axios.get('/v1/passport/logout', options)
  },
  resetPassword: function (options) {
    return axios.post('/v1/userinfos/resetPassword', options)
  },
  register: function (options) {
    return axios.post('/v1/userinfos/register', options)
  }
}
export default apis
