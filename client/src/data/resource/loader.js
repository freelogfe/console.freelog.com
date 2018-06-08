import {ResourceService} from '@/services'
import {createLoader, createCacheLoaders} from '@/lib/utils'

function loadDetail(resourceId) {
  return ResourceService.get(resourceId).then((res) => {
    if (res.data.errcode === 0) {
      return res.getData()
    } else {
      return Promise.reject(res.data)
    }
  })
}


const onloadResourceDetail = createCacheLoaders(loadDetail)

export {
  loadDetail,
  onloadResourceDetail
}

export default {
  loadDetail,
  onloadResourceDetail
}
