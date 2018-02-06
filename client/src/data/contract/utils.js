import {loadUserInfo} from '../user/loader'
import {loadNodeInfo} from '../node/loader'
import {CONTRACT_STATUS_COLORS} from '@/config/contract'
import Vue from 'vue'

function format(contract) {
  if (!contract) return

  contract.statusInfo = CONTRACT_STATUS_COLORS[contract.status]
  contract.forUsers = contract.policySegment.users.map((user) => {
    return {
      users: user.users.join('、'),
      type: user.userType
    }
  })

  if (contract.partyOne) {
    loadUserInfo(contract.partyOne).then((userInfo) => {
      Vue.set(contract, 'partyOneInfo', userInfo)
    })
  }

  if (contract.partyTwo) {
    loadNodeInfo(contract.partyTwo).then((nodeInfo) => {
      Vue.set(contract, 'partyTwoInfo', nodeInfo)
    })
  }
  return contract
}

export default {
  format
}
