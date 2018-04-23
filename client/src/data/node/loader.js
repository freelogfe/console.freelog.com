import {NodesService} from '@/services'

function loadDetail(nodeId) {
  return NodesService.get(nodeId).then((res) => {
    return res.getData()
  })
}

export {
  loadDetail
}

export default {
  loadDetail
}
