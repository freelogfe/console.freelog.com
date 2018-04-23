import {UserService} from '@/services'

function loadDetail(userId) {
  return UserService.get(userId).then((res) => {
    return res.getData()
  })
}

export {
  loadDetail
}

export default {
  loadDetail
}
