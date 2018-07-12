import {NodesService} from '@/services'
import {createLoader, createCacheLoaders, promisifyLoader} from '@/lib/utils'
import {loadLoginUserInfo} from '../user/loader'

var userInfo = loadLoginUserInfo()

function loadDetail(nodeId) {
  return NodesService.get(nodeId).then((res) => {
    return res.getData()
  })
}

// const onloadNodeDetail = createCacheLoaders(loadDetail)
const onloadNodeDetail = loadDetail

const onloadNodeList = promisifyLoader(function (callback) {
  if (!userInfo.userId) {
    return callback({})
  }
  var params = {
    ownerUserId: userInfo.userId,
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
