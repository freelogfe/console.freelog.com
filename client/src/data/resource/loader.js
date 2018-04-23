import {ResourceService} from '@/services'

function loadDetail(resourceId) {
  return ResourceService.get(resourceId).then((res) => {
    return res.getData()
  })
}

export {
  loadDetail
}

export default {
  loadDetail
}
