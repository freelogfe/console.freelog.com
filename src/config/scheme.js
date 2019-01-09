export const SCHEME_STATUS = {
  NONE: 0, // 不解决
  SOME: 1, // 解决部分
  ALL: 2, // 全部解决
  UNHANDLE: 3, // 未处理的内容
}


export const SCHEME_PUBLISH_STATUS = {
  disabled: 0,
  enabled: 1,
  deleted: 4
}


export const SCHEME_STATUS_MAP = {
  [SCHEME_PUBLISH_STATUS.disabled]: {
    desc: '未启用',
    className: 'off-state'
  },
  [SCHEME_PUBLISH_STATUS.enabled]: {
    desc: '启用',
    className: 'on-state'
  },
  [SCHEME_PUBLISH_STATUS.deleted]: {
    desc: '已废弃',
    className: 'deleted-state'
  },
}