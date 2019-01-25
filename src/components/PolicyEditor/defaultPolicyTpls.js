const freePolicy = `for public:
  initial:
    active
    recontractable
    presentable
    terminate
  `

const PresentableFreePolicy = `for public:
  initial:
    active
    terminate
  `

export const resource = [
  {
    template: freePolicy,
    name: '免费策略'
  },
  {
    template: `for public:
  escrow account acct
  custom event acceptor.customEvent

  initial:
    proceed to auth on acct exceed 1 feather
  auth:
    presentable
    active
    proceed to refund on acct.confiscated
  refund:
    proceed to finish on acct.refunded
  finish:
    terminate
  `,
    name: '收费策略'
  }
]

export const presentable = [
  {
    template: PresentableFreePolicy,
    name: '免费策略'
  },
  {
    template: `for public:
  escrow account acct
  custom event acceptor.customEvent

  initial:
    proceed to auth on acct exceed 1 feather
  auth:
    presentable
    active
    proceed to refund on acct.confiscated
  refund:
    proceed to finish on acct.refunded
  finish:
    terminate`,
    name: '收费策略'
  }
]

export default {
  resource,
  presentable
}
