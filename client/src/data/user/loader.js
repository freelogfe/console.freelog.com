import {UserService} from '@/services'

function loadUserInfo(userId) {
  return UserService.get(userId).then((res) => {
    return res.getData()
  })
}

export {
  loadUserInfo
}

export default {
  loadUserInfo
}
