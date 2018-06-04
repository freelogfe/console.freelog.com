import {ResourceService} from '@/services'
import {createLoader} from '@/lib/utils'

var loaders = {}


function loadDetail(resourceId) {
  return ResourceService.get(resourceId).then((res) => {
    if (res.data.errcode === 0) {
      return res.getData()
    } else {
      return Promise.reject(res.data)
    }
  })
}

function onloadResourceDetail(resourceId) {
  var loader = loaders[resourceId];
  if (!loader) {
    loader = loaders[resourceId] = createLoader(function (callback) {
      loadDetail(resourceId).then(callback)
    })
  }

  return new Promise((resolve) => {
    loader(function (data) {
      resolve(data)
    })
  })
}

export {
  loadDetail,
  onloadResourceDetail
}

export default {
  loadDetail,
  onloadResourceDetail
}
