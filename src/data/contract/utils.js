import { beautify } from '@freelog/resource-policy-lang'
import userLoader from '../user/loader'
import nodeLoader from '../node/loader'
import { CONTRACT_STATUS_COLORS } from '@/config/contract'
import Vue from 'vue'

function format(contract) {
  if (!contract) return

  if (contract.policySegment) {
    contract._policyText = beautify(contract.policySegment.policyText).trim()
    contract.forUsers = contract.policySegment.users.map(user => ({
      users: user.users.join('、'),
      type: user.userType
    }))
  }

  contract.statusInfo = CONTRACT_STATUS_COLORS[contract.status]

  // if (contract.partyOne) {
  //   userLoader.onloadUserInfo(contract.partyOne).then((userInfo) => {
  //     Vue.set(contract, 'partyOneInfo', userInfo)
  //   })
  // }
  //
  // if (contract.partyTwo) {
  //   nodeLoader.onloadNodeDetail(contract.partyTwo).then((nodeInfo) => {
  //     Vue.set(contract, 'partyTwoInfo', nodeInfo)
  //   })
  // }
  return contract
}


export default {
  format
}
