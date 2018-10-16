<template>
  <section class="login-section">
    <header class="login-header">
      <!--<h1 class="brand">-->
      <!--<router-link to="/" tabindex="-1">freelog.com</router-link>-->
      <!--</h1>-->
      <el-alert v-if="error" :title="error.title" type="warning" :description="error.message" show-icon/>
    </header>
    <el-form class="login-form" auto-complete="off" :model="model" :rules="rules" ref="loginForm" label-width="0">
      <h2 class="heading">用户登录</h2>
      <el-form-item prop="loginName">
        <el-input type="text" v-model="model.loginName" name="username" placeholder="请输入用户名">
          <template slot="prepend">
            <i class="fa fa-user" aria-hidden="true"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="model.password" name="password" placeholder="请输入密码"
                  @keyup.native.enter="submit('loginForm')">
          <template slot="prepend">
            <i class="fa fa-unlock-alt" aria-hidden="true"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="rememberUser">记住我</el-checkbox>
        <span class="user-ops">
          <a class="user-op" href="/user/reset_pw">忘记密码</a> | <a class="user-op" :href="signUpLink">注册新用户</a>
        </span>
      </el-form-item>
      <el-form-item class="login-btns">
        <el-button type="primary"
                   style="width: 100%;"
                   :loading="loading"
                   class="js-login-btn"
                   @click="submit('loginForm')">{{ loading ? '登陆中...' : '登录' }}
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
  @import "index.less";
</style>
