<template>
  <section>
    <p>我同意支付合约保证金{{amount}}</p>
    <p>该保证金于{{day}}后返回账户</p>
    <el-button type="primary" @click="confirm()">确定</el-button>
  </section>
</template>

<script>
  import contractGuaranty from './index';
  export default contractGuaranty;
</script>

<style scoped lang="less">

</style>
