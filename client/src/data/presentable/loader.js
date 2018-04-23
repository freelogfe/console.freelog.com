import {PresentablesService} from '@/services'

function loadDetail(pid) {
  return PresentablesService.get(pid).then((res) => {
    return res.getData()
  })
}

export {
  loadDetail
}

export default {
  loadDetail
}
