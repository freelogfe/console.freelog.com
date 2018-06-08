import {createLoader, createCacheLoaders} from '@/lib/utils'
import axios from '@/lib/axios'

/**
 * @param params
 * @param params.authSchemeIds {Array}
 * @param params.resourceIds {Array}
 * @returns {*}
 */
function loadAuthSchemes(params) {
  if (params.resourceIds && params.resourceIds.length) {
    params.resourceIds = params.resourceIds.join(',')
  }

  if (params.authSchemeIds && params.authSchemeIds.length) {
    params.authSchemeIds = params.authSchemeIds.join(',')
  }

  return axios.get(`/v1/resources/authSchemes`, {
    params: params
  }).then((res) => {
    if (res.data.errcode === 0) {
      return res.getData()
    } else {
      return Promise.reject(res.data.msg)
    }
  })
}

function loadSchemeDetail(authSchemeId, params) {
  params = params || {}
  return axios.get(`/v1/resources/authSchemes/${authSchemeId}`, {
    params: params
  }).then((res) => {
    if (res.data.errcode === 0) {
      return res.getData()
    } else {
      return Promise.reject(res.data.msg)
    }
  })
}


const onloadSchemeDetail = createCacheLoaders(function (id) {
  return loadAuthSchemes({authSchemeIds: [id]}).then(scheme => {
    if (Array.isArray(scheme)) {
      scheme = scheme[0]
    }
    return scheme
  })
})


const loadSchemesForResource = createCacheLoaders(function (params) {
  return loadAuthSchemes(params)
})


function onloadSchemesForResource(id, params) {
  params = params || {}
  params.resourceIds = [id]

  return loadSchemesForResource(params)
}

export default {
  onloadSchemesForResource,
  onloadSchemeDetail,
  loadAuthSchemes
}
