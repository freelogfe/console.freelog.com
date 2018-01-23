<template>
  <div class="contract-detail-content-wrapper">
    <div v-html="segmentDetail" @click="cmdHandler"></div>
  </div>
</template>

<script>
  import compiler from 'freelog_policy_compiler'

  let contractEventsMap = {
    transaction() {
      return '支付事件'
    },
    signing(params) {
      return '进入协议签署页面'
    },
    contractGuaranty() {
      return '进入支付保证金'
    },
    period() {
      return '周期性支付'
    },
    arrivalDate(params) {
      if (params[0] === 1) {
        return '到达日期' + params[1] + '进入下一个状态'
      } else if (params[0] === 0) {
        return params[1] + '天后进入下一个状态'
      }
    }
  }

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
    mounted() {
      this.render()
    },
    methods: {
      render() {
        this.currentEvents = this.resolveContractEvents(this.data)
        this.segmentDetail = this.parseContract(this.data)
        this.$nextTick(()=>{
//          this.$el.querySelector('.js-action-anim').classList.add('slideInRight')
        })
      },
      cmdHandler(event) {
        var action = event.target.dataset.action
        if (this[action]) {
          this[action](event.target.dataset)
        }
      },
      execEvent(params) {
        this.$emit('execute', this.currentEvents[params.index])
      },
      resolveContractEvents(detail) {
        let events = []
        let fsmState = detail.fsmState;
        let stateTransitionMap = detail.policySegment.fsmDescription;
        let corresponseEvents = [];

        stateTransitionMap.forEach((transition) => {
          if (transition.currentState === fsmState) {
            corresponseEvents.push(transition)
          }
        })

        var pushEvent = (event) => {
          var eventFn = contractEventsMap[event.type]
          if (eventFn) {
            events.push({
              desc: eventFn(event.type),
              eventId: event.eventId, //用于test，实际要删除
              type: event.type,
              params: event.params
            })
          }
        }

        corresponseEvents.forEach((transition) => {
          if (transition.event.type === 'compoundEvents') {
            transition.event.params.forEach(pushEvent)
          } else {
            pushEvent(transition.event)
          }
        })

        return events
      },
      fillSpace(line) {
        return line.replace(/^(\s+)/g, function ($) {
          var spaceArr = new Array($.length)
          spaceArr.fill('&nbsp;')
          return spaceArr.join('')
        })
      },
      getState(state) {
        var contract = this.data
        var cls = []
        if (state === contract.fsmState) {
          cls.push('cur-state')
        }

        if (contract.policySegment.activatedStates.includes(state)) {
          cls.push('active-state')
        }

        return cls.join(' ')
      },
      tagState(html) {
        var reg = /in (\w+)\s*:/
        html = html.replace(reg, ($, $1) => {
          var cls = this.getState($1)
          return `in <span class="from-state ${cls}" data-action="info" data-state="${$1}">${$1}<i class="el-icon-fa-stop-circle-o cur-step-icon"></i></span>:`
        })

        return html
      },
      getEvent(eventDesc) {
        var contract = this.data
        var events = this.currentEvents
        var steps = contract.policySegment.fsmDescription
        var result;

        events.forEach((event, i) => {
          let flag = event.params.every((p) => (eventDesc.includes(p)))
          if (flag) {
            result = event
            result.index = i
          }
        })
        return result
      },
      tagOperation(html) {
        var reg = /proceed\s+to\s+(\w+)\s+on\s+(.+)$/
        html = html.replace(reg, ($, $1, $2) => {
          var event = this.getEvent($2)
          var index = -1
          var snippet1 = `<span class="to-state">${$1}</span>`
          var snippet2 = ''

          //正在进行中的事件
          if (event) {
            index = event.index
            snippet2 = `<span class="operation-tag" data-action="execEvent" data-index="${index}">${$2}<i class="el-icon-fa-hand-o-left cur-step-icon"></i></span>`
          } else {
            snippet2 = `<span class="operation-tag">${$2}</span>`
          }

          $ = $.replace($1, snippet1)
          $ = $.replace($2, snippet2)
          return $
        })

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
        detail._segmentDetail = text
        return text
      },
    }
  }
</script>

<style lang="less">
  @import "content.less";
</style>
