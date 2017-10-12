/**
 * https://github.com/axios/axios
 * https://github.com/superman66/vue-axios-github
 */

import axios from 'axios'
import store from '@/store'

const instance = axios.create({
  baseURL: '//api.freelog.com/',
  timeout: 3000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
});

instance.interceptors.request.use(config => {
    if (store.getters.session.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `Bearer ${store.getters.session.token}`;
    }

    return config;
  },
  err => {
    return Promise.reject(err);
  });

export default instance
