import {UserService} from '@/services'
import {createLoader} from '@/lib/utils'


var loaders = {}

function loadDetail(userId) {
  return UserService.get(userId).then((res) => {
    return res.getData()
  })


}

function onloadUserInfo(userId) {
  var loader = loaders[userId];
  if (!loader) {
    loader = loaders[userId] = createLoader(function (callback) {
      loadDetail(userId).then(callback)
    })
  }

  return new Promise((resolve) => {
    loader(function (info) {
      resolve(info)
    })
  })
}

export {
  loadDetail,
  onloadUserInfo
}

export default {
  loadDetail,
  onloadUserInfo
}
