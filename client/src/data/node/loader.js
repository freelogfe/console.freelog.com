import {NodesService} from '@/services'

function loadNodeInfo(nodeId) {
  return NodesService.get(nodeId).then((res) => {
    return res.getData()
  })
}

export {
  loadNodeInfo
}

export default {
  loadNodeInfo
}
