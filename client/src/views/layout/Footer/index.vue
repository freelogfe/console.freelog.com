<template>
  <footer class="app-footer">
    <div class="freelog-info">
      <a href="/about">关于freelog</a>
      <a href="/help">帮助中心</a>
    </div>
    <div class="copyright">
      <b>© {{year}} freelog.com版权所有</b>
    </div>
  </footer>
</template>

<script>
  import Footer from './index';
  export default Footer;
</script>

<style scoped lang="less">
  .app-footer {
    margin-top: 30px;
    text-align: center;
    width: 100%;
  }
 a {
   color: black;
 }
</style>
