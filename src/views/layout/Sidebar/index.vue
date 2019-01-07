<template>
  <nav
          class="left-sidebar"
          :class="{'sidebar-mini': isMini}"
          v-if="isShowSidebar"
  >
    <ul class="ls-list">
      <li class="ls-item ">
        <el-tooltip effect="dark" :content="isMini ? '展开菜单' : '折叠菜单'" placement="right" :disabled="!isMini">
          <a class="nav-link ls-nav-link" href="javascript:;" @click="isMini=!isMini">
            <i class="el-icon-more-outline"></i>
            <span>{{isMini ? '展开菜单' : '折叠菜单'}}</span>
          </a>
        </el-tooltip>
      </li>
      <li class="ls-item ls-create-resource">
        <el-tooltip effect="dark" content="创建资源" placement="right" :disabled="!isMini">
          <router-link to="/resource/create" class="nav-link create-resource ls-nav-link">
            <i class="el-icon-plus"></i>
            <span>创建资源</span>
          </router-link>
        </el-tooltip>
      </li>
      <li class="ls-item">
        <el-tooltip effect="dark" content="我的资源库" placement="right" :disabled="!isMini">
          <router-link to="/resource/list" class="nav-link ls-nav-link">
            <i class="el-icon-menu"></i>
            <span>我的资源库</span>
          </router-link>
        </el-tooltip>
      </li>
      <li class="ls-item ls-submenu">
        <a href="javascript:;" class="nav-link ls-nav-link">
          <i class="el-icon-document"></i>
          <div class="ls-submenu-text">
            <span>节点</span>
            <el-tooltip effect="dark" content="创建节点" placement="right" :disabled="!isMini">
              <router-link to="/node/create" class="nav-link ls-nav-link create-node-btn">
                <i class="el-icon-plus"></i>
              </router-link>
            </el-tooltip>
          </div>
        </a>
        <ul class="my-node-list ls-submenu-list" v-if="nodes&&nodes.length">
          <li class="node-item hover" :key="node.nodeId" v-for="node in nodes">
            <router-link :to="'/node/'+node.nodeId" class="nav-link mnl-nav-link" :title="node.nodeName">
              {{node.nodeName}}
            </router-link>
          </li>
        </ul>
      </li>
      <li class="ls-item">
        <el-tooltip effect="dark" content="合约列表" placement="right" :disabled="!isMini">
          <a class="nav-link ls-nav-link" :href="`//${targetHostname}/user/resources`" target="_blank">
            <i class="el-icon-tickets"></i>
            <span>合约列表</span>
          </a>
        </el-tooltip>
      </li>
      <li class="ls-item">
        <el-tooltip effect="dark" content="设置" placement="right" :disabled="!isMini">
          <a class="nav-link ls-nav-link" :href="`//${targetHostname}/user/profile`" target="_blank">
            <i class="el-icon-setting"></i>
            <span>设置</span>
          </a>
        </el-tooltip>
      </li>
    </ul>
  </nav>
</template>

<script>
import SideBar from './index'

export default SideBar
</script>

<style scoped lang="less">
@import "index.less";
</style>
