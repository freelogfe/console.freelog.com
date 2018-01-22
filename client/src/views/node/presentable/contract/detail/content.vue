<template>
  <div class="contract-detail-content-wrapper">
    <div v-html="segmentDetail"></div>
  </div>
</template>

<script>
  export default {
    name: 'contract-content',

    data() {
      return {
        segmentDetail: ''
      }
    },

    props: {
      data: {
        type: Object
      }
    },
    watch: {
      data: 'render'
    },
    methods: {
      render() {
        this.segmentDetail = this.parseContract(this.data)
      },
      fillSpace(line) {
        return line.replace(/^(\s+)/g, function ($) {
          var spaceArr = new Array($.length)
          spaceArr.fill('&nbsp;')
          return spaceArr.join('')
        })
      },
      tagState(html) {
        var reg = /in (\w+)\s*:/
        html = html.replace(reg, `in <span class="state-tag">$1</span>:`)

        return html
      },
      tagOperation(html){
        var reg = /on\s+accepting\s+(.+)$/
        html = html.replace(reg, `on accepting <span class="operation-tag">$1</span>`)

        return html
      },
      parseContract(detail) {
        var lines = detail.policySegment.segmentText.split(/\n/)
        var text = ''
        lines.forEach((line) => {
          let html = this.fillSpace(line)
          html = this.tagState(html)
          html = this.tagOperation(html)
          text += `<p>${html}</p>`
        })
        console.log(text)
        detail._segmentDetail = text
        console.log(detail.policySegment.segmentText)
        return text
      },
    }
  }
</script>

<style lang="less">
  @import "content.less";
</style>
