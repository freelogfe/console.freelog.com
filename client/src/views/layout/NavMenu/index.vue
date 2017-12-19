<template>
  <div class="nav-menu-list">
    <el-menu ref="navMenu" background-color="#324157" class="nav-menu-wrap" router>
      <template v-for="(navItem,index) in navList">
        <el-submenu :index="navItem.path" v-if="navItem.children && !navItem.hidden"
                    :class="{'is-active': (navItem.path===$route.path)}">
          <template slot="title">
            <span v-show="shouldShowTitle">{{navItem.meta.title}}</span>
          </template>
          <fl-nav-menu :nav-list="navItem.children" :should-show-title="shouldShowTitle"></fl-nav-menu>
        </el-submenu>
        <el-menu-item :index="navItem.path" v-else-if="!navItem.hidden"
                      :class="{'is-active': (navItem.path===$route.path)}">
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
  .el-menu-item {
    color: #fff
  }

  .el-menu-item.is-active {
    color: #409EFF !important;
  }

  .router-link {
    color: white;
  }
</style>
