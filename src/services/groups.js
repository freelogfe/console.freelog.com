/**
 * Node service
 */

import {axios} from '@/lib'
import Fetch from './fetch'

export default new Fetch('v1/groups')


const apis = {
  manageMembers: function (groupId,options) {
    return axios.post(`/v1/groups/operationMembers/${groupId}`, options)
  },
  list: function (options) {
    return axios.get('/v1/groups', options)
  },
  isExistMember: function (options) {
    return axios.get('/v1/groups/isExistMember', options)
  }
}

export const manageMembers = apis.manageMembers
export const list = apis.list
export const isExistMember = apis.isExistMember
