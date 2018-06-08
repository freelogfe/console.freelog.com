import {UserService} from '@/services'
import {createLoader, createCacheLoaders} from '@/lib/utils'

function loadDetail(userId) {
  return UserService.get(parseInt(userId)).then((res) => {
    return res.getData()
  })


}

const onloadUserInfo  = createCacheLoaders(loadDetail)
export {
  loadDetail,
  onloadUserInfo
}

export default {
  loadDetail,
  onloadUserInfo
}
