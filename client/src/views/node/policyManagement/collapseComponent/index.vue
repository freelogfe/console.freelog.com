<template>
  <div class="">

  <el-row :gutter="40"v-for="t in stateMachine.stateMachine" >
    <hr>
      <el-col :span="8">
        <span :class=" t.cColor ">【{{t.currentState}}】</span>

      </el-col>
      <br>
      <el-col :span=8 >
      【{{t.event}}】
      </el-col>
      <el-col :span=8>
      进入<span :class=" t.nColor ">【{{t.nextState}}】</span>
      </el-col>
  </el-row>

</div>
</template>

<script>
export default {
  name: 'collapse-component',
  data() {
    return {

    }
  },
  props: ["stateMachine"],
  mounted() {
  },
  methods: {

  }
}

</script>

<style lang="less" scoped>
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
