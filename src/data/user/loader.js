import { UserService } from '@/services'
import { createLoader, createCacheLoaders } from '@/lib/utils'
import { cookieStore } from '@/lib/storage'

function loadDetail(userId) {
  return UserService.get(parseInt(userId)).then(res => res.getData())
}


function loadLoginUserInfo() {
  const authInfo = cookieStore.get('authInfo')
  if (!authInfo) {
    return {}
  }
  const jwt = authInfo.split('.')
  let userInfo = atob(jwt[1])
  try {
    userInfo = JSON.parse(userInfo)
  } catch (err) {
    console.error(err)
    userInfo = {}
  }
  return userInfo
}

const onloadUserInfo = createCacheLoaders(loadDetail)
export {
  loadDetail,
  onloadUserInfo,
  loadLoginUserInfo
}

export default {
  loadDetail,
  onloadUserInfo
}
