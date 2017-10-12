<template>
  <section class="login-section">
    <header class="login-header">
      <!--<h1 class="brand">-->
        <!--<router-link to="/" tabindex="-1">freelog.com</router-link>-->
      <!--</h1>-->
      <el-alert v-if="error" :title="error.title" type="warning" :description="error.message" show-icon/>
    </header>
    <el-form class="login-form" auto-complete="off" :model="model" :rules="rules" ref="loginForm" label-width="80px">
      <h2 class="heading">用户登录</h2>
      <el-form-item label="用户名" prop="userName">
        <el-input type="text" v-model="model.userName" placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input type="password" v-model="model.passWord" placeholder="请输入密码"/>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="checked">记住密码</el-checkbox>
      </el-form-item>
      <div class="login-btns">
        <el-button type="primary" :loading="loading" @click="submit('loginForm')">{{ loading ? '登陆中...' : '登录' }}
        </el-button>
      </div>
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
