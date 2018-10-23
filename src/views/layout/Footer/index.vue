<template>
  <footer class="app-footer">
    <ul class="freelog-info">
      <li><a href="/about">关于freelog</a></li>
      <li><a href="/help">帮助中心</a></li>
      <li><a href="http://www.miibeian.gov.cn" target="_blank">粤ICP备17085716号-1</a></li>
      <li><b>Copyright© {{year}} 飞致 freelog.com版权所有</b></li>
    </ul>
  </footer>
</template>

<script>
import Footer from './index'

export default Footer
</script>

<style scoped lang="less">
  .app-footer {
    margin-top: 80px;
    margin-bottom: 50px;
    text-align: center;
    padding: 10px 0;
  }

  a {
    color: black;
  }

  .freelog-info {
    li {
      display: inline-block;
      margin: 0 20px;
    }
  }
</style>
