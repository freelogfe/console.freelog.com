import { PresentablesService } from '@/services'
// import { createLoader, createCacheLoaders } from '@/lib/utils'


function loadDetail(pid) {
  return PresentablesService.get(pid).then(res => res.getData())
}

// const onloadPresentableDetail = createCacheLoaders(loadDetail, true)
const onloadPresentableDetail = loadDetail

export {
  loadDetail,
  onloadPresentableDetail
}

export default {
  loadDetail,
  onloadPresentableDetail
}
