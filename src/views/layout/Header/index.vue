<template>
  <header class="nav-header">
    <router-link to="/"  class="brand">
      <i>F</i>
      <span class="page-title">{{pageTitle}}</span>

    </router-link>
    <nav class="toolbar" v-if="session.user">
      <ul class="navbar-menu">
        <li class="nav-right-menu-item">
          <search-input @search="searchHandler"></search-input>
          <!--<el-button type="text"><i class="el-icon-search"></i></el-button>-->
        </li>
        <li class="nav-right-menu-item" hidden>
          <el-button type="text"><i class="el-icon-bell"></i></el-button>
          <el-badge value="1" class="badge-item"></el-badge>
        </li>
        <li class="nav-right-menu-item my-profile" v-if="session">
          <!--<img class="avatar" :src="session.user&&session.user.meta.avatar" alt="">-->
          <el-popover
            placement="bottom-end"
            title=""
            style="padding: 0;"
            popper-class="nav-list-pop-wrap"
            trigger="hover">
            <span class="user-profile" slot="reference">
              <img v-if="avatarUrl" :src="avatarUrl" alt="" @error="errorImageHandler">
              <i v-else class="el-icon-fa-user-circle" :title="session.user.nickname"></i>
            </span>
            <ul class="my-profile-items">
              <li class="my-profile-item center hover" @click="logout">
                <img class="tool-icon" src="../../../assets/img/icons/logout.png" alt="">登出
              </li>
            </ul>
          </el-popover>
        </li>
        <li class="nav-right-menu-item my-profile" v-else>
          <router-link to="/user/login" class="nav-link">
            登录/注册
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import Header from './index'

export default Header
</script>

<style scoped lang="less">
  @import "index.less";
</style>


<style>
  .el-popover.nav-list-pop-wrap {
    padding: 0;
  }
</style>
