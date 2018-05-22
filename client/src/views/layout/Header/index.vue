<template>
  <header class="nav-header">
    <div class="brand">
      <router-link to="/">F</router-link> <span class="page-title">{{pageTitle}}</span>
    </div>
    <nav class="toolbar">
      <ul class="navbar-menu">
        <li class="nav-right-menu-item">
          <search-input></search-input>
          <!--<el-button type="text"><i class="el-icon-search"></i></el-button>-->
        </li>
        <li class="nav-right-menu-item">
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
            <span style="color: #909399" slot="reference">{{session.user.nickname}}</span>
            <ul class="my-profile-items">
              <li class="my-profile-item center hover">
                <router-link to="/resource/list" class="nav-link">
                  <img class="tool-icon" src="../../../assets/img/icons/resource.png" alt="">我的资源库
                </router-link>
              </li>
              <li class="my-profile-item">
                <div><img class="tool-icon" src="../../../assets/img/icons/node.png" alt="">节点
                  <router-link to="/node/create" class="nav-link create-node-btn"><i class="el-icon-plus"></i>
                  </router-link>
                </div>
                <ul class="my-node-list">
                  <li class="node-item hover" :key="node.nodeId" v-for="node in nodeList">
                    <router-link :to="'/node/detail/'+node.nodeId" class="nav-link">{{node.nodeName}}</router-link>
                  </li>
                </ul>
              </li>
              <li class="my-profile-item center hover">
                <router-link to="/account/settings" class="nav-link"><i class="el-icon-setting tool-icon"></i>设置</router-link>
              </li>
              <li class="my-profile-item center hover" @click="logout">
                <img class="tool-icon" src="../../../assets/img/icons/logout.png" alt="">登出
              </li>
            </ul>
          </el-popover>
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
