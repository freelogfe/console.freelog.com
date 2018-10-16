<template>
  <div class="fl-switch-wrap">
    <div class="switch-container"
         :class="[checked? 'active-switch': 'inactive-switch']"
         @click="switchHandler">
      <i class="switch-mesh"></i>
      <span class="switch-label">{{checked? activeText: inactiveText}}</span>
    </div>
  </div>
</template>

<script>
  import SwitchWidget from './index'

  export default SwitchWidget
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
