import {cloneDeep} from 'lodash'

function createLoader(loader) {
  let loading = false
  const handles = []
  let value

  return function lazyLoader(callback) {
    if (value) {
      callback(value)
    } else if (loading) {
      handles.push(callback)
    } else {
      loading = true
      handles.push(callback)
      loader((v) => {
        value = v
        let h
        // eslint-disable-next-line
        while ((h = handles.shift())) {
          h(v)
        }
      })
    }
  }
}

// 多个缓存loader的创建
function createCacheLoaders(loaderFn, shouldCloned) {
  const loaders = {}
  return function cacheLoaders(params) {
    let id
    if (typeof params !== 'string') {
      try {
        id = JSON.stringify(params)
      } catch (e) {
        // todo 确保缓存的唯一性
      }
    } else {
      id = params
    }

    if (!id) {
      return loaderFn(id)
    }

    let loader = loaders[id]
    if (!loader) {
      loader = createLoader((callback) => {
        loaderFn(params).then(callback)
      })

      loaders[id] = loader
    }

    return new Promise((resolve) => {
      loader((data) => {
        resolve(shouldCloned ? cloneDeep(data) : data)
      })
    })
  }
}


function promisifyLoader(loader) {
  const handler = createLoader(loader)
  return function promiseLoader() {
    return new Promise((resolve) => {
      handler(resolve)
    })
  }
}

function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
}

function cssSupports(prop, value) {
  if (!value) {
    return camelize(prop) in document.body.style
  } else if (typeof CSS.supports === 'function') {
    return CSS.supports(prop, value)
  }
  const $el = document.createElement('div')
  $el.style[prop] = value
  return $el.style[prop] === value
}

function isSafeUrl(url) {
  const reg = /^.+\.(test)?freelog\.com$/

  try {
    const obj = new URL(url) // 正确的链接检测
    if (reg.test(obj.hostname)) {
      return true
    }
  } catch (e) {
    // path型链接检测
    if ((/^\/[^/]+/.test(url))) {
      return true
    }
  }

  return false
}

function gotoLogin(redirect) {
  const loginPath = '/login'
  console.log(' --- ',  loginPath, window.location.pathname)
  if (window.location.pathname === loginPath) {
    return
  }

  let loginUrl = `${window.location.origin.replace('console', 'www')}${loginPath}`

  if (isSafeUrl(redirect)) {
    loginUrl += `?redirect=${encodeURIComponent(redirect)}`
  }

  window.location.href = loginUrl
}


function isFunction(fn) {
  return typeof fn === 'function'
}


export const checkResponse = (res) => {
  const {ret, errcode} = res.data
  return ret === 0 && errcode === 0
}

export {
  createLoader,
  createCacheLoaders,
  promisifyLoader,
  cssSupports,
  gotoLogin,
  isSafeUrl,
  isFunction
}


export default {
  createLoader,
  createCacheLoaders,
  promisifyLoader,
  gotoLogin
}
