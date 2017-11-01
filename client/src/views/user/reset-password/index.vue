<template>
  <section class="login-section">
    <header class="login-header">
      <!--<h1 class="brand">-->
      <!--<router-link to="/" tabindex="-1">freelog.com</router-link>-->
      <!--</h1>-->
      <el-alert v-if="error" :title="error.title" type="warning" :description="error.message" show-icon/>
    </header>
    <el-form class="login-form" auto-complete="off" :model="model" :rules="rules" ref="formRef" label-width="80px">
      <h2 class="heading">找回密码</h2>
      <el-form-item prop="loginName" label="账号">
        <el-input type="text" v-model="model.loginName" placeholder="手机号或邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input type="password" v-model="model.password" placeholder=""></el-input>
      </el-form-item>
      <!--<el-form-item prop="verifyCode" label="验证码">-->
        <!--<el-input type="text" v-model="model.verifyCode" placeholder=""></el-input>-->
      <!--</el-form-item>-->
      <el-form-item class="login-btns">
        <el-button type="primary"
                   style="width: 100%;"
                   :loading="loading"
                   @click="submit('formRef')">{{ loading ? '验证中...' : '立即验证' }}
        </el-button>
      </el-form-item>
    </el-form>
    <!--<footer class="login-footer">-->
    <!--<a href="/">返回到 freelog.com</a>-->
    <!--</footer>-->
  </section>
</template>

<script>
  import ResetView from './index'

  export default ResetView
</script>

<style lang="less" scoped>
  .login-section {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

  .heading {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .login-btns {
    text-align: center;
  }
  }
</style>
