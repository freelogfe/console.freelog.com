<template>
  <header class="nav-header">
    <h1 class="brand">
      <router-link to="/">FreeLog</router-link>
    </h1>
    <nav class="toolbar">
      <div class="sidebar-toggle" @click="toggleSidebarHandler" :class="{'sidebar-open': sidebar.openSidebar}">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </div>
      <el-menu theme="dark" default-active="-1" class="left-nav-bar" mode="horizontal" router>
        <el-menu-item :index="'/'+navItem.path" :key="index" v-for="(navItem, index) in navRoutes">
          {{navItem.meta.title}}
        </el-menu-item>
      </el-menu>

      <el-menu theme="dark" default-active="-1" class="navbar-menu" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">
          <div class="badge-item">
            <el-badge :value="12" class="item">
              <i class="fa fa-envelope-o"></i>
            </el-badge>
          </div>
        </el-menu-item>
        <el-submenu index="account">
          <template slot="title">
            <!--<img class="avatar" :src="session.user&&session.user.meta.avatar" alt="">-->
            <span>{{session.user.displayName}}</span>
          </template>
          <el-menu-item index="setting">
            <a href="//freelog.com/account/settings" target="_blank">setting</a>
          </el-menu-item>
          <el-menu-item index="payments">payments</el-menu-item>
          <el-menu-item index="logout" @click="logout">logout</el-menu-item>
        </el-submenu>
      </el-menu>
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
