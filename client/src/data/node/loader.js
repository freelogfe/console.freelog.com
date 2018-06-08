import {NodesService} from '@/services'
import {createLoader, createCacheLoaders, promisifyLoader} from '@/lib/utils'
import store from '@/store/index'

const {session} = store.getters

function loadDetail(nodeId) {
  return NodesService.get(nodeId).then((res) => {
    return res.getData()
  })
}

const onloadNodeDetail = createCacheLoaders(loadDetail)

const onloadNodeList = promisifyLoader(function (callback) {
  var params = {
    ownerUserId: session.user.userId,
    pageSize: 1e2
  };
  NodesService.get({
    params: params
  }).then((res) => {
    callback(res.getData())
  })
});


export {
  loadDetail,
  onloadNodeDetail,
  onloadNodeList
}

export default {
  loadDetail,
  onloadNodeDetail,
  onloadNodeList
}
