const freePolicy = `for public:
  initial:
    active
    recontractable
    presentable
    terminate
  `

export const resource = [
  {
    template: freePolicy,
    name: '免费'
  },
  {
    template: `for public:
  escrow account acct
  custom event acceptor.customEvent

  initial:
    proceed to auth on acct exceed 10 feather
  auth:
    presentable
    active
    proceed to refund on acct.confiscated
  refund:
    proceed to finish on acct.refunded
  finish:
    terminate
  `,
    name: '收费'
  }
]

export const presentable = [
  {
    template: freePolicy,
    name: '免费'
  },
  {
    template: `for public:
  escrow account acct
  custom event acceptor.customEvent

  initial:
    proceed to auth on acct exceed 10 feather
  auth:
    presentable
    active
    proceed to refund on acct.confiscated
  refund:
    proceed to finish on acct.refunded
  finish:
    terminate`,
    name: '收费'
  }
]

export default {
  resource,
  presentable
}
