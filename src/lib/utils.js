import { cloneDeep } from 'lodash'

function createLoader(loader) {
  let loading = false
  const handles = []
  let value

  return function (callback) {
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
  return function (params) {
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
      loader = loaders[id] = createLoader((callback) => {
        loaderFn(params).then(callback)
      })
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
  return function () {
    return new Promise((resolve) => {
      handler(resolve)
    })
  }
}

function loopForBreak(array, fn) {
  let flag = false
  for (let i = 0; i < array.length; i++) {
    const item = array[i]
    if (fn(item, i)) {
      flag = true
      break
    }
  }

  return flag
}


function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '');
}

function cssSupports(prop, value) {
  if (!value) {
    return camelize(prop) in document.body.style
  } else if (typeof CSS.supports === 'function') {
    return CSS.supports(prop, value)
  } else {
    var $el = document.createElement('div');
    $el.style[prop] = value;
    return $el.style[prop] === value;
  }
}

export {
  createLoader,
  createCacheLoaders,
  promisifyLoader,
  loopForBreak,
  cssSupports
}


export default {
  createLoader,
  createCacheLoaders,
  promisifyLoader,
  loopForBreak
}
