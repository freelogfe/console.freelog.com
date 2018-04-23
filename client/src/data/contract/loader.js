import {ContractService} from '@/services'

function loadDetail(id) {
  return ContractService.get(id).then((res) => {
    return res.getData()
  })
}

export {
  loadDetail
}

export default {
  loadDetail
}
