/**
 * https://github.com/axios/axios
 * https://github.com/superman66/vue-axios-github
 */
// cors bug :https://github.com/axios/axios/issues/891

import axios from 'axios'
import store from '@/store'
import {gotoLogin} from "./utils";

const instance = axios.create({
  baseURL: window.location.origin.replace('console','qi'),
  timeout: 1e4, //10s
  withCredentials: true,
  headers: {
    // 'X-Requested-With': 'XMLHttpRequest'
  }
})

instance.interceptors.request.use(
  (config) => {
    if (store.getters.session && store.getters.session.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = store.getters.session.token
    }

    return config
  },
  err => Promise.reject(err)
)


instance.interceptors.response.use(
  (response) => {
    let errorMsg
    const data = response.data

    if ([28, 30].indexOf(data.errcode) > -1) {
      //清除已过期cookie
      store.dispatch('userLogout').then(()=>{
        gotoLogin(location.href)
      })
      // replace执行存在延迟
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(response)
        }, 5e2)
      })
    } else if (response.status === 200 && (!data.ret || data.ret === 0)) {
      response.getData = () => {
        if (data.hasOwnProperty('errcode') && data.errcode !== 0) {
          throw new Error(data)
        }
        return data.data || data
      }
      return response
    }
    switch (response.status) {
      case 401:
        errorMsg = '未授权！'
        break
      case 404:
        errorMsg = 'forbidden-禁止访问'
        break
      case 500:
        errorMsg = '服务器内部异常，请稍后再试！'
        break
      default:
        errorMsg = data.msg
    }

    response.errorMsg = errorMsg
    return Promise.reject({ response })
  },
  (err) => {
    err.response = err.response || {}
    return Promise.reject(err)
  }
)

export default instance
