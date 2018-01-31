import {ContractService} from '@/services'

function loadContractDetail(id) {
  return ContractService.get(id).then((res) => {
    return res.getData()
  })
}

export {
  loadContractDetail
}

export default {
  loadContractDetail
}
