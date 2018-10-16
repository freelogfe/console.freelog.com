import {cloneDeep} from 'lodash'

function createLoader(loader) {
  var loading = false;
  var handles = [];
  var value;

  return function (callback) {
    if (value) {
      callback(value)
    } else if (loading) {
      handles.push(callback)
    } else {
      loading = true;
      handles.push(callback)
      loader(function (v) {
        value = v;
        let h;
        while ((h = handles.shift())) {
          h(v)
        }
      })
    }
  }
}

//多个缓存loader的创建
function createCacheLoaders(loaderFn, shouldCloned) {
  var loaders = {}
  return function (params) {
    let id;
    if (typeof params !== 'string') {
      try {
        id = JSON.stringify(params)
      } catch (e) {
        //todo 确保缓存的唯一性
      }
    } else {
      id = params
    }

    if (!id) {
      return loaderFn(id)
    }

    let loader = loaders[id];
    if (!loader) {
      loader = loaders[id] = createLoader(function (callback) {
        loaderFn(params).then(callback)
      })
    }

    return new Promise((resolve) => {
      loader(function (data) {
        resolve(shouldCloned ? cloneDeep(data) :data)
      })
    })
  }
}


function promisifyLoader(loader) {
  var handler = createLoader(loader)
  return function () {
    return new Promise((resolve) => {
      handler(resolve)
    })
  }
}

function loopForBreak(array, fn) {
  var flag = false
  for (var i = 0; i < array.length; i++) {
    let item = array[i]
    if (fn(item, i)) {
      flag = true
      break;
    }
  }

  return flag
}

export {
  createLoader,
  createCacheLoaders,
  promisifyLoader,
  loopForBreak
}


export default {
  createLoader,
  createCacheLoaders,
  promisifyLoader,
  loopForBreak
}
