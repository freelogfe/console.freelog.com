import compiler from '@freelog/resource-policy-compiler'
import userLoader from '../user/loader'
import nodeLoader from '../node/loader'
import {CONTRACT_STATUS_COLORS} from '@/config/contract'
import Vue from 'vue'

function format(contract) {
  if (!contract) return

  if (contract.policySegment) {
    contract._segmentText =  compiler.beautify(contract.policySegment.segmentText)
  }
  contract.statusInfo = CONTRACT_STATUS_COLORS[contract.status]
  contract.forUsers = contract.policySegment.users.map((user) => {
    return {
      users: user.users.join('、'),
      type: user.userType
    }
  })

  if (contract.partyOne) {
    userLoader.loadDetail(contract.partyOne).then((userInfo) => {
      Vue.set(contract, 'partyOneInfo', userInfo)
    })
  }

  if (contract.partyTwo) {
    nodeLoader.loadDetail(contract.partyTwo).then((nodeInfo) => {
      Vue.set(contract, 'partyTwoInfo', nodeInfo)
    })
  }
  return contract
}

export default {
  format
}
