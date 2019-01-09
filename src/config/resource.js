export const RESOURCE_TYPES = {
  widget: 'widget',
  image: 'image',
  audio: 'audio',
  markdown: 'markdown',
  pageBuild: 'page_build',
  revealSlide: 'reveal_slide',
  license: 'license'
}


export const RESOURCE_STATUS_MAP = {
  unknown: 0,
  unpublished: 1,
  published: 2,
  freeze: 3
}

export const RESOURCE_STATUS = [
  {
    desc: '未知状态',
    type: 'danger',
    status: RESOURCE_STATUS_MAP.unknown
  }, {
    desc: '未发布',
    type: 'warning',
    status: RESOURCE_STATUS_MAP.unpublished
  }, {
    desc: '已发布',
    type: 'success',
    status: RESOURCE_STATUS_MAP.published
  }, {
    desc: '冻结',
    type: 'danger',
    status: RESOURCE_STATUS_MAP.freeze
  }
]
