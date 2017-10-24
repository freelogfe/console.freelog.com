<template>
  <div id="app">
    <transition name="fade">
      <router-view class="wrapper"></router-view>
    </transition>
  </div>
</template>

<script>
  import './styles/reset.css'
  import './styles/global.less';
  export default {
    name: 'app'
  }
</script>
