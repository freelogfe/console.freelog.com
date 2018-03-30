<template>
  <div class="contract-detail-content-wrapper">
    <div v-html="segmentDetail" @click="cmdHandler"></div>
  </div>
</template>

<script>
  import compiler from '@freelog/resource-policy-compiler'

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
              eventId: event.eventId,
              type: event.type,
              params: event.params
            })
          }
        }

        corresponseEvents.forEach((transition) => {
          if (!transition.event) {
            //TERMINATE的event会是undefined情况不报错
          } else if (transition.event.type === 'compoundEvents') {
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
        var reg = /in (\S+)\s*:/
        html = html.replace(reg, ($, $1) => {
          var $$ = this.escapeOutputState($1)

          var cls = this.getState($1)
          var html = `<span class="from-state ${cls}" data-action="info" data-state="${$1}">${$$}<i class="el-icon-fa-arrow-circle-left cur-step-icon"></i></span>`
          return $.replace($1, html)
        })

        return html
      },
      getEvent(eventDesc) {
        var events = this.currentEvents
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
      escapeOutputState(state) {
        state = state.replace('<', '&lt;').replace('>', '&gt;')
        return state
      },
      tagOperation(html) {
        var reg = /proceed\s+to\s+(\S+)\s+on\s+(.+)$/
        html = html.replace(reg, ($, $1, $2) => {
          var event = this.getEvent($2)
          var index = -1
          var toState = this.escapeOutputState($1)
          var snippet1 = `<span class="to-state">${toState}</span>`
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
        var lines = compiler.beautify(detail.policySegment.segmentText).split(/\n/)
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
