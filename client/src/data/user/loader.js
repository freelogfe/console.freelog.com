import {UserService} from '@/services'
import {createLoader, createCacheLoaders} from '@/lib/utils'
import {cookieStore} from '@/lib/storage'

function loadDetail(userId) {
  return UserService.get(parseInt(userId)).then((res) => {
    return res.getData()
  })
}


function loadLoginUserInfo() {
  var authInfo = cookieStore.get('authInfo')
  if (!authInfo) {
    return {}
  }
  var jwt = authInfo.split('.')
  var userInfo = atob(jwt[1])
  try {
    userInfo = JSON.parse(userInfo)
  } catch (err) {
    console.error(err)
    userInfo = {}
  }
  return userInfo
}

const onloadUserInfo  = createCacheLoaders(loadDetail)
export {
  loadDetail,
  onloadUserInfo,
  loadLoginUserInfo
}

export default {
  loadDetail,
  onloadUserInfo
}
