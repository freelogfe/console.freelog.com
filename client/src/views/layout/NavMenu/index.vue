<template>
  <div class="nav-menu-list">
    <el-menu default-active="" theme="dark" router>
      <template v-for="navItem in navList">
        <el-submenu index="#" v-if="navItem.children && !navItem.hidden">
          <template slot="title">
            <span v-show="shouldShowTitle">{{navItem.meta.title}}</span>
          </template>
          <template v-for="subNav in navItem.children">
            <el-menu-item :index="routePath+navItem.path+'/'+subNav.path" v-if="!subNav.hidden">
              <span v-show="shouldShowTitle">{{subNav.meta.title}}</span>
            </el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item :index="routePath+navItem.path" v-else-if="!navItem.hidden">
          <span v-show="shouldShowTitle">{{navItem.meta.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import NavMenu from './index';
  export default NavMenu;
</script>

<style scoped lang="less">
  .router-link {
    color: white;
  }
</style>
