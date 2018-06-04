import axios from '@/lib/axios'

function initAuthScheme(scheme) {

  scheme = scheme || {}
  const DefaultScheme = {
    policyText: '',
    selectedPolicy: {},
    selectedScheme: {},
    checked: false,
    selected: false,
    authSchemeName: '未命名的授权方案',
    bubbleResources: [],
    dutyStatements: [],
    authSchemes: [],  //当前资源的授权点列表
    dependencies: [] //授权点管理的资源集合
  };

  Object.keys(DefaultScheme).forEach((key) => {
    if (!scheme[key]) {
      scheme[key] = DefaultScheme[key]
    }
  });

  return scheme
}

/**
 * resourceIds or authSchemeIds
 * @param params
 * @returns {*}
 */

var cacheSchemes = {};
var cacheResourceSchemes = {}

function loadAuthSchemes(params) {
  var list = []
  var resourceIds = [];
  var authSchemeIds = []

  params.authSchemeIds = params.authSchemeIds || []
  params.resourceIds = params.resourceIds || [];
  params.resourceIds.forEach((id) => {
    if (cacheResourceSchemes[id]) {
      list = list.concat(cacheResourceSchemes[id])
    } else {
      resourceIds.push(id)
    }
  });

  params.authSchemeIds.forEach((id) => {
    if (cacheSchemes[id]) {
      list.push(cacheSchemes[id])
    } else {
      authSchemeIds.push(id)
    }
  });

  if (!resourceIds.length && !authSchemeIds.length) {
    return Promise.resolve(list)
  }

  if (resourceIds.length) {
    params.resourceIds = resourceIds.join(',')
  }

  if (authSchemeIds.length) {
    params.authSchemeIds = authSchemeIds.join(',')
  }

  return axios.get(`/v1/resources/authSchemes`, {
    params: params
  }).then((res) => {
    var data = res.getData()
    data.forEach((scheme) => {
      if (cacheSchemes[scheme.authSchemeId]) {
        list.push(scheme)
        return
      }

      cacheSchemes[scheme.authSchemeId] = scheme
      if (!cacheResourceSchemes[scheme.resourceId]) {
        cacheResourceSchemes[scheme.resourceId] = []
      }
      cacheResourceSchemes[scheme.resourceId].push(scheme)
    });

    return list
  })
}

function loadSchemesForResource(resourceId, params) {
  if (cacheResourceSchemes[resourceId]) {
    return Promise.resolve(cacheResourceSchemes[resourceId].slice(0))
  } else {
    params = params || {}
    params.resourceIds = [resourceId]
    return loadAuthSchemes(params).then(() => {
      if (cacheResourceSchemes[resourceId]) {
        return Promise.resolve(cacheResourceSchemes[resourceId].slice(0))
      } else {
        return []
      }
    })
  }
}


function loadSchemeForAuthNode(authSchemeId) {
  if (cacheSchemes[authSchemeId]) {
    return Promise.resolve(cacheSchemes[authSchemeId])
  } else {
    return loadAuthSchemes({authSchemeIds: [authSchemeId]}).then(() => {
      return cacheSchemes[authSchemeId]
    })
  }
}

export default {
  initAuthScheme,
  loadAuthSchemes,
  loadSchemesForResource,
  loadSchemeForAuthNode
}
