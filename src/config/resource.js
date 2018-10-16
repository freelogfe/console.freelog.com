export const RESOURCE_TYPES = {
  widget: 'widget',
  image: 'image',
  audio: 'audio',
  markdown: 'markdown',
  pageBuild: 'page_build',
  revealSlide: 'reveal_slide',
  license: 'license'
};


export const RESOURCE_STATUS = [
  {
    desc: '未知状态',
    type: 'danger'
  }, {
    desc: '未发布',
    type: 'warning'
  }, {
    desc: '已发布',
    type: 'success'
  }, {
    desc: '冻结',
    type: 'danger'
  }
]
