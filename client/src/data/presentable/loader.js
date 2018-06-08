import {PresentablesService} from '@/services'
import {createLoader, createCacheLoaders} from '@/lib/utils'


function loadDetail(pid) {
  return PresentablesService.get(pid).then((res) => {
    return res.getData()
  })
}

const onloadPresentableDetail = createCacheLoaders(loadDetail)

export {
  loadDetail,
  onloadPresentableDetail
}

export default {
  loadDetail,
  onloadPresentableDetail
}
