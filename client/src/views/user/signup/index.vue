<template>
  <section class="login-section">
    <header class="login-header">
      <!--<h1 class="brand">-->
      <!--<router-link to="/" tabindex="-1">freelog.com</router-link>-->
      <!--</h1>-->
      <el-alert v-if="error" :title="error.title" type="error" :description="error.message" show-icon/>
    </header>
    <el-form class="login-form" auto-complete="off" :model="model" :rules="rules" ref="signupForm" label-width="80px">
      <h2 class="heading">注册用户</h2>
      <el-form-item prop="loginName" label="账号" required>
        <el-input type="text" v-model="model.loginName" placeholder="请输入手机号或邮箱">
        </el-input>
      </el-form-item>
      <el-form-item prop="nickname" label="用户昵称" required>
        <el-input type="text" v-model="model.nickname" placeholder="请输入用户昵称">
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="设置密码" required>
        <el-input type="password" v-model="model.password" placeholder="密码(6-16位字母、数字和符号)"></el-input>
      </el-form-item>
      <el-form-item prop="checkPassword" label="确认密码" required>
        <el-input type="password" v-model="model.checkPassword" placeholder="请输入确认密码"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verifyCode" v-show="false">
        <el-input v-model="model.verifyCode" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item>
        <a class="user-op" href="/user/login" style="float: right; color: #1f2d3d">去登录</a>
      </el-form-item>
      <el-form-item class="login-btns">
        <el-button type="primary"
                   style="width: 100%;"
                   :loading="loading"
                   @click="submit('signupForm')">{{ loading ? '注册中...' : '注册' }}
        </el-button>
      </el-form-item>
    </el-form>
    <!--<footer class="login-footer">-->
    <!--<a href="/">返回到 freelog.com</a>-->
    <!--</footer>-->
  </section>
</template>

<script>
  import LoginView from './index'

  export default LoginView
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
