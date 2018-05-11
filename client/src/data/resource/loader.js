import {ResourceService} from '@/services'

function loadDetail(resourceId) {
  return ResourceService.get(resourceId).then((res) => {
    if (res.data.errcode === 0) {
      return res.getData()
    } else {
      return Promise.reject(res.data)
    }
  })
}

export {
  loadDetail
}

export default {
  loadDetail
}
