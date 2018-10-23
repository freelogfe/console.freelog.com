<template>
  <section class="login-section">
    <el-form class="user-form" auto-complete="off" :model="userInfo" :rules="rules" ref="loginForm" label-width="100px">
      <el-form-item prop="userName" label="用户姓名">
        <el-input v-model="userInfo.userName" placeholder="请输入用户姓名"></el-input>
      </el-form-item>
      <el-form-item prop="nickname" label="用户昵称">
        <el-input v-model="userInfo.nickname" placeholder="请输入用户昵称"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="email">
        <el-input v-model="userInfo.email" placeholder="请输入email"></el-input>
      </el-form-item>
      <el-form-item prop="mobile" label="手机号">
        <el-input v-model="userInfo.mobile" placeholder="请输入手机号" disabled></el-input>
      </el-form-item>
      <el-form-item class="login-btns">
        <el-button type="primary"
                   :disabled="true"
                   style="width: 100%;"
                   :loading="loading"
                   @click="submit('loginForm')">{{ loading ? '保存中...' : '保存' }}
        </el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import UserSettingView from './index'

export default UserSettingView
</script>

<style lang="less" scoped>
  .user-form {
    width: 990px;
    margin: auto;
  }
</style>
