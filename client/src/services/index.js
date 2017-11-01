/**
 * Services
 * freelog文档：http://doc.freelog.com/
 * http://www.ruanyifeng.com/blog/2014/05/restful_api.html
 */
import UserService from './user'

import PolicyService from './policy'
import ResourceService from './resource'
import G_ResourcesService from './g_resources'
import PresentablesService from './presentables'
import ContractService from './contract'
import NodesService from './nodes'
import PagebuildService from './pagebuild'
import OtherService from './other'

import eventTest from './eventTest' //事件接口测试



export {
  UserService,
  PolicyService,
  ResourceService,
  G_ResourcesService,
  PresentablesService,
  NodesService,
  ContractService,
  PagebuildService,
  OtherService,

  eventTest
}
