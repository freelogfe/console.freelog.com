<template>
  <div>
    <div :gutter="40" v-for="t in stateMachine.stateMachine" class="state-item" key="">
      <div :class=" t.cColor ">【{{t.currentState}}】状态</div>
      <div>
        <span class="event-name">【{{t.event}}】</span>
        进入<span :class=" t.nColor ">【{{t.nextState}}】状态</span>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'collapse-component',
    data() {
      return {}
    },
    props: ["stateMachine"],
    mounted() {
    },
    methods: {}
  }

</script>

<style lang="less" scoped>
  .state-item {
    border-bottom: 1px solid #aaaaaa;
    padding-bottom: 12px;
    padding-top: 12px;
  }
  .red {
    color: red
  }

  .purple {
    color: purple
  }

  .blue {
    color: blue
  }

  .pink {
    color: pink
  }

  .green {
    color: green
  }
</style>
