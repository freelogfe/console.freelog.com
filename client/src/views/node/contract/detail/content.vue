<template>
  <div class="contract-detail-content-wrapper" v-html="contractDetail" @click="handlerProxy">

  </div>
</template>

<script>
  import {highlightPolicy} from '@freelog/resource-policy-lang/lib/presentablePolicyHighlight'

  export default {
    name: 'contract-detail',
    props: {
      contract: {
        type: Object,
        required: true
      }
    },
    data() {
      return {

      }
    },
    computed: {
      contractId (){
        return this.contract.contractId
      },
      fsmStates (){
        return this.contract.contractClause.fsmStates
      },
      currentFsmState (){
        return this.contract.contractClause.currentFsmState
      },
      policyText (){
        return this.contract.contractClause.policyText
      },
      contractDetail() {
        return highlightPolicy(this.policyText)
      }
    },
    methods: {
      toggleClass ($dom, className){
        var curClassName = $dom.className
        if(curClassName.indexOf(className) !== -1){
          $dom.className = curClassName.replace(className, '')
        }else{
          $dom.className = `${curClassName} ${className}`
        }
      },
      handlerProxy (event){
        const dataset = event.target.dataset
        const handlerName = dataset.handler
        if (this[handlerName]) {
          var transitionData = this.getStateTransitionData(dataset.transition)
          if(transitionData !== null) {
            const { code, params, eventId } = transitionData
            this[handlerName](code, params, eventId)
          }
        }
      },
      getStateTransitionData(transition) {
        if(this.fsmStates[this.currentFsmState]){
          let transitionMap = this.fsmStates[this.currentFsmState].transition
          return transitionMap[transition]
        }else{
          return null
        }
      },
      // 签约协议
      signingEvent(code, params, eventId ) {
        this.$axios.post('/v1/contracts/events/signingLicenses', {
          contractId: this.contractId,
          eventId,
          licenseIds: parmas.licenseResourceId,
          nodeId: window.__auth_info__.__auth_node_id__
        })
          .then(resp => {
            if(resp.status === 200) {
              if(resp.data.errcode === 0) {
                console.log('license sign success!')
              }else {
                console.log(`license sign fail! error: ${resp.data.msg}`)
              }
            }else {
              console.log('/v1/contracts/events/signingLicenses 请求失败！')
            }
          })
      },
      cycleEndEvent(code, params, eventId) {},
      // 交易事件
      transactionEvent(code, params, eventId) {
        // this.$axios.post('',{
        //   contractId: this.contractId,
        //   eventId: params.eventId,
        //   fromAccountId:"feth102dac4f6ab",
        //   amount: params.amount,
        //   "password":"012345"
        // })
      },
      settlementEvent(code, params, eventId) {},
      viewCountEvent(code, params, eventId) {},
      recontractCountEvent(code, params, eventId) {},
      presentCountEvent(code, params, eventId) {},
      escrowExceedAmount(code, params, eventId) {
        console.log('run escrowExceedAmount - code, params, eventId --', code, params, eventId)
      },
      // 保证金没收
      escrowConfiscated(code, params, eventId){
        this.$axios('/v1/contracts/events/escrowConfiscated', {
          contractId: this.contractId,
          eventId,
          toAccountId: params,
        })
          .then(resp => {
            if(resp.status === 200) {
              if(resp.data.errcode === 0) {
                console.log('Escrow has been confiscated success!')
              }else {
                console.log(`Escrow has been confiscated fail! error: ${resp.data.msg}`)
              }
            }else {
              console.log('/v1/contracts/events/escrowConfiscated 请求失败！')
            }
          })
      },
      cycleEndEvent(transition) {},
      customEvent(transition) {},

    },
    mounted() {
      if(this.currentFsmState !== 'none') {
        var $targDom = this.$el.querySelector(`.bp-s-${this.currentFsmState}`)
        this.toggleClass($targDom, 'active')
      }

    },
  }
</script>

<style lang="less" type="text/less">

  // policy 高亮
  .beauty-poliycy-box{
    font-size: 14px; line-height: 1.6;
    color: #999;

    .bp-audience{ }
    .bp-declaration, .bp-state, .bp-s-row:not(:first-child){
      padding-left: 3em;
    }
    .bp-state.active{
      background: #E3F0FF;
      border: 1px solid #B3D7FF; border-radius: 20px;
      color: #222;
    }
    .bp-state.active .bp-s-transition{
      color: #EE6723;
    }

    .bp-state .bp-s-event{
      pointer-events: none;
    }
    .bp-state.active .bp-s-event{
      display: inline-block; cursor: pointer; color: #3e94f3; pointer-events: auto;
    }
  }
</style>

