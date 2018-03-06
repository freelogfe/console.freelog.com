<template>
  <header class="nav-header">
    <h1 class="brand">
      <router-link to="/">FreeLog</router-link>
    </h1>
    <nav class="toolbar">
      <div class="sidebar-toggle" @click="toggleSidebarHandler" :class="{'sidebar-open': sidebar.openSidebar}">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </div>
      <el-menu background-color="#324157" text-color="#fff"
               active-text-color="#ffd04b" default-active="-1"
               class="left-nav-bar" mode="horizontal"
               router>
        <el-menu-item index="/resource/list">
          资源系统
        </el-menu-item>
        <el-menu-item index="/node/list">
          <span class="node-sys-title">
            <span>节点系统</span>
            <span v-if="nodeSession.nodeName">
              <i class="split-line">|</i>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  {{nodeSession.nodeName}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="logoutNodeHandler">退出该登录节点</el-dropdown-item>
                  <el-dropdown-item command="switchNodeHandler">切换节点</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </span>
        </el-menu-item>
        <el-menu-item index="/group/list">
          分组管理
        </el-menu-item>
      </el-menu>

      <el-menu background-color="#324157" text-color="#fff"
               active-text-color="#ffd04b" default-active="-1" class="navbar-menu" mode="horizontal"
               @select="handleSelect">
        <el-submenu index="account" v-if="session">
          <template slot="title">
            <!--<img class="avatar" :src="session.user&&session.user.meta.avatar" alt="">-->
            <span style="color: #909399">{{session.user.nickname}}</span>
          </template>
          <el-menu-item index="setting">
            <router-link to="/account/settings" style="color: white">settings</router-link>
          </el-menu-item>
          <el-menu-item index="payment">
            <a href="//www.freelog.com/pages/user/index.html" target="_blank" style="color: white">payment</a>
          </el-menu-item>
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
